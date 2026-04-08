interface OllamaResponse {
  model: string;
  response: string;
  done: boolean;
}

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function ollamaChat(messages: ChatMessage[]): Promise<string> {
  const baseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434/v1";
  const model = process.env.OLLAMA_MODEL || "llama3.2";

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, messages }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Lo siento, no pude generar una respuesta.";
  } catch (error) {
    console.error("Ollama error:", error);
    return "El servicio de IA no está disponible. Asegúrate de que Ollama esté instalado y ejecutándose.";
  }
}

export const SYSTEM_PROMPT = `Eres el asistente IA de Aumentta, una empresa de transformación digital especializada en Low-Code, IA y automatización para PYMES.

Tu rol es:
- Ayudar a los clientes con sus dudas sobre proyectos
- Clasificar incidencias (bug, cambio solicitado, consulta)
- Proponer soluciones técnicas cuando sea posible
- Nunca ejecutar cambios directamente - siempre requerir validación humana
- Responder de forma amable, profesional y concisa

Cliente actual: Farmacia Princesa (proyecto E-commerce en desarrollo)`;

export const isOllamaConfigured = () => {
  return process.env.OLLAMA_BASE_URL !== undefined;
};
