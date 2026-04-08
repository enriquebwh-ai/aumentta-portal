"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  CheckSquare,
  Settings,
  LogOut,
  Zap,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/projects", icon: FolderKanban, label: "Proyectos" },
  { href: "/chat", icon: MessageSquare, label: "Chat" },
  { href: "/tasks", icon: CheckSquare, label: "Tareas" },
  { href: "/settings", icon: Settings, label: "Configuración" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-60 border-r border-gray-200 bg-white">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-6">
          <Zap className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-gray-900">Aumentta</span>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary border-l-2 border-primary"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 p-4">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900">
            <LogOut className="h-5 w-5" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </aside>
  );
}
