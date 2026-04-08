"use client";

import { Header } from "@/components/layout/header";
import { ChatWindow } from "@/components/chat/chat-window";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { Message } from "@/types";
import { Bot, User } from "lucide-react";

const mockMessages: Message[] = [
  {
    id: "1",
    chatId: "1",
    senderId: "user1",
    senderType: "USER",
    content: "Hola! Quería consultar sobre el estado del proyecto E-commerce.",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "2",
    chatId: "1",
    senderId: "ai",
    senderType: "AI",
    content: "¡Hola! Soy el asistente IA de Aumentta. El proyecto E-commerce está actualmente al 68% de progreso. El equipo está trabajando en la integración del sistema de pagos. ¿Hay algo específico que quieras consultar?",
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
  },
  {
    id: "3",
    chatId: "1",
    senderId: "client",
    senderType: "CLIENT",
    content: "Perfecto. Una pregunta, ¿cuándo estará lista la pasarela de pago?",
    createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
  },
  {
    id: "4",
    chatId: "1",
    senderId: "ai",
    senderType: "AI",
    content: "Según el planning actual, la pasarela de pago estará lista para pruebas el próximo viernes. El equipo de desarrollo está finalizando los últimos detalles de la integración con Stripe.",
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
];

const mockConversations = [
  { id: "1", name: "Soporte General", lastMessage: "El equipo está trabajando en...", unread: 0, active: true },
  { id: "2", name: "Proyecto E-commerce", lastMessage: "La pasarela estará lista...", unread: 2, active: false },
  { id: "3", name: "App de Entregas", lastMessage: "El mockup está aprobado", unread: 0, active: false },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (message: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      chatId: "1",
      senderId: "client",
      senderType: "CLIENT",
      content: message,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        chatId: "1",
        senderId: "ai",
        senderType: "AI",
        content: `He recibido tu mensaje: "${message}". Estoy analizando la mejor respuesta para ti. Mientras tanto, ¿hay algo más en lo que pueda ayudarte?`,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <Header title="Chat" subtitle="Comunícate con tu equipo" />

      <div className="p-6">
        <div className="flex gap-6 h-[calc(100vh-180px)]">
          <Card className="w-80 shrink-0 hidden lg:block">
            <CardContent className="p-4">
              <h2 className="font-semibold text-gray-900 mb-4">Conversaciones</h2>
              <div className="space-y-2">
                {mockConversations.map((conv) => (
                  <button
                    key={conv.id}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                      conv.active ? "bg-primary/10 text-primary" : "hover:bg-gray-50"
                    )}
                  >
                    <div className="rounded-full bg-gray-100 p-2">
                      {conv.active ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{conv.name}</p>
                      <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <Badge variant="default" className="h-5 w-5 p-0 text-xs justify-center">
                        {conv.unread}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center gap-3 p-4 border-b border-gray-200">
              <div className="rounded-full bg-primary/10 p-2">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Soporte General</h3>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-xs text-gray-500">En línea</span>
                </div>
              </div>
              <Badge variant="success" className="ml-auto">
                IA Activa
              </Badge>
            </div>

            <ChatWindow messages={messages} onSend={handleSend} isLoading={isLoading} />
          </Card>
        </div>
      </div>
    </div>
  );
}
