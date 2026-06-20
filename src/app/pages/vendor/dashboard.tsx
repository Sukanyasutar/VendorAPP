import { FileText, Clock, XCircle, CheckCircle, TrendingUp, Package } from "lucide-react";
import { KPICard } from "../../components/dashboard/kpi-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { useNavigate } from "react-router";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const poTrendData = [
  { month: "Jan", pos: 45, approved: 38, rejected: 7 },
  { month: "Feb", pos: 52, approved: 45, rejected: 7 },
  { month: "Mar", pos: 61, approved: 54, rejected: 7 },
  { month: "Apr", pos: 58, approved: 51, rejected: 7 },
  { month: "May", pos: 67, approved: 59, rejected: 8 },
];

const recentActivity = [
  { id: 1, action: "Invoice Approved", invoice: "INV-2024-045", time: "5 minutes ago", status: "approved" },
  { id: 2, action: "Invoice Rejected", invoice: "INV-2024-044", time: "1 hour ago", status: "rejected" },
  { id: 3, action: "POD Uploaded", invoice: "INV-2024-043", time: "2 hours ago", status: "submitted" },
  { id: 4, action: "Invoice Submitted", invoice: "INV-2024-042", time: "3 hours ago", status: "submitted" },
  { id: 5, action: "PO Created", po: "PO-2024-056", time: "5 hours ago", status: "booked" },
];

const pendingActions = [
  { id: 1, type: "Rejection", invoice: "INV-2024-044", reason: "Missing POD", priority: "high" },
  { id: 2, type: "POD Upload", invoice: "INV-2024-041", reason: "POD required", priority: "medium" },
  { id: 3, type: "Resubmit", invoice: "INV-2024-038", reason: "Incorrect quantity", priority: "high" },
];

export function VendorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
          <p className="mt-1 text-neutral-500">Welcome back, DDAPL</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => navigate("/vendor/create-po")}>
            <Package className="mr-2 h-4 w-4" />
            Create PO
          </Button>
          <Button onClick={() => navigate("/vendor/invoices")} variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Upload Invoice
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total POs"
          value="67"
          icon={FileText}
          trend={{ value: "+12% from last month", isPositive: true }}
          color="bg-blue-600"
        />
        <KPICard
          title="Pending Approvals"
          value="8"
          icon={Clock}
          trend={{ value: "-3 from yesterday", isPositive: true }}
          color="bg-amber-600"
        />
        <KPICard
          title="Rejected Invoices"
          value="3"
          icon={XCircle}
          trend={{ value: "Need attention", isPositive: false }}
          color="bg-red-600"
        />
        <KPICard
          title="Approved This Month"
          value="59"
          icon={CheckCircle}
          trend={{ value: "+8% from last month", isPositive: true }}
          color="bg-green-600"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>PO Trend Analysis</CardTitle>
            <CardDescription>Purchase orders and approvals over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={poTrendData}>
                <CartesianGrid key="grid" strokeDasharray="3 3" />
                <XAxis key="xaxis" dataKey="month" />
                <YAxis key="yaxis" />
                <Tooltip key="tooltip" />
                <Area key="approved" type="monotone" dataKey="approved" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                <Area key="rejected" type="monotone" dataKey="rejected" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
            <CardDescription>Invoice status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={poTrendData}>
                <CartesianGrid key="grid" strokeDasharray="3 3" />
                <XAxis key="xaxis" dataKey="month" />
                <YAxis key="yaxis" />
                <Tooltip key="tooltip" />
                <Bar key="approved" dataKey="approved" fill="#10b981" />
                <Bar key="rejected" dataKey="rejected" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                    {activity.status === "approved" && <CheckCircle className="h-5 w-5 text-green-600" />}
                    {activity.status === "rejected" && <XCircle className="h-5 w-5 text-red-600" />}
                    {activity.status === "submitted" && <TrendingUp className="h-5 w-5 text-blue-600" />}
                    {activity.status === "booked" && <Package className="h-5 w-5 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-neutral-500">
                      {activity.invoice || activity.po}
                    </p>
                    <p className="text-xs text-neutral-400">{activity.time}</p>
                  </div>
                  <Badge
                    variant={
                      activity.status === "approved"
                        ? "default"
                        : activity.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Action Center</CardTitle>
            <CardDescription>Items requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingActions.map((action) => (
                <div key={action.id} className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{action.invoice}</p>
                      <Badge variant={action.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                        {action.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-neutral-500">{action.type}</p>
                    <p className="text-xs text-neutral-400">{action.reason}</p>
                  </div>
                  <Button size="sm" onClick={() => navigate(`/vendor/rejections/${action.id}`)}>
                    Action
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
