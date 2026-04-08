"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, AlertCircle, CheckCircle, Clock, Search } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

const mockIncidents = [
  {
    id: "1",
    title: "Error en botón de checkout",
    description: "El botón de hacer pedido no funciona cuando el carrito tiene más de 3 items",
    status: "OPEN" as const,
    priority: "HIGH" as const,
    project: "E-commerce Farmacia",
    createdAt: "2025-01-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Solicitar integración con WhatsApp",
    description: "Añadir notificaciones de pedido por WhatsApp para clientes",
    status: "PROPOSED" as const,
    priority: "MEDIUM" as const,
    project: "E-commerce Farmacia",
    createdAt: "2025-01-14T16:20:00Z",
  },
  {
    id: "3",
    title: "Error en validación de formularios",
    description: "El formulario de registro permite emails inválidos",
    status: "RESOLVED" as const,
    priority: "MEDIUM" as const,
    project: "App de Entregas",
    createdAt: "2025-01-10T09:00:00Z",
  },
  {
    id: "4",
    title: "Consulta sobre estado de proyecto",
    description: "¿Cuándo estará lista la pasarela de pago?",
    status: "CLOSED" as const,
    priority: "LOW" as const,
    project: "E-commerce Farmacia",
    createdAt: "2025-01-08T14:15:00Z",
  },
];

const statusConfig = {
  OPEN: { label: "Abierta", icon: AlertCircle, color: "bg-red-100 text-red-700" },
  ANALYZING: { label: "En Análisis", icon: Clock, color: "bg-amber-100 text-amber-700" },
  PROPOSED: { label: "Propuesta Enviada", icon: Clock, color: "bg-blue-100 text-blue-700" },
  RESOLVED: { label: "Resuelta", icon: CheckCircle, color: "bg-green-100 text-green-700" },
  CLOSED: { label: "Cerrada", icon: CheckCircle, color: "bg-gray-100 text-gray-700" },
};

const priorityConfig = {
  LOW: { label: "Baja", variant: "secondary" as const },
  MEDIUM: { label: "Media", variant: "warning" as const },
  HIGH: { label: "Alta", variant: "error" as const },
};

function IncidentCard({ incident }: { incident: typeof mockIncidents[0] }) {
  const status = statusConfig[incident.status];
  const priority = priorityConfig[incident.priority];
  const StatusIcon = status.icon;

  return (
    <Link href={`/dashboard/incidents/${incident.id}`}>
      <Card className="hover:shadow-md transition-all cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className={`rounded-lg p-1.5 ${status.color}`}>
                <StatusIcon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{incident.title}</h3>
                <p className="text-sm text-gray-500">{incident.project}</p>
              </div>
            </div>
            <Badge variant={priority.variant}>{priority.label}</Badge>
          </div>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{incident.description}</p>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Creada: {formatDate(incident.createdAt)}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
              {status.label}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function IncidentsPage() {
  const openCount = mockIncidents.filter(i => i.status === "OPEN").length;
  const proposedCount = mockIncidents.filter(i => i.status === "PROPOSED").length;
  const resolvedCount = mockIncidents.filter(i => i.status === "RESOLVED" || i.status === "CLOSED").length;

  return (
    <div className="min-h-screen">
      <Header title="Incidencias" subtitle="Gestiona tus incidencias y solicitudes" />

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-red-100 p-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{openCount}</p>
                <p className="text-xs text-gray-500">Abiertas</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-blue-100 p-2">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{proposedCount}</p>
                <p className="text-xs text-gray-500">En Propuesta</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-green-100 p-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{resolvedCount}</p>
                <p className="text-xs text-gray-500">Resueltas</p>
              </div>
            </div>
          </div>
          <Link
            href="/dashboard/incidents/new"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-white hover:bg-primary-dark h-10 px-4 py-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva Incidencia
          </Link>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="open">Abiertas</TabsTrigger>
            <TabsTrigger value="proposed">Con Propuesta</TabsTrigger>
            <TabsTrigger value="resolved">Resueltas</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {mockIncidents.map((incident) => (
                <IncidentCard key={incident.id} incident={incident} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="open" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {mockIncidents.filter(i => i.status === "OPEN").map((incident) => (
                <IncidentCard key={incident.id} incident={incident} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="proposed" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {mockIncidents.filter(i => i.status === "PROPOSED").map((incident) => (
                <IncidentCard key={incident.id} incident={incident} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resolved" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {mockIncidents.filter(i => i.status === "RESOLVED" || i.status === "CLOSED").map((incident) => (
                <IncidentCard key={incident.id} incident={incident} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
