import { ElevenLabsClient } from "elevenlabs";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

// Environment Variables
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const DIFY_API_KEY = process.env.DIFY_API_KEY;
const DIFY_API_URL = process.env.DIFY_API_URL || "https://api.dify.ai/v1";

// Validation
if (!ELEVENLABS_API_KEY) {
    console.error("Error: ELEVENLABS_API_KEY is not set.");
    process.exit(1);
}
if (!DIFY_API_KEY) {
    console.error("Error: DIFY_API_KEY is not set.");
    process.exit(1);
}

const elevenClient = new ElevenLabsClient({
    apiKey: ELEVENLABS_API_KEY,
});

async function main() {
    // 1. Get Query
    const query = process.argv[2] || "ポライトリフトの効果について教えて";
    console.log(`\nInput Query: "${query}"`);

    // 2. Call Dify API
    console.log("Calling Dify API...");
    let difyResponseText = "";

    try {
        const url = `${DIFY_API_URL}/chat-messages`;
        const body = {
            inputs: {},
            query: query,
            response_mode: "blocking",
            conversation_id: "",
            user: "bot-user-001",
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${DIFY_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Dify API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        difyResponseText = data.answer;
        console.log(`Dify Answer: "${difyResponseText}"`);

    } catch (error) {
        console.error("Error fetching from Dify:", error);
        process.exit(1);
    }

    if (!difyResponseText) {
        console.error("No answer received from Dify.");
        process.exit(1);
    }

    // 3. Call ElevenLabs API
    console.log("Generating audio with ElevenLabs...");
    const outputFileName = "dify-response.mp3";
    const outputPath = path.resolve(__dirname, `../public/${outputFileName}`);

    try {
        const audio = await elevenClient.generate({
            voice: "Rachel", // Using default voice for now
            model_id: "eleven_multilingual_v2",
            text: difyResponseText,
        });

        const fileStream = fs.createWriteStream(outputPath);
        audio.pipe(fileStream);

        fileStream.on("finish", () => {
            console.log(`\nSuccess! Audio saved to: public/${outputFileName}`);
        });

    } catch (error) {
        console.error("Error generating audio:", error);
    }
}

main();
