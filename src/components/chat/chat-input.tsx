"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-3 border-t border-gray-200 p-4 bg-white">
      <Button type="button" variant="ghost" size="icon" className="shrink-0 text-gray-500">
        <Paperclip className="h-5 w-5" />
      </Button>
      <div className="flex-1">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className="min-h-[44px] max-h-[120px] resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          disabled={disabled}
        />
      </div>
      <Button type="submit" size="icon" className="shrink-0" disabled={!message.trim() || disabled}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
