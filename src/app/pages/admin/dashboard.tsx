import { Users, FileText, Activity, Settings, Shield, Database } from "lucide-react";
import { useNavigate } from "react-router";
import { KPICard } from "../../components/dashboard/kpi-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

const systemStats = [
  { metric: "Total Users", value: 45 },
  { metric: "Active Sessions", value: 12 },
  { metric: "Storage Used", value: "124 GB" },
  { metric: "API Calls Today", value: "12,345" },
];

const userActivityData = [
  { day: "Mon", vendor: 45, customer: 32, admin: 5 },
  { day: "Tue", vendor: 52, customer: 38, admin: 4 },
  { day: "Wed", vendor: 48, customer: 35, admin: 6 },
  { day: "Thu", vendor: 61, customer: 42, admin: 5 },
  { day: "Fri", vendor: 55, customer: 40, admin: 7 },
  { day: "Sat", vendor: 38, customer: 28, admin: 3 },
  { day: "Sun", vendor: 30, customer: 22, admin: 2 },
];

const recentUsers = [
  { id: 1, name: "John Doe", email: "john@ddapl.com", role: "Vendor", status: "active", lastLogin: "2 hours ago" },
  { id: 2, name: "Jane Smith", email: "jane@zepto.com", role: "Customer", status: "active", lastLogin: "5 hours ago" },
  { id: 3, name: "Mike Johnson", email: "mike@ddapl.com", role: "Vendor", status: "inactive", lastLogin: "2 days ago" },
  { id: 4, name: "Sarah Williams", email: "sarah@zepto.com", role: "Customer", status: "active", lastLogin: "1 day ago" },
];

const systemLogs = [
  { id: 1, timestamp: "2024-05-18 14:30:45", action: "User Login", user: "john@ddapl.com", status: "success" },
  { id: 2, timestamp: "2024-05-18 14:25:12", action: "Invoice Approved", user: "jane@zepto.com", status: "success" },
  { id: 3, timestamp: "2024-05-18 14:20:33", action: "PO Created", user: "john@ddapl.com", status: "success" },
  { id: 4, timestamp: "2024-05-18 14:15:21", action: "Failed Login Attempt", user: "unknown@test.com", status: "error" },
  { id: 5, timestamp: "2024-05-18 14:10:08", action: "POD Uploaded", user: "mike@ddapl.com", status: "success" },
];

export function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <p className="mt-1 text-neutral-500">System overview and management</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2 font-medium">
              <Activity className="h-4 w-4" />
              View KPI Metrics
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>Admin KPI Metrics Overview</DialogTitle>
              <DialogDescription>
                System metrics overview, including total users, active sessions, and system health.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-4">
              <KPICard
                title="Total Users"
                value="45"
                icon={Users}
                trend={{ value: "+5 this week", isPositive: true }}
                color="bg-blue-600"
              />
              <KPICard
                title="Active Sessions"
                value="12"
                icon={Activity}
                trend={{ value: "Currently online", isPositive: true }}
                color="bg-green-600"
              />
              <KPICard
                title="Storage Used"
                value="124 GB"
                icon={Database}
                trend={{ value: "62% capacity", isPositive: true }}
                color="bg-purple-600"
              />
              <KPICard
                title="System Health"
                value="99.8%"
                icon={Shield}
                trend={{ value: "All systems operational", isPositive: true }}
                color="bg-amber-600"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* User Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>User Activity Analysis</CardTitle>
          <CardDescription>Activity breakdown by user role</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userActivityData}>
              <CartesianGrid key="grid" strokeDasharray="3 3" />
              <XAxis key="xaxis" dataKey="day" />
              <YAxis key="yaxis" />
              <Tooltip key="tooltip" />
              <Bar key="vendor" dataKey="vendor" fill="#3b82f6" name="Vendor" />
              <Bar key="customer" dataKey="customer" fill="#10b981" name="Customer" />
              <Bar key="admin" dataKey="admin" fill="#a855f7" name="Admin" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* User Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Recent user activity</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-xs" onClick={() => navigate("/admin/users")}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-neutral-500">{user.email}</p>
                      <p className="text-xs text-neutral-400">Last login: {user.lastLogin}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={user.status === "active" ? "default" : "secondary"}>
                      {user.role}
                    </Badge>
                    <Badge variant={user.status === "active" ? "outline" : "secondary"} className="text-xs">
                      {user.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>System Statistics</CardTitle>
            <CardDescription>Key metrics and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                      <Activity className="h-5 w-5 text-purple-600" />
                    </div>
                    <p className="font-medium">{stat.metric}</p>
                  </div>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Logs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>System Activity Logs</CardTitle>
              <CardDescription>Recent system events and actions</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => navigate("/admin/logs")}>
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {systemLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>
                    <Badge variant={log.status === "success" ? "default" : "destructive"}>
                      {log.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
