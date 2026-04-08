"use client";

import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/ui/avatar";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-sm px-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Buscar..." className="w-64 pl-9 bg-gray-50 border-gray-200" />
        </div>

        <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
        </button>

        <div className="flex items-center gap-3">
          <UserAvatar name="Cliente Demo" className="h-9 w-9" />
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-gray-900">Cliente Demo</p>
            <p className="text-xs text-gray-500">demo@aumentta.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
