"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FolderKanban, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  id: string;
  name: string;
  status: "PENDING" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";
  progress: number;
  tasksTotal: number;
  tasksDone: number;
}

const statusConfig = {
  PENDING: { label: "Pendiente", variant: "secondary" as const },
  IN_PROGRESS: { label: "En Progreso", variant: "warning" as const },
  REVIEW: { label: "En Revisión", variant: "default" as const },
  COMPLETED: { label: "Completado", variant: "success" as const },
};

export function ProjectCard({ id, name, status, progress, tasksTotal, tasksDone }: ProjectCardProps) {
  const config = statusConfig[status];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <FolderKanban className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-base">{name}</CardTitle>
          </div>
          <Badge variant={config.variant}>{config.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Progreso</span>
            <span className="font-medium text-gray-900">{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">{tasksDone}/{tasksTotal} tareas</span>
          <Link
            href={`/projects/${id}`}
            className="flex items-center gap-1 text-primary hover:underline"
          >
            Ver detalles <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
