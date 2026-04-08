"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  AlertCircle,
  MessageSquare,
  Settings,
  LogOut,
  Zap,
  Bot,
} from "lucide-react";

const adminNavItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/clients", icon: Users, label: "Clientes" },
  { href: "/admin/projects", icon: FolderKanban, label: "Proyectos" },
  { href: "/admin/incidents", icon: AlertCircle, label: "Incidencias" },
  { href: "/admin/chat", icon: MessageSquare, label: "Chat Central" },
  { href: "/admin/ai", icon: Bot, label: "Configuración IA" },
  { href: "/admin/settings", icon: Settings, label: "Ajustes" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-60 border-r border-gray-200 bg-gray-900">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-2 border-b border-gray-700 px-6">
          <Zap className="h-6 w-6 text-accent" />
          <span className="text-lg font-bold text-white">Aumentta Admin</span>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-700 p-4">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-800 hover:text-white">
            <LogOut className="h-5 w-5" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </aside>
  );
}
