"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatDateTime } from "@/lib/utils";
import { Bell, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "message" | "task" | "incident" | "update";
  title: string;
  description: string;
  timestamp: string;
}

interface ActivityListProps {
  activities: ActivityItem[];
}

const typeConfig = {
  message: { icon: MessageSquare, color: "text-blue-500 bg-blue-50" },
  task: { icon: CheckCircle, color: "text-green-500 bg-green-50" },
  incident: { icon: AlertCircle, color: "text-red-500 bg-red-50" },
  update: { icon: Bell, color: "text-amber-500 bg-amber-50" },
};

export function ActivityList({ activities }: ActivityListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-center text-sm text-gray-500 py-8">No hay actividad reciente</p>
          ) : (
            activities.map((activity) => {
              const config = typeConfig[activity.type];
              return (
                <div key={activity.id} className="flex gap-3">
                  <div className={cn("rounded-lg p-2 h-fit", config.color)}>
                    <config.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.description}</p>
                    <p className="text-xs text-gray-400">{formatDateTime(activity.timestamp)}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
