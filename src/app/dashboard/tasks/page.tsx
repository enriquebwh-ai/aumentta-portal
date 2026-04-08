"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckSquare, Clock, AlertCircle, Filter } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

const mockTasks = [
  {
    id: "1",
    title: "Diseñar mockups para pantalla de checkout",
    description: "Incluir variaciones para móvil y escritorio",
    status: "DONE" as const,
    priority: "HIGH" as const,
    dueDate: "2025-02-15",
    project: "E-commerce Farmacia",
  },
  {
    id: "2",
    title: "Integrar API de Stripe para pagos",
    description: "Configurar webhooks y manejo de errores",
    status: "IN_PROGRESS" as const,
    priority: "HIGH" as const,
    dueDate: "2025-02-20",
    project: "E-commerce Farmacia",
  },
  {
    id: "3",
    title: "Crear módulo de gestión de inventario",
    description: "Incluir búsqueda, filtros y exportación",
    status: "TODO" as const,
    priority: "MEDIUM" as const,
    dueDate: "2025-03-01",
    project: "Sistema de Inventario",
  },
  {
    id: "4",
    title: "Configurar Push Notifications",
    description: "Para iOS y Android",
    status: "TODO" as const,
    priority: "LOW" as const,
    dueDate: "2025-03-15",
    project: "App de Entregas",
  },
  {
    id: "5",
    title: "Revisar UX de pantalla principal",
    description: "Feedback del cliente integrado",
    status: "IN_PROGRESS" as const,
    priority: "MEDIUM" as const,
    dueDate: "2025-02-18",
    project: "App de Entregas",
  },
  {
    id: "6",
    title: "Documentar API endpoints",
    description: "Usar Swagger/OpenAPI",
    status: "DONE" as const,
    priority: "LOW" as const,
    dueDate: "2025-02-10",
    project: "App de Entregas",
  },
];

const statusConfig = {
  TODO: { label: "Pendiente", icon: Clock, color: "text-gray-500 bg-gray-100" },
  IN_PROGRESS: { label: "En Progreso", icon: AlertCircle, color: "text-amber-600 bg-amber-50" },
  DONE: { label: "Completada", icon: CheckSquare, color: "text-green-600 bg-green-50" },
};

const priorityConfig = {
  LOW: { label: "Baja", variant: "secondary" as const },
  MEDIUM: { label: "Media", variant: "warning" as const },
  HIGH: { label: "Alta", variant: "error" as const },
};

function TaskCard({ task }: { task: typeof mockTasks[0] }) {
  const status = statusConfig[task.status];
  const priority = priorityConfig[task.priority];
  const StatusIcon = status.icon;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={cn("rounded-lg p-1.5", status.color)}>
              <StatusIcon className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{task.title}</p>
              <p className="text-sm text-gray-500">{task.project}</p>
            </div>
          </div>
          <Badge variant={priority.variant}>{priority.label}</Badge>
        </div>
        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            <Clock className="h-3 w-3 inline mr-1" />
            {formatDate(task.dueDate)}
          </span>
          <Button variant="ghost" size="sm">Ver detalles</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TasksPage() {
  const doneCount = mockTasks.filter(t => t.status === "DONE").length;
  const inProgressCount = mockTasks.filter(t => t.status === "IN_PROGRESS").length;
  const todoCount = mockTasks.filter(t => t.status === "TODO").length;

  return (
    <div className="min-h-screen">
      <Header title="Tareas" subtitle={`${mockTasks.length} tareas en total`} />

      <div className="p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="rounded-lg bg-gray-100 p-3">
                <Clock className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{todoCount}</p>
                <p className="text-sm text-gray-500">Pendientes</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="rounded-lg bg-amber-50 p-3">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{inProgressCount}</p>
                <p className="text-sm text-gray-500">En Progreso</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="rounded-lg bg-green-50 p-3">
                <CheckSquare className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{doneCount}</p>
                <p className="text-sm text-gray-500">Completadas</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="todo">Pendientes</TabsTrigger>
              <TabsTrigger value="in_progress">En Progreso</TabsTrigger>
              <TabsTrigger value="done">Completadas</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
          </div>

          <TabsContent value="all" className="grid gap-4 md:grid-cols-2">
            {mockTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </TabsContent>

          <TabsContent value="todo" className="grid gap-4 md:grid-cols-2">
            {mockTasks.filter(t => t.status === "TODO").map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </TabsContent>

          <TabsContent value="in_progress" className="grid gap-4 md:grid-cols-2">
            {mockTasks.filter(t => t.status === "IN_PROGRESS").map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </TabsContent>

          <TabsContent value="done" className="grid gap-4 md:grid-cols-2">
            {mockTasks.filter(t => t.status === "DONE").map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
