"use client";

import { Header } from "@/components/layout/header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ProjectCard } from "@/components/dashboard/project-card";
import { ActivityList } from "@/components/dashboard/activity-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, MessageSquare, AlertCircle, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const mockProjects = [
  {
    id: "1",
    name: "E-commerce Farmacia",
    status: "IN_PROGRESS" as const,
    progress: 68,
    tasksTotal: 12,
    tasksDone: 8,
  },
  {
    id: "2",
    name: "App de Entregas",
    status: "REVIEW" as const,
    progress: 90,
    tasksTotal: 8,
    tasksDone: 7,
  },
  {
    id: "3",
    name: "Sistema de Inventario",
    status: "PENDING" as const,
    progress: 15,
    tasksTotal: 20,
    tasksDone: 3,
  },
];

const mockActivities = [
  {
    id: "1",
    type: "message" as const,
    title: "Nuevo mensaje de Aumentta",
    description: "El equipo ha actualizado el estado del proyecto E-commerce",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "2",
    type: "task" as const,
    title: "Tarea completada",
    description: "Integración de pasarela de pago completada",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "3",
    type: "incident" as const,
    title: "Incidencia resuelta",
    description: "El error en el carrito ha sido corregido",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
];

function ButtonLink({ href, children, className, variant = "default" }: { href: string; children: React.ReactNode; className?: string; variant?: "default" | "outline" | "ghost" }) {
  const variants = {
    default: "bg-primary text-white hover:bg-primary-dark",
    outline: "border border-gray-200 bg-white hover:bg-gray-50 text-gray-900",
    ghost: "hover:bg-gray-100 text-gray-700",
  };
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2",
        variants[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Header title="Dashboard" subtitle="Bienvenido de nuevo" />

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Resumen general</h2>
            <p className="text-sm text-gray-500">Estado de tus proyectos y actividad reciente</p>
          </div>
          <ButtonLink href="/incidents/new">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Incidencia
          </ButtonLink>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Proyectos Activos"
            value={3}
            subtitle="2 en progreso, 1 en revisión"
            icon={<CheckSquare className="h-5 w-5" />}
          />
          <StatsCard
            title="Tareas Completadas"
            value={18}
            subtitle="Esta semana"
            icon={<CheckSquare className="h-5 w-5" />}
            trend={{ value: 12, positive: true }}
          />
          <StatsCard
            title="Mensajes"
            value={5}
            subtitle="3 sin leer"
            icon={<MessageSquare className="h-5 w-5" />}
          />
          <StatsCard
            title="Incidencias Abiertas"
            value={1}
            subtitle="0 críticas"
            icon={<AlertCircle className="h-5 w-5" />}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">Proyectos</CardTitle>
                <ButtonLink href="/projects" variant="ghost" className="text-sm h-8">
                  Ver todos <ArrowRight className="ml-1 h-3 w-3" />
                </ButtonLink>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {mockProjects.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <ActivityList activities={mockActivities} />

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <ButtonLink href="/chat" variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Abrir Chat
                </ButtonLink>
                <ButtonLink href="/tasks" variant="outline" className="w-full justify-start">
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Ver Tareas
                </ButtonLink>
                <ButtonLink href="/incidents/new" variant="outline" className="w-full justify-start">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Reportar Incidencia
                </ButtonLink>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
