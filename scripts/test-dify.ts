import * as dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.DIFY_API_KEY;
const API_URL = process.env.DIFY_API_URL || "https://api.dify.ai/v1";

if (!API_KEY) {
    console.error("Error: DIFY_API_KEY is not set in .env file.");
    process.exit(1);
}

async function testDifyConnection() {
    console.log("Testing Dify API connection...");
    const url = `${API_URL}/chat-messages`;

    const body = {
        inputs: {},
        query: "Hello, can you hear me?",
        response_mode: "blocking",
        conversation_id: "",
        user: "test-user-123",
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Success! Dify Response:");
        console.log("--------------------------------------------------");
        console.log(data.answer);
        console.log("--------------------------------------------------");

    } catch (error) {
        console.error("Error connecting to Dify:", error);
    }
}

testDifyConnection();
