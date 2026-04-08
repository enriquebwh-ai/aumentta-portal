"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Bot, CheckCircle, XCircle, Loader2, RefreshCw } from "lucide-react";

export default function AdminAIPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-gray-200 bg-white px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Configuración de IA</h1>
        <p className="text-sm text-gray-500">Configura el motor de inteligencia artificial</p>
      </div>

      <div className="p-8 space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-blue-500" />
                  Ollama - Modelo Local
                </CardTitle>
                <Badge variant="success" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Activo
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-green-700">Conexión exitosa</span>
                </div>
                <div className="text-sm text-green-600 space-y-1">
                  <p><strong>Modelo:</strong> llama3.2:latest</p>
                  <p><strong>Tamaño:</strong> 2.0 GB</p>
                  <p><strong>Endpoint:</strong> http://localhost:11434/v1</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">URL de Ollama</label>
                <Input defaultValue="http://localhost:11434/v1" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Modelo</label>
                <Input defaultValue="llama3.2" />
              </div>

              <div className="flex gap-2">
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Verificar Conexión
                </Button>
                <Button>Guardar Cambios</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modelos Disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">llama3.2</p>
                      <p className="text-sm text-gray-500">2.0 GB · Más reciente</p>
                    </div>
                  </div>
                  <Badge variant="success">Instalado</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">codellama</p>
                      <p className="text-sm text-gray-500">3.8 GB · Para código</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Instalar</Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">mistral</p>
                      <p className="text-sm text-gray-500">4.1 GB · General</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Instalar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Configuración de Respuestas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Temperatura</label>
                <Input type="number" defaultValue="0.7" step="0.1" min="0" max="2" />
                <p className="text-xs text-gray-500">Controla la creatividad (0=determinista, 2=muy creativo)</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Max Tokens</label>
                <Input type="number" defaultValue="2048" step="256" min="256" max="8192" />
                <p className="text-xs text-gray-500">Longitud máxima de respuesta</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Top P</label>
                <Input type="number" defaultValue="0.9" step="0.1" min="0" max="1" />
                <p className="text-xs text-gray-500">Diversificación de respuestas</p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button>Guardar Configuración</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Registro de Actividad IA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 border-b">
                <span className="text-gray-600">Clasificaciones hoy</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex items-center justify-between p-2 border-b">
                <span className="text-gray-600">Respuestas generadas</span>
                <span className="font-medium">48</span>
              </div>
              <div className="flex items-center justify-between p-2 border-b">
                <span className="text-gray-600">Tiempo promedio respuesta</span>
                <span className="font-medium">2.3s</span>
              </div>
              <div className="flex items-center justify-between p-2">
                <span className="text-gray-600">Propuestas de solución</span>
                <span className="font-medium">5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
