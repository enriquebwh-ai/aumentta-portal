"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: { value: number; positive: boolean };
  className?: string;
}

export function StatsCard({ title, value, subtitle, icon, trend, className }: StatsCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
            {trend && (
              <p className={cn("mt-1 text-xs font-medium", trend.positive ? "text-green-600" : "text-red-600")}>
                {trend.positive ? "+" : ""}{trend.value}% vs mes anterior
              </p>
            )}
          </div>
          <div className="rounded-lg bg-primary/10 p-3 text-primary">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
