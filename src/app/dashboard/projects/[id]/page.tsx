"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  FolderKanban,
  Calendar,
  CheckSquare,
  DollarSign,
  MessageSquare,
  FileText,
  Users,
  ArrowLeft,
  Edit,
} from "lucide-react";
import Link from "next/link";
import { formatDate, getInitials } from "@/lib/utils";

const mockProject = {
  id: "1",
  name: "E-commerce Farmacia",
  description: "Desarrollo de tienda online completa con gestión de inventario, pedidos, pasarela de pago y panel de administración.",
  status: "IN_PROGRESS" as const,
  progress: 68,
  startDate: "2025-01-15",
  endDate: "2025-04-30",
  client: "Farmacia Princesa",
  team: [
    { name: "Guillermo Cedeño", role: "CTO" },
    { name: "Nelson Gotera", role: "Account Manager" },
    { name: "Ángel López", role: "Backend Developer" },
    { name: "Habid Díaz", role: "Frontend Developer" },
  ],
  services: [
    { name: "Desarrollo Web", cost: 5000, frequency: "ONE_TIME" },
    { name: "Integración Pagos", cost: 2000, frequency: "ONE_TIME" },
    { name: "Hosting Mensual", cost: 150, frequency: "MONTHLY" },
    { name: "Mantenimiento", cost: 500, frequency: "MONTHLY" },
  ],
  tasks: [
    { id: "1", title: "Diseño de mockups", status: "DONE", priority: "HIGH" },
    { id: "2", title: "Frontend principal", status: "DONE", priority: "HIGH" },
    { id: "3", title: "Integración API inventario", status: "IN_PROGRESS", priority: "HIGH" },
    { id: "4", title: "Pasarela de pago", status: "TODO", priority: "HIGH" },
    { id: "5", title: "Panel de admin", status: "TODO", priority: "MEDIUM" },
    { id: "6", title: "Testing", status: "TODO", priority: "MEDIUM" },
  ],
};

const statusConfig = {
  PENDING: { label: "Pendiente", variant: "secondary" as const },
  IN_PROGRESS: { label: "En Progreso", variant: "warning" as const },
  REVIEW: { label: "En Revisión", variant: "default" as const },
  COMPLETED: { label: "Completado", variant: "success" as const },
};

const taskStatusConfig = {
  TODO: { label: "Pendiente", color: "text-gray-500 bg-gray-100" },
  IN_PROGRESS: { label: "En Progreso", color: "text-amber-600 bg-amber-50" },
  DONE: { label: "Completada", color: "text-green-600 bg-green-50" },
};

const priorityConfig = {
  LOW: "secondary" as const,
  MEDIUM: "warning" as const,
  HIGH: "error" as const,
};

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = mockProject;
  const status = statusConfig[project.status];
  const totalCost = project.services.reduce((acc, s) => acc + (s.frequency === "ONE_TIME" ? s.cost : s.cost * 3), 0);
  const tasksDone = project.tasks.filter(t => t.status === "DONE").length;

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Header title={project.name} subtitle={project.client} />

      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <Badge variant={status.variant}>{status.label}</Badge>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-gray-200 bg-white hover:bg-gray-50 text-gray-900 h-8 px-3">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{project.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progreso General</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{project.progress}%</p>
                    <p className="text-sm text-gray-500">{tasksDone}/{project.tasks.length} tareas completadas</p>
                  </div>
                </div>
                <Progress value={project.progress} className="h-3" />
              </CardContent>
            </Card>

            <Tabs defaultValue="tasks">
              <TabsList>
                <TabsTrigger value="tasks">Tareas</TabsTrigger>
                <TabsTrigger value="files">Archivos</TabsTrigger>
                <TabsTrigger value="activity">Actividad</TabsTrigger>
              </TabsList>

              <TabsContent value="tasks" className="space-y-3 mt-4">
                {project.tasks.map((task) => {
                  const taskStatus = taskStatusConfig[task.status as keyof typeof taskStatusConfig];
                  return (
                    <Card key={task.id}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`rounded-lg px-2 py-1 text-xs font-medium ${taskStatus.color}`}>
                            {taskStatus.label}
                          </div>
                          <span className="font-medium text-gray-900">{task.title}</span>
                        </div>
                        <Badge variant={priorityConfig[task.priority as keyof typeof priorityConfig]}>
                          {task.priority}
                        </Badge>
                      </CardContent>
                    </Card>
                  );
                })}
              </TabsContent>

              <TabsContent value="files">
                <Card>
                  <CardContent className="p-8 text-center">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No hay archivos adjuntos</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity">
                <Card>
                  <CardContent className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No hay actividad reciente</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Información</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Fecha de inicio</p>
                    <p className="font-medium">{formatDate(project.startDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Fecha de fin</p>
                    <p className="font-medium">{formatDate(project.endDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Coste total estimado</p>
                    <p className="font-medium">€{totalCost.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Equipo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {project.team.map((member) => (
                  <div key={member.name} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{getInitials(member.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Servicios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {project.services.map((service) => (
                  <div key={service.name} className="flex justify-between text-sm">
                    <span className="text-gray-600">{service.name}</span>
                    <span className="font-medium">
                      €{service.cost}
                      {service.frequency === "MONTHLY" && "/mes"}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Link
              href="/chat"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-white hover:bg-primary-dark w-full h-10 px-4 py-2"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Abrir Chat
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
