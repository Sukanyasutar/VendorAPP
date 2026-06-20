import { FileText, Clock, XCircle, CheckCircle, TrendingDown, AlertTriangle } from "lucide-react";
import { KPICard } from "../../components/dashboard/kpi-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { useNavigate } from "react-router";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const approvalTrendData = [
  { month: "Jan", approved: 42, rejected: 8, pending: 5 },
  { month: "Feb", approved: 48, rejected: 6, pending: 4 },
  { month: "Mar", approved: 56, rejected: 7, pending: 6 },
  { month: "Apr", approved: 52, rejected: 5, pending: 3 },
  { month: "May", approved: 61, rejected: 4, pending: 8 },
];

const pendingReviews = [
  { id: 1, invoice: "INV-2024-043", vendor: "DDAPL", store: "Bangalore - Koramangala", amount: "₹2,45,000", submittedDate: "2024-05-13", priority: "medium" },
  { id: 2, invoice: "INV-2024-041", vendor: "DDAPL", store: "Bangalore - Indiranagar", amount: "₹1,80,000", submittedDate: "2024-05-11", priority: "high" },
  { id: 3, invoice: "INV-2024-039", vendor: "DDAPL", store: "Mumbai - Bandra", amount: "₹3,20,000", submittedDate: "2024-05-09", priority: "high" },
];

const recentApprovals = [
  { id: 1, invoice: "INV-2024-045", store: "Mumbai - Bandra", action: "Approved", time: "2 hours ago", status: "approved" },
  { id: 2, invoice: "INV-2024-042", store: "Mumbai - Andheri", action: "Approved", time: "5 hours ago", status: "approved" },
  { id: 3, invoice: "INV-2024-044", store: "Delhi - South Campus", action: "Rejected", time: "1 day ago", status: "rejected" },
  { id: 4, invoice: "INV-2024-040", store: "Bangalore - Whitefield", action: "Approved", time: "2 days ago", status: "approved" },
];

export function CustomerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customer Dashboard</h1>
          <p className="mt-1 text-neutral-500">Welcome back, Zepto</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Pending Reviews"
          value="8"
          icon={Clock}
          trend={{ value: "3 urgent items", isPositive: false }}
          color="bg-amber-600"
        />
        <KPICard
          title="Approved This Month"
          value="61"
          icon={CheckCircle}
          trend={{ value: "+12% from last month", isPositive: true }}
          color="bg-green-600"
        />
        <KPICard
          title="Rejected This Month"
          value="4"
          icon={XCircle}
          trend={{ value: "-2 from last month", isPositive: true }}
          color="bg-red-600"
        />
        <KPICard
          title="Pending Resubmissions"
          value="3"
          icon={AlertTriangle}
          trend={{ value: "Awaiting vendor action", isPositive: false }}
          color="bg-purple-600"
        />
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Approval Trend Analysis</CardTitle>
          <CardDescription>Invoice review status over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={approvalTrendData}>
              <CartesianGrid key="grid" strokeDasharray="3 3" />
              <XAxis key="xaxis" dataKey="month" />
              <YAxis key="yaxis" />
              <Tooltip key="tooltip" />
              <Line key="approved" type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={2} />
              <Line key="rejected" type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2} />
              <Line key="pending" type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Approval Queue */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Approval Queue</CardTitle>
            <CardDescription>Invoices awaiting your review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingReviews.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{item.invoice}</p>
                      <Badge variant={item.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                        {item.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-neutral-500">{item.store}</p>
                    <div className="mt-1 flex items-center gap-4 text-xs text-neutral-400">
                      <span>{item.amount}</span>
                      <span>•</span>
                      <span>Submitted {item.submittedDate}</span>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => navigate(`/customer/review/${item.id}`)}>
                    Review
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full">
              View All Pending ({pendingReviews.length})
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest review actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApprovals.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                    {activity.status === "approved" ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.invoice}</p>
                    <p className="text-sm text-neutral-500">{activity.store}</p>
                    <p className="text-xs text-neutral-400">{activity.time}</p>
                  </div>
                  <Badge
                    variant={activity.status === "approved" ? "default" : "destructive"}
                  >
                    {activity.action}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Average Review Time</p>
                <p className="mt-2 text-2xl font-semibold">2.4 hours</p>
                <p className="mt-1 text-xs text-green-600">-15% faster</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Approval Rate</p>
                <p className="mt-2 text-2xl font-semibold">93.8%</p>
                <p className="mt-1 text-xs text-green-600">+2.4%</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <TrendingDown className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Total Processed</p>
                <p className="mt-2 text-2xl font-semibold">65</p>
                <p className="mt-1 text-xs text-neutral-500">This month</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
