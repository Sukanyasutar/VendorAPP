import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: string;
}

export function KPICard({ title, value, icon: Icon, trend, color = "bg-blue-600" }: KPICardProps) {
  return (
    <Card className="relative overflow-hidden border border-neutral-200/60 bg-white shadow-xs transition-all duration-200 hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">{title}</p>
            <h3 className="text-3xl font-bold tracking-tight text-neutral-900">{value}</h3>
          </div>
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-xs ${color}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        {trend && (
          <div className="mt-4 flex items-center">
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border ${
              trend.isPositive 
                ? "bg-green-50 text-green-700 border-green-200/40" 
                : "bg-red-50 text-red-700 border-red-200/40"
            }`}>
              {trend.value}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
