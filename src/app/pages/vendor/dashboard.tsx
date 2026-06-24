import { useState } from "react";
import { FileText, Clock, XCircle, CheckCircle, TrendingUp, Package, Eye, MoreHorizontal, Upload, Download, ChevronDown } from "lucide-react";
import { KPICard } from "../../components/dashboard/kpi-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { useNavigate } from "react-router";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

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

const invoices = [
  {
    id: "INV-2024-045",
    store: "Mumbai - Bandra",
    po: "PO-2024-056",
    quantity: 50,
    status: "approved",
    podStatus: "uploaded",
    submittedDate: "2024-05-15",
    lastUpdated: "2024-05-16",
    amount: "₹2,50,000",
    customerName: "Zepto",
    poType: "Standard",
  },
  {
    id: "INV-2024-044",
    store: "Delhi - South Campus",
    po: "PO-2024-055",
    quantity: 30,
    status: "rejected",
    podStatus: "pending",
    submittedDate: "2024-05-14",
    lastUpdated: "2024-05-17",
    amount: "₹1,50,000",
    customerName: "Zepto",
    poType: "Regular",
  },
  {
    id: "INV-2024-043",
    store: "Bangalore - Koramangala",
    po: "PO-2024-054",
    quantity: 45,
    status: "pending",
    podStatus: "uploaded",
    submittedDate: "2024-05-13",
    lastUpdated: "2024-05-13",
    amount: "₹2,25,000",
    customerName: "Zepto",
    poType: "Ad-hoc",
  },
  {
    id: "INV-2024-042",
    store: "Mumbai - Andheri",
    po: "PO-2024-053",
    quantity: 60,
    status: "approved",
    podStatus: "uploaded",
    submittedDate: "2024-05-12",
    lastUpdated: "2024-05-15",
    amount: "₹3,00,000",
    customerName: "Zepto",
    poType: "Standard",
  },
  {
    id: "INV-2024-041",
    store: "Bangalore - Indiranagar",
    po: "PO-2024-052",
    quantity: 25,
    status: "pending",
    podStatus: "pending",
    submittedDate: "2024-05-11",
    lastUpdated: "2024-05-11",
    amount: "₹1,25,000",
    customerName: "Zepto",
    poType: "Regular",
  },
];

export function VendorDashboard() {
  const navigate = useNavigate();
  const [invoicesList] = useState(invoices);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPODStatusBadge = (status: string) => {
    switch (status) {
      case "uploaded":
        return <Badge className="bg-blue-100 text-blue-800">Uploaded</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
          <p className="mt-1 text-neutral-500">Welcome back, DDAPL</p>
        </div>
        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 font-medium">
                <TrendingUp className="h-4 w-4" />
                View KPI Metrics
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>KPI Metrics Overview</DialogTitle>
                <DialogDescription>
                  Overview of recent purchase orders, approvals, and rejections.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-4">
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
            </DialogContent>
          </Dialog>
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

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>Overview of recent invoices and purchase orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO Number</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Type of PO</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>POD Status</TableHead>
                  <TableHead>PO Date</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoicesList.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 px-2 font-medium hover:bg-neutral-100/50 justify-start gap-1">
                            {invoice.po}
                            <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="w-[750px] max-w-[calc(100vw-32px)] p-2 bg-white"
                          onPointerDownOutside={(e) => {
                            const target = e.target as HTMLElement;
                            if (target?.closest('[data-slot="dropdown-menu-content"]')) {
                              e.preventDefault();
                            }
                          }}
                        >
                          <div className="rounded-md border overflow-hidden">
                            <Table>
                              <TableHeader className="bg-neutral-50/75">
                                <TableRow>
                                  <TableHead className="font-semibold text-neutral-900">Invoice</TableHead>
                                  <TableHead className="font-semibold text-neutral-900">Customer Name - Store Name</TableHead>
                                  <TableHead className="font-semibold text-neutral-900">Invoice Amount</TableHead>
                                  <TableHead className="font-semibold text-neutral-900">Status</TableHead>
                                  <TableHead className="font-semibold text-neutral-900">Invoice Date</TableHead>
                                  <TableHead className="font-semibold text-neutral-900 text-center">View</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow className="hover:bg-transparent">
                                  <TableCell className="font-semibold text-neutral-950">{invoice.id}</TableCell>
                                  <TableCell className="text-neutral-600">{invoice.customerName} - {invoice.store}</TableCell>
                                  <TableCell className="text-neutral-600">{invoice.amount}</TableCell>
                                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                                  <TableCell className="text-neutral-600">{invoice.submittedDate}</TableCell>
                                  <TableCell className="text-center">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toast.info(`Viewing details for ${invoice.id}`);
                                      }}
                                    >
                                      <Eye className="h-4 w-4 text-neutral-500 hover:text-neutral-900" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell className="text-neutral-600">{invoice.customerName}</TableCell>
                    <TableCell className="text-neutral-600">{invoice.poType}</TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>{getPODStatusBadge(invoice.podStatus)}</TableCell>
                    <TableCell className="text-neutral-600">{invoice.submittedDate}</TableCell>
                    <TableCell className="text-neutral-600">{invoice.lastUpdated}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.info(`Viewing details for ${invoice.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/vendor/pod-upload/${invoice.id}`)}>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload POD
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.success(`Downloading invoice ${invoice.id}...`)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download Invoice
                          </DropdownMenuItem>
                          {invoice.status === "rejected" && (
                            <DropdownMenuItem onClick={() => navigate(`/vendor/rejections/${invoice.id}`)}>
                              Resolve Rejection
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

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
    </div>
  );
}
