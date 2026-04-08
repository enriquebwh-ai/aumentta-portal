"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Mail, Phone, Building, MoreHorizontal, FolderKanban, MessageSquare } from "lucide-react";
import Link from "next/link";
import { getInitials } from "@/lib/utils";

const mockClients = [
  {
    id: "1",
    name: "Farmacia Princesa",
    email: "contacto@farmacia-princesa.es",
    phone: "+34 962 123 456",
    company: "Sector Salud",
    projects: 2,
    activeIncidents: 1,
    lastActivity: "hace 10 min",
    status: "active",
  },
  {
    id: "2",
    name: "All-In Hamburguesas",
    email: "info@allin-hamburguesas.com",
    phone: "+34 963 456 789",
    company: "Restauración",
    projects: 1,
    activeIncidents: 1,
    lastActivity: "hace 1 hora",
    status: "active",
  },
  {
    id: "3",
    name: "NeuroFCarbonell",
    email: "citas@neurofcarbonell.es",
    phone: "+34 964 789 012",
    company: "Salud",
    projects: 1,
    activeIncidents: 0,
    lastActivity: "hace 2 horas",
    status: "active",
  },
  {
    id: "4",
    name: "Peletería Ramiro",
    email: "ramiro@peleteriaramiro.es",
    phone: "+34 965 012 345",
    company: "Retail",
    projects: 3,
    activeIncidents: 0,
    lastActivity: "hace 1 día",
    status: "active",
  },
  {
    id: "5",
    name: "Cerrajeros Valencia",
    email: "info@cerrajerosvalencia.es",
    phone: "+34 963 111 222",
    company: "Servicios",
    projects: 1,
    activeIncidents: 0,
    lastActivity: "hace 3 días",
    status: "inactive",
  },
];

export default function AdminClientsPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-gray-200 bg-white px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
            <p className="text-sm text-gray-500">Gestiona todos tus clientes</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Cliente
          </Button>
        </div>
      </div>

      <div className="p-8">
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Buscar clientes..." className="pl-9" />
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {mockClients.map((client) => (
                <div key={client.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getInitials(client.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{client.name}</p>
                        <Badge variant={client.status === "active" ? "success" : "secondary"}>
                          {client.status === "active" ? "Activo" : "Inactivo"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Building className="h-3 w-3" />
                          {client.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {client.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <FolderKanban className="h-4 w-4" />
                          <span>{client.projects} proyectos</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <MessageSquare className="h-4 w-4" />
                          <span>{client.activeIncidents} incidencias</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Última actividad: {client.lastActivity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
