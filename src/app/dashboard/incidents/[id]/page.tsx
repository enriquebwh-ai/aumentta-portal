"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AlertCircle, CheckCircle, Clock, Bot, ArrowLeft, Check, X } from "lucide-react";
import Link from "next/link";
import { formatDate, formatDateTime, getInitials } from "@/lib/utils";

const mockIncident = {
  id: "1",
  title: "Error en botón de checkout",
  description: "El botón de hacer pedido no funciona cuando el carrito tiene más de 3 items. El usuario hace click en el botón y no pasa nada. Esto ocurre tanto en móvil como en escritorio.",
  status: "PROPOSED" as const,
  priority: "HIGH" as const,
  type: "bug" as const,
  project: "E-commerce Farmacia",
  createdAt: "2025-01-15T10:30:00Z",
  updatedAt: "2025-01-15T10:30:00Z",
  messages: [
    {
      id: "1",
      sender: "Cliente",
      senderType: "CLIENT" as const,
      content: "Hola, he encontrado un error en el checkout. Cuando tengo más de 3 items en el carrito y hago click en 'Hacer pedido', no pasa nada. ¿Podeis mirarlo?",
      createdAt: "2025-01-15T10:30:00Z",
    },
    {
      id: "2",
      sender: "Asistente IA",
      senderType: "AI" as const,
      content: "He recibido tu incidencia sobre el error en el botón de checkout. La he clasificado como BUG de prioridad ALTA. Estoy analizando el código relacionado con el carrito y el botón de pedido.",
      createdAt: "2025-01-15T10:31:00Z",
    },
    {
      id: "3",
      sender: "Asistente IA",
      senderType: "AI" as const,
      content: "ANÁLISIS COMPLETO:\n\nHe revisado el código del componente CartButton.tsx y el hook useCheckout.ts. El problema está en la validación del carrito que no permite más de 3 items.\n\nLínea 45 en useCheckout.ts:\nif (cartItems.length > 3) { return { error: 'Máximo 3 items' } }\n\nPROPUESTA DE SOLUCIÓN:\nEliminar o aumentar el límite de items en el carrito. ¿Quieres que lo cambiemos a 10 items?",
      createdAt: "2025-01-15T10:32:00Z",
    },
  ],
};

const statusConfig = {
  OPEN: { label: "Abierta", color: "bg-red-100 text-red-700 border-red-200" },
  ANALYZING: { label: "En Análisis", color: "bg-amber-100 text-amber-700 border-amber-200" },
  PROPOSED: { label: "Propuesta Enviada", color: "bg-blue-100 text-blue-700 border-blue-200" },
  RESOLVED: { label: "Resuelta", color: "bg-green-100 text-green-700 border-green-200" },
  CLOSED: { label: "Cerrada", color: "bg-gray-100 text-gray-700 border-gray-200" },
};

const priorityConfig = {
  LOW: "Baja",
  MEDIUM: "Media",
  HIGH: "Alta",
};

export default function IncidentDetailPage({ params }: { params: { id: string } }) {
  const incident = mockIncident;
  const status = statusConfig[incident.status];

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Header title="Detalle de Incidencia" subtitle={`#${incident.id} - ${incident.project}`} />

      <div className="p-6">
        <div className="mb-6">
          <Link
            href="/dashboard/incidents"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a Incidencias
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{incident.title}</CardTitle>
                    <p className="text-gray-600">{incident.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="activity">
                  <TabsList>
                    <TabsTrigger value="activity">Actividad</TabsTrigger>
                    <TabsTrigger value="analysis">Análisis IA</TabsTrigger>
                    <TabsTrigger value="files">Archivos</TabsTrigger>
                  </TabsList>

                  <TabsContent value="activity" className="space-y-4 mt-4">
                    {incident.messages.map((message) => (
                      <div key={message.id} className="flex gap-3">
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarFallback className={message.senderType === "AI" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}>
                            {message.senderType === "AI" ? <Bot className="h-4 w-4" /> : getInitials(message.sender)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{message.sender}</span>
                            {message.senderType === "AI" && (
                              <Badge variant="default" className="text-xs">IA</Badge>
                            )}
                            <span className="text-xs text-gray-400">{formatDateTime(message.createdAt)}</span>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 text-sm whitespace-pre-wrap">
                            {message.content}
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="analysis">
                    <Card className="mt-4">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Bot className="h-5 w-5 text-blue-500" />
                          <span className="font-medium">Análisis automático</span>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-gray-500">Clasificación</p>
                              <p className="font-medium">BUG - Error de validación</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Prioridad</p>
                              <p className="font-medium text-red-600">ALTA</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Solución propuesta</p>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                              <code className="text-xs font-mono">
                                {"if (cartItems.length > 3) { return { error: 'Máximo 3 items' } }"}
                                <br />
                                {"// Cambiar a: if (cartItems.length > 10)"}
                              </code>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="files">
                    <div className="mt-4 text-center py-8 text-gray-500">
                      No hay archivos adjuntos
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {incident.status === "PROPOSED" && (
              <Card className="border-blue-200 bg-blue-50/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-blue-100 p-2">
                        <Check className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Propuesta de solución lista</p>
                        <p className="text-sm text-gray-600">¿Aprobar los cambios propuestos?</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                        <X className="h-4 w-4 mr-1" />
                        Rechazar
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Check className="h-4 w-4 mr-1" />
                        Aprobar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Información</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Estado</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                    {status.label}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Prioridad</p>
                  <p className="font-medium text-red-600">{priorityConfig[incident.priority]}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tipo</p>
                  <p className="font-medium capitalize">{incident.type === "bug" ? "Error" : incident.type === "change" ? "Cambio" : "Consulta"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Proyecto</p>
                  <p className="font-medium">{incident.project}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Creada</p>
                  <p className="font-medium">{formatDateTime(incident.createdAt)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
