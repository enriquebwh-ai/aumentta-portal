"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FolderKanban,
  Calendar,
  CheckSquare,
  DollarSign,
  ArrowRight,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";

const mockProjects = [
  {
    id: "1",
    name: "E-commerce Farmacia",
    description: "Tienda online con gestión de inventario y pedidos",
    status: "IN_PROGRESS" as const,
    progress: 68,
    startDate: "2025-01-15",
    endDate: "2025-04-30",
    tasksTotal: 12,
    tasksDone: 8,
    servicesCount: 4,
    cost: 12500,
  },
  {
    id: "2",
    name: "App de Entregas",
    description: "Aplicación móvil para gestión de repartos",
    status: "REVIEW" as const,
    progress: 90,
    startDate: "2024-11-01",
    endDate: "2025-03-15",
    tasksTotal: 8,
    tasksDone: 7,
    servicesCount: 3,
    cost: 18000,
  },
  {
    id: "3",
    name: "Sistema de Inventario",
    description: "Control de stock y almacén para almacén central",
    status: "PENDING" as const,
    progress: 15,
    startDate: "2025-02-01",
    endDate: "2025-06-30",
    tasksTotal: 20,
    tasksDone: 3,
    servicesCount: 2,
    cost: 9500,
  },
  {
    id: "4",
    name: "Web Corporativa",
    description: "Sitio web corporativo con CMS",
    status: "COMPLETED" as const,
    progress: 100,
    startDate: "2024-06-01",
    endDate: "2024-09-30",
    tasksTotal: 15,
    tasksDone: 15,
    servicesCount: 3,
    cost: 7500,
  },
];

const statusConfig = {
  PENDING: { label: "Pendiente", variant: "secondary" as const, color: "text-gray-600" },
  IN_PROGRESS: { label: "En Progreso", variant: "warning" as const, color: "text-amber-600" },
  REVIEW: { label: "En Revisión", variant: "default" as const, color: "text-blue-600" },
  COMPLETED: { label: "Completado", variant: "success" as const, color: "text-green-600" },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <Header title="Proyectos" subtitle="Gestiona tus proyectos activos" />

      <div className="p-6">
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="active">Activos</TabsTrigger>
            <TabsTrigger value="completed">Completados</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {mockProjects.map((project) => {
              const status = statusConfig[project.status];
              return (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-primary/10 p-3">
                          <FolderKanban className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{project.name}</h3>
                          <p className="text-sm text-gray-500">{project.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={status.variant}>{status.label}</Badge>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Progreso global</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Inicio: {formatDate(project.startDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Fin: {formatDate(project.endDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckSquare className="h-4 w-4 text-gray-400" />
                        <span>{project.tasksDone}/{project.tasksTotal} tareas</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span>€{project.cost.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Link
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-gray-200 bg-white hover:bg-gray-50 text-gray-900 h-8 rounded-md px-3"
                      >
                        Ver detalles <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="active">
            <div className="grid gap-4 md:grid-cols-2">
              {mockProjects.filter(p => p.status !== "COMPLETED").map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <FolderKanban className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">{project.name}</h3>
                      <Badge variant={statusConfig[project.status].variant} className="ml-auto">
                        {statusConfig[project.status].label}
                      </Badge>
                    </div>
                    <Progress value={project.progress} className="mb-2" />
                    <p className="text-sm text-gray-500">{project.progress}% completado</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <Card>
              <CardContent className="p-12 text-center">
                <CheckSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No hay proyectos completados aún</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
