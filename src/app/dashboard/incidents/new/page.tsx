"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Bug, Lightbulb, HelpCircle, ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

type IncidentType = "bug" | "change" | "question";

const incidentTypes: { type: IncidentType; label: string; icon: React.ElementType; description: string }[] = [
  {
    type: "bug",
    label: "Reportar Error",
    icon: Bug,
    description: "Algo no funciona como debería",
  },
  {
    type: "change",
    label: "Solicitar Cambio",
    icon: Lightbulb,
    description: "Quiero modificar o añadir algo",
  },
  {
    type: "question",
    label: "Consulta",
    icon: HelpCircle,
    description: "Tengo una duda o pregunta",
  },
];

export default function NewIncidentPage() {
  const [selectedType, setSelectedType] = useState<IncidentType | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType || !title || !description) {
      toast.error("Por favor, completa todos los campos");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Incidencia creada. Te notificaremos cuando haya actualizaciones.");
    setLoading(false);
  };

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Header title="Nueva Incidencia" subtitle="Reporta un problema o solicita un cambio" />

      <div className="p-6 max-w-2xl mx-auto">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-gray-100 text-gray-700 h-10 px-4 py-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Dashboard
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>¿Qué tipo de incidencia tienes?</CardTitle>
              <CardDescription>Selecciona el tipo que mejor describa tu situación</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3">
              {incidentTypes.map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setSelectedType(item.type)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedType === item.type
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <item.icon
                    className={`h-6 w-6 mb-2 ${
                      selectedType === item.type ? "text-primary" : "text-gray-400"
                    }`}
                  />
                  <p className="font-medium text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detalles de la incidencia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Título</label>
                <Input
                  placeholder="Breve descripción del problema"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Descripción detallada</label>
                <Textarea
                  placeholder="Explica el problema con todo el detalle posible. Incluye pasos para reproducir el error si es un bug."
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Prioridad</label>
                <div className="flex gap-3">
                  {(["LOW", "MEDIUM", "HIGH"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        priority === p
                          ? p === "HIGH"
                            ? "bg-red-100 text-red-700 border border-red-200"
                            : p === "MEDIUM"
                            ? "bg-amber-100 text-amber-700 border border-amber-200"
                            : "bg-gray-100 text-gray-700 border border-gray-200"
                          : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {p === "LOW" && "Baja"}
                      {p === "MEDIUM" && "Media"}
                      {p === "HIGH" && "Alta"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium">¿Cómo funciona el proceso?</p>
                    <p className="mt-1">
                      Cuando envíes la incidencia, nuestra IA la analizará y propondrá una solución. El equipo
                      de Aumentta revisará la propuesta antes de implementar cualquier cambio.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-gray-200 bg-white hover:bg-gray-50 text-gray-900 h-10 px-4 py-2"
            >
              Cancelar
            </Link>
            <Button type="submit" loading={loading} disabled={!selectedType || !title || !description}>
              <Send className="h-4 w-4 mr-2" />
              Enviar Incidencia
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
