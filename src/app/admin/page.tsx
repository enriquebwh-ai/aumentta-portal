"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, FolderKanban, AlertCircle, MessageSquare, Bot, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";
import { formatDateTime, getInitials } from "@/lib/utils";

const stats = [
  { label: "Clientes Activos", value: 12, icon: Users, trend: "+2 este mes", color: "bg-blue-100 text-blue-600" },
  { label: "Proyectos", value: 24, icon: FolderKanban, trend: "8 en curso", color: "bg-purple-100 text-purple-600" },
  { label: "Incidencias Abiertas", value: 7, icon: AlertCircle, trend: "3 de alta prioridad", color: "bg-red-100 text-red-600" },
  { label: "Mensajes Pendientes", value: 15, icon: MessageSquare, trend: "5 sin respuesta", color: "bg-amber-100 text-amber-600" },
];

const recentIncidents = [
  { id: "1", title: "Error en botón de checkout", client: "Farmacia Princesa", priority: "HIGH", status: "OPEN", time: "hace 10 min" },
  { id: "2", title: "Solicitar integración WhatsApp", client: "All-In Hamburguesas", priority: "MEDIUM", status: "PROPOSED", time: "hace 1 hora" },
  { id: "3", title: "Error en validación formularios", client: "NeuroFCarbonell", priority: "MEDIUM", status: "RESOLVED", time: "hace 2 horas" },
  { id: "4", title: "Consulta sobre estado de proyecto", client: "Peletería Ramiro", priority: "LOW", status: "CLOSED", time: "hace 1 día" },
];

const recentClients = [
  { id: "1", name: "Farmacia Princesa", company: "Sector Farmacia", projects: 2, lastActivity: "hace 10 min" },
  { id: "2", name: "All-In Hamburguesas", company: "Restauración", projects: 1, lastActivity: "hace 1 hora" },
  { id: "3", name: "NeuroFCarbonell", company: "Salud", projects: 1, lastActivity: "hace 2 horas" },
  { id: "4", name: "Peletería Ramiro", company: "Retail", projects: 3, lastActivity: "hace 1 día" },
];

const priorityColors = {
  HIGH: "bg-red-100 text-red-700",
  MEDIUM: "bg-amber-100 text-amber-700",
  LOW: "bg-gray-100 text-gray-700",
};

const statusColors = {
  OPEN: "bg-red-100 text-red-700",
  ANALYZING: "bg-amber-100 text-amber-700",
  PROPOSED: "bg-blue-100 text-blue-700",
  RESOLVED: "bg-green-100 text-green-700",
  CLOSED: "bg-gray-100 text-gray-700",
};

export default function AdminDashboard() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-gray-200 bg-white px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrativo</h1>
        <p className="text-sm text-gray-500">Resumen de actividad y métricas de Aumentta</p>
      </div>

      <div className="p-8 space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                    <p className="mt-1 text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="mt-1 text-xs text-gray-500">{stat.trend}</p>
                  </div>
                  <div className={`rounded-lg p-3 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Incidencias Recientes</CardTitle>
              <Link href="/admin/incidents" className="text-sm text-primary hover:underline">
                Ver todas
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentIncidents.map((incident) => (
                  <div key={incident.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                        {incident.client.split(' ').map(n => n[0]).join('').slice(0,2)}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">{incident.title}</p>
                        <p className="text-xs text-gray-500">{incident.client}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[incident.priority as keyof typeof priorityColors]}`}>
                        {incident.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[incident.status as keyof typeof statusColors]}`}>
                        {incident.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Clientes Recientes</CardTitle>
              <Link href="/admin/clients" className="text-sm text-primary hover:underline">
                Ver todos
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentClients.map((client) => (
                  <div key={client.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {getInitials(client.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm text-gray-900">{client.name}</p>
                        <p className="text-xs text-gray-500">{client.company} · {client.projects} proyectos</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">{client.lastActivity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-500" />
              Estado del Motor IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-green-700">Ollama</span>
                </div>
                <p className="text-xs text-green-600">Conectado · Modelo: llama3.2</p>
                <p className="text-xs text-green-600 mt-1">Respuestas promedio: 2.3s</p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-sm font-medium text-blue-700">Clasificación IA</span>
                </div>
                <p className="text-xs text-blue-600">Hoy: 12 clasificaciones</p>
                <p className="text-xs text-blue-600 mt-1">Precisión estimada: 94%</p>
              </div>
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500" />
                  <span className="text-sm font-medium text-purple-700">Acciones Auto</span>
                </div>
                <p className="text-xs text-purple-600">Propuestas: 5</p>
                <p className="text-xs text-purple-600 mt-1">Aprobadas: 3 · Rechazadas: 1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
