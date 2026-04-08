"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { formatTime } from "@/lib/utils";
import { UserAvatar } from "@/components/ui/avatar";

interface MessageBubbleProps {
  content: string;
  sender: "client" | "user" | "ai";
  senderName: string;
  timestamp: string;
  isAI?: boolean;
}

export function MessageBubble({ content, sender, senderName, timestamp, isAI }: MessageBubbleProps) {
  const isSent = sender === "client";

  return (
    <div className={cn("flex gap-3", isSent && "flex-row-reverse")}>
      <UserAvatar name={senderName} className="h-8 w-8" />
      <div className={cn("max-w-[70%]", isSent && "items-end")}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-gray-900">{senderName}</span>
          {isAI && <Badge variant="default" className="text-xs h-5">IA</Badge>}
        </div>
        <div
          className={cn(
            "rounded-2xl px-4 py-2 text-sm",
            isSent ? "bg-primary text-white rounded-br-md" : "bg-gray-100 text-gray-900 rounded-bl-md"
          )}
        >
          {content}
        </div>
        <p className={cn("text-xs text-gray-400 mt-1", isSent && "text-right")}>
          {formatTime(timestamp)}
        </p>
      </div>
    </div>
  );
}
