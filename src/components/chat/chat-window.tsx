"use client";

import { useRef, useEffect } from "react";
import { MessageBubble } from "./message-bubble";
import { ChatInput } from "./chat-input";
import { Loader2 } from "lucide-react";
import type { Message } from "@/types";

interface ChatWindowProps {
  messages: Message[];
  onSend: (message: string) => void;
  isLoading?: boolean;
}

export function ChatWindow({ messages, onSend, isLoading }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            content={message.content}
            sender={message.senderType.toLowerCase() as "client" | "user" | "ai"}
            senderName={message.senderType === "CLIENT" ? "Tú" : message.senderType === "AI" ? "Asistente IA" : "Aumentta"}
            timestamp={message.createdAt}
            isAI={message.senderType === "AI"}
          />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>IA está analizando...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={onSend} disabled={isLoading} />
    </div>
  );
}
