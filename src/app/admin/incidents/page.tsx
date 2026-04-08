"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, AlertCircle, Clock, CheckCircle, Filter, Bot } from "lucide-react";
import Link from "next/link";
import { formatDateTime, getInitials } from "@/lib/utils";

const allIncidents = [
  { id: "1", title: "Error en botón de checkout", client: "Farmacia Princesa", priority: "HIGH", status: "OPEN", type: "bug", createdAt: "2025-01-15T10:30:00Z", hasAIAnalysis: true },
  { id: "2", title: "Solicitar integración WhatsApp", client: "All-In Hamburguesas", priority: "MEDIUM", status: "PROPOSED", type: "change", createdAt: "2025-01-14T16:20:00Z", hasAIAnalysis: true },
  { id: "3", title: "Error en validación formularios", client: "NeuroFCarbonell", priority: "MEDIUM", status: "RESOLVED", type: "bug", createdAt: "2025-01-10T09:00:00Z", hasAIAnalysis: true },
  { id: "4", title: "Consulta sobre estado de proyecto", client: "Peletería Ramiro", priority: "LOW", status: "CLOSED", type: "question", createdAt: "2025-01-08T14:15:00Z", hasAIAnalysis: false },
  { id: "5", title: "Añadir nuevos campos al formulario", client: "Farmacia Princesa", priority: "MEDIUM", status: "ANALYZING", type: "change", createdAt: "2025-01-15T08:00:00Z", hasAIAnalysis: true },
  { id: "6", title: "Error al subir imágenes", client: "All-In Hamburguesas", priority: "HIGH", status: "OPEN", type: "bug", createdAt: "2025-01-15T07:30:00Z", hasAIAnalysis: false },
];

const statusConfig = {
  OPEN: { label: "Abierta", color: "bg-red-100 text-red-700", icon: AlertCircle },
  ANALYZING: { label: "En Análisis", color: "bg-amber-100 text-amber-700", icon: Clock },
  PROPOSED: { label: "Propuesta", color: "bg-blue-100 text-blue-700", icon: Bot },
  RESOLVED: { label: "Resuelta", color: "bg-green-100 text-green-700", icon: CheckCircle },
  CLOSED: { label: "Cerrada", color: "bg-gray-100 text-gray-700", icon: CheckCircle },
};

const priorityConfig = {
  HIGH: { label: "Alta", color: "bg-red-100 text-red-700" },
  MEDIUM: { label: "Media", color: "bg-amber-100 text-amber-700" },
  LOW: { label: "Baja", color: "bg-gray-100 text-gray-700" },
};

const typeConfig = {
  bug: "Bug",
  change: "Cambio",
  question: "Consulta",
};

export default function AdminIncidentsPage() {
  const openCount = allIncidents.filter(i => i.status === "OPEN").length;
  const analyzingCount = allIncidents.filter(i => i.status === "ANALYZING").length;
  const proposedCount = allIncidents.filter(i => i.status === "PROPOSED").length;

  return (
    <div className="min-h-screen">
      <div className="border-b border-gray-200 bg-white px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Incidencias</h1>
        <p className="text-sm text-gray-500">Todas las incidencias de tus clientes</p>
      </div>

      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="font-medium text-red-700">{openCount} abiertas</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
              <Clock className="h-4 w-4 text-amber-600" />
              <span className="font-medium text-amber-700">{analyzingCount} en análisis</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <Bot className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-700">{proposedCount} con propuesta</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Buscar incidencias..." className="w-64 pl-9" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="open">Abiertas</TabsTrigger>
            <TabsTrigger value="analyzing">En Análisis</TabsTrigger>
            <TabsTrigger value="proposed">Con Propuesta</TabsTrigger>
            <TabsTrigger value="resolved">Resueltas</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {allIncidents.map((incident) => {
                    const status = statusConfig[incident.status as keyof typeof statusConfig];
                    const priority = priorityConfig[incident.priority as keyof typeof priorityConfig];
                    const StatusIcon = status.icon;
                    return (
                      <div key={incident.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                              {getInitials(incident.client)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-gray-900">{incident.title}</p>
                              {incident.hasAIAnalysis && (
                                <Badge variant="default" className="text-xs h-5">
                                  <Bot className="h-3 w-3 mr-1" />
                                  IA
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{incident.client} · {typeConfig[incident.type as keyof typeof typeConfig]}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priority.color}`}>
                            {priority.label}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                            <StatusIcon className="h-3 w-3 inline mr-1" />
                            {status.label}
                          </span>
                          <span className="text-xs text-gray-400">{formatDateTime(incident.createdAt)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="open">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {allIncidents.filter(i => i.status === "OPEN").map((incident) => {
                    const status = statusConfig[incident.status as keyof typeof statusConfig];
                    const priority = priorityConfig[incident.priority as keyof typeof priorityConfig];
                    const StatusIcon = status.icon;
                    return (
                      <div key={incident.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                              {getInitials(incident.client)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{incident.title}</p>
                            <p className="text-sm text-gray-500">{incident.client}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priority.color}`}>
                            {priority.label}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                            <StatusIcon className="h-3 w-3 inline mr-1" />
                            {status.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analyzing">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {allIncidents.filter(i => i.status === "ANALYZING").map((incident) => {
                    const status = statusConfig[incident.status as keyof typeof statusConfig];
                    const priority = priorityConfig[incident.priority as keyof typeof priorityConfig];
                    return (
                      <div key={incident.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                              {getInitials(incident.client)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{incident.title}</p>
                            <p className="text-sm text-gray-500">{incident.client}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="default" className="h-5">
                            <Bot className="h-3 w-3 mr-1" />
                            IA Analizando...
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="proposed">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {allIncidents.filter(i => i.status === "PROPOSED").map((incident) => {
                    const status = statusConfig[incident.status as keyof typeof statusConfig];
                    const priority = priorityConfig[incident.priority as keyof typeof priorityConfig];
                    return (
                      <div key={incident.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                              {getInitials(incident.client)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{incident.title}</p>
                            <p className="text-sm text-gray-500">{incident.client}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="text-red-600">Rechazar</Button>
                          <Button size="sm">Aprobar Cambio</Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resolved">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {allIncidents.filter(i => i.status === "RESOLVED" || i.status === "CLOSED").map((incident) => {
                    const status = statusConfig[incident.status as keyof typeof statusConfig];
                    const priority = priorityConfig[incident.priority as keyof typeof priorityConfig];
                    const StatusIcon = status.icon;
                    return (
                      <div key={incident.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                              {getInitials(incident.client)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{incident.title}</p>
                            <p className="text-sm text-gray-500">{incident.client}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                            <StatusIcon className="h-3 w-3 inline mr-1" />
                            {status.label}
                          </span>
                          <span className="text-xs text-gray-400">{formatDateTime(incident.createdAt)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
