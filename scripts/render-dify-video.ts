import * as dotenv from "dotenv";
import { execSync } from "child_process";

dotenv.config();

const DIFY_API_KEY = process.env.DIFY_API_KEY;
const DIFY_API_URL = process.env.DIFY_API_URL || "https://api.dify.ai/v1";

if (!DIFY_API_KEY) {
    console.error("Error: DIFY_API_KEY is not set.");
    process.exit(1);
}

async function main() {
    const query = process.argv[2] || "ポライトリフトの効果について教えて";
    console.log(`\nInput Query: "${query}"`);

    // 1. Call Dify API
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

    // 2. Render Video with properties
    console.log("\nRendering video with Dify response...");
    const outputVideo = "public/dify-response.mp4";

    // Escape special characters for JSON string
    const safeText = difyResponseText
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r');

    const cmd = `npx remotion render DifyDialogue ${outputVideo} --props='{"responseText": "${safeText}"}'`;

    try {
        console.log(`Executing: ${cmd}`);
        execSync(cmd, { stdio: 'inherit' });
        console.log(`\nSuccess! Video saved to: ${outputVideo}`);
    } catch (error) {
        console.error("Error rendering video:", error);
        process.exit(1);
    }
}

main();
