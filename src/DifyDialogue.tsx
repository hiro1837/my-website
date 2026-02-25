import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from "remotion";
import React from "react";
import { AvatarCharacter } from "./Composition";

interface DifyDialogueProps {
    responseText?: string;
}

export const DifyDialogue: React.FC<DifyDialogueProps> = ({
    responseText = "ご来店ありがとうございます。本日はいかがなさいましたか？"
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Typewriter effect logic
    // Display 10 characters per second
    const charsShown = Math.floor(frame / (fps / 10));
    const textToShow = responseText.slice(0, charsShown);

    // Character "talking" state: true if text is still typing
    const isTalking = charsShown < responseText.length;

    // Bubble animation
    const bubbleScale = spring({
        frame: frame - 10,
        fps,
        config: { damping: 15 },
    });

    return (
        <AbsoluteFill style={{ backgroundColor: "#fff5e6" }}> {/* Warm background base */}

            {/* Character slightly higher */}
            <AbsoluteFill style={{ top: -50 }}>
                <AvatarCharacter talking={isTalking} />
            </AbsoluteFill>

            {/* Dialogue Bubble Area */}
            <AbsoluteFill
                style={{
                    justifyContent: "flex-end",
                    alignItems: "center",
                    paddingBottom: 80,
                }}
            >
                <div
                    style={{
                        transform: `scale(${bubbleScale})`,
                        backgroundColor: "white",
                        borderRadius: "30px",
                        padding: "40px 60px",
                        maxWidth: "80%",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                        border: "2px solid #ffcc80", // Warm border
                        position: 'relative',
                    }}
                >
                    {/* Triangle pointer for bubble */}
                    <div style={{
                        position: 'absolute',
                        top: -20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '20px solid transparent',
                        borderRight: '20px solid transparent',
                        borderBottom: '20px solid #ffcc80',
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: -17,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '20px solid transparent',
                        borderRight: '20px solid transparent',
                        borderBottom: '20px solid white',
                    }} />

                    <p
                        style={{
                            fontFamily: "Hiragino Maru Gothic Pro, sans-serif", // Rounded cute font
                            fontSize: 40,
                            lineHeight: 1.5,
                            color: "#5d4037", // Warm brown text
                            margin: 0,
                            minHeight: 120, // Prevent resizing
                        }}
                    >
                        {textToShow}
                        {isTalking && <span style={{ opacity: 0.5 }}>|</span>} {/* Cursor */}
                    </p>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
