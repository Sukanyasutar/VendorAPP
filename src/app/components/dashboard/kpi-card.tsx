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
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-neutral-500">{title}</p>
            <p className="mt-2 text-3xl font-semibold">{value}</p>
            {trend && (
              <p className={`mt-2 text-sm ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
                {trend.value}
              </p>
            )}
          </div>
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
