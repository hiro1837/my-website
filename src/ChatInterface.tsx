import React, { useState, useEffect } from 'react';
import { Player } from '@remotion/player';
import { AvatarCharacter } from './Composition';

export const ChatInterface: React.FC = () => {
    // Chat State
    const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
        { role: 'bot', text: 'こんにちは！美容医療に関するご相談専用Botです。何かお手続きが必要ですか？' }
    ]);
    const [inputText, setInputText] = useState("");
    const [isTalking, setIsTalking] = useState(false);
    const [mouthOpen, setMouthOpen] = useState(false);

    // Lip Sync Loop
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isTalking) {
            // Toggle mouth every 150ms
            interval = setInterval(() => {
                setMouthOpen(prev => !prev);
            }, 150);
        } else {
            setMouthOpen(false);
        }
        return () => clearInterval(interval);
    }, [isTalking]);

    // Handle Send
    const handleSend = async () => {
        if (!inputText.trim()) return;

        // 1. Add User Message
        const userMsg = inputText;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInputText("");

        // 2. Call Dify API
        // NOTE: In a real app, you should use a backend proxy to hide the API key.
        // For this local demo, we use the key from .env (Vite exposes VITE_ prefixed envs by default, 
        // but here we might need to rely on the fact we are in a local environment or hardcode/proxy it.
        // Since we didn't set up a proxy yet, we will try to use the key if available or ask user.
        // Vite: import.meta.env.VITE_DIFY_API_KEY

        try {
            // Using proxy configured in vite.config.ts to avoid CORS and hide real URL
            // Accessing env via process.env because we defined it in vite.config.ts
            // Note: For real security, don't expose keys in client code define(), use a real backend.
            // But for this local demo, relying on local env is fine.
            const apiKey = process.env.DIFY_API_KEY;

            if (!apiKey) {
                throw new Error("DIFY_API_KEY is missing in .env");
            }

            const response = await fetch("/api/chat-messages", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputs: {},
                    query: userMsg,
                    response_mode: "blocking",
                    conversation_id: "",
                    user: "web-user-001",
                }),
            });

            if (!response.ok) {
                const errText = await response.text();
                console.error("Dify Error:", errText);
                throw new Error(`Dify API Error: ${response.status}`);
            }

            const data = await response.json();
            const botResponse = data.answer;

            // 3. Add Bot Message
            setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);

            // 4. Speak
            speak(botResponse);

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'bot', text: "接続エラーが発生しました。コンソールを確認してください。" }]);
        }
    };

    // Web Speech API
    const speak = (text: string) => {
        // Cancel previous speech if any
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        utterance.rate = 1.2;
        utterance.pitch = 1.2; // Slightly higher pitch for "cute" effect

        // Improved voice selection
        const voices = window.speechSynthesis.getVoices();
        // Priority: Google 日本語 (Chrome) > Kyoko (Mac) > Any JA
        const femaleVoice = voices.find(v => v.name === 'Google 日本語') || voices.find(v => v.name === 'Kyoko') || voices.find(v => v.lang === 'ja-JP');

        if (femaleVoice) {
            utterance.voice = femaleVoice;
            console.log("Using voice:", femaleVoice.name);
        } else {
            console.warn("No Japanese voice found.");
        }

        utterance.onstart = () => setIsTalking(true);
        utterance.onend = () => setIsTalking(false);
        utterance.onerror = (e) => {
            console.error("Speech Error:", e);
            setIsTalking(false);
        };

        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="flex flex-col w-full max-w-4xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden font-sans">
            {/* Top: Avatar Area */}
            <div className="flex-1 bg-gradient-to-b from-orange-50 to-orange-100 relative flex justify-center items-center overflow-hidden">
                <div className="w-[600px] h-[600px]">
                    <Player
                        component={AvatarCharacter}
                        inputProps={{
                            talking: isTalking,
                            mouthOpen: mouthOpen
                        }}
                        durationInFrames={300} // Infinite loop essentially
                        fps={30}
                        compositionWidth={600}
                        compositionHeight={600}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        loop
                        autoPlay
                    />
                </div>

                {/* Subtitle Overlay */}
                {isTalking && (
                    <div className="absolute bottom-10 left-0 right-0 text-center px-4">
                        <div className="inline-block bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-orange-200">
                            <p className="text-xl font-bold text-orange-900 animate-pulse">
                                Speaking...
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom: Chat Area */}
            <div className="h-[300px] flex flex-col bg-white border-t border-gray-100">
                {/* History */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-lg ${msg.role === 'user'
                                ? 'bg-orange-500 text-white rounded-tr-sm'
                                : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-100 flex gap-3">
                    <button
                        onClick={handleReset}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-600 px-4 py-3 rounded-full font-bold text-sm transition-colors"
                        title="Reset Conversation"
                    >
                        ↻
                    </button>
                    <input
                        type="text"
                        className="flex-1 px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 text-lg"
                        placeholder="何か聞いてみてね..."
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleSend()}
                    />
                    <button
                        onClick={handleSend}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold text-lg transition-colors"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};
