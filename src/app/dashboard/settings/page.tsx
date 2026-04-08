"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/ui/avatar";
import { User, Mail, Phone, Building, Bell, Shield, LogOut } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen">
      <Header title="Configuración" subtitle="Gestiona tu cuenta" />

      <div className="p-6 max-w-2xl">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Perfil</CardTitle>
              <CardDescription>Información de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <UserAvatar name="Cliente Demo" className="h-20 w-20 text-xl" />
                <div>
                  <h3 className="font-semibold text-gray-900">Cliente Demo</h3>
                  <p className="text-sm text-gray-500">Cliente desde Enero 2025</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Cambiar foto
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nombre</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input value="Cliente Demo" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input value="demo@aumentta.com" className="pl-10" type="email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Teléfono</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input value="+34 600 000 000" className="pl-10" type="tel" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Empresa</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input value="Empresa Demo S.L." className="pl-10" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Guardar cambios</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notificaciones</CardTitle>
              <CardDescription>Configura cómo quieres recibir notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Bell className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Notificaciones por email</p>
                    <p className="text-sm text-gray-500">Recibe actualizaciones por email</p>
                  </div>
                </div>
                <Badge variant="success">Activado</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Bell className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Mensajes del chat</p>
                    <p className="text-sm text-gray-500">Notificaciones de nuevos mensajes</p>
                  </div>
                </div>
                <Badge variant="secondary">Desactivado</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Bell className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Cambios en tareas</p>
                    <p className="text-sm text-gray-500">Cuando se actualicen tus tareas</p>
                  </div>
                </div>
                <Badge variant="success">Activado</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
              <CardDescription>Gestiona la seguridad de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Cambiar contraseña</p>
                    <p className="text-sm text-gray-500">Último cambio: hace 30 días</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Cambiar</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Zona de peligro</CardTitle>
              <CardDescription>Acciones irreversibles</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar sesión en todos los dispositivos
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
