import { ElevenLabsClient } from "elevenlabs";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

const API_KEY = process.env.ELEVENLABS_API_KEY;

if (!API_KEY) {
    console.error("Error: ELEVENLABS_API_KEY is not set in .env file.");
    process.exit(1);
}

const client = new ElevenLabsClient({
    apiKey: API_KEY,
});

async function main() {
    const text = "準備完了だよ！";
    const outputPath = path.resolve(__dirname, "../public/test-voice.mp3");

    console.log(`Generating audio for: "${text}"...`);

    try {
        const audio = await client.generate({
            voice: "Rachel", // Using a default voice, can be changed
            model_id: "eleven_multilingual_v2", // Supports Japanese
            text: text,
        });

        const fileStream = fs.createWriteStream(outputPath);
        audio.pipe(fileStream); // Correctly pipe the stream to the file

        fileStream.on("finish", () => {
            console.log(`Audio saved to: ${outputPath}`);
        });

        fileStream.on("error", (error) => {
            console.error("Error writing file:", error);
        });

    } catch (error) {
        console.error("Error generating audio:", error);
    }
}

main();
