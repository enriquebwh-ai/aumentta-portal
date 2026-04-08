import { ollamaChat, SYSTEM_PROMPT } from "@/lib/ollama";

export async function POST(request: Request) {
  try {
    const { message, context } = await request.json();

    const messages = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      { role: "user" as const, content: message },
    ];

    const response = await ollamaChat(messages);

    return Response.json({ response });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}
