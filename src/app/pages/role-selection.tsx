import { useNavigate } from "react-router";
import { Building2, Store, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export function RoleSelection() {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Vendor (DDAPL)",
      description: "Create POs, manage invoices, upload POD documents",
      icon: Building2,
      path: "/vendor/dashboard",
      color: "bg-blue-600",
    },
    {
      title: "Customer (Zepto)",
      description: "Review and approve invoices, manage purchase orders",
      icon: Store,
      path: "/customer/dashboard",
      color: "bg-green-600",
    },
    {
      title: "Admin",
      description: "User management, system logs, and configuration",
      icon: Shield,
      path: "/admin/dashboard",
      color: "bg-purple-600",
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 p-8">
      <div className="w-full max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">PO & Invoice Management System</h1>
          <p className="text-lg text-neutral-600">
            Select your role to access the dashboard
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {roles.map((role) => (
            <Card key={role.title} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-lg ${role.color}`}>
                  <role.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle>{role.title}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => navigate(role.path)}
                  className="w-full"
                >
                  Continue as {role.title.split(" ")[0]}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
