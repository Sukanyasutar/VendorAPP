import { Download, Calendar, FileText, TrendingUp } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const poSummaryData = [
  { month: "Jan", total: 45, approved: 38, rejected: 7 },
  { month: "Feb", total: 52, approved: 45, rejected: 7 },
  { month: "Mar", total: 61, approved: 54, rejected: 7 },
  { month: "Apr", total: 58, approved: 51, rejected: 7 },
  { month: "May", total: 67, approved: 59, rejected: 8 },
];

const statusDistribution = [
  { name: "Approved", value: 247, color: "#10b981" },
  { name: "Pending", value: 34, color: "#f59e0b" },
  { name: "Rejected", value: 36, color: "#ef4444" },
];

const storePerformance = [
  { store: "Mumbai - Bandra", invoices: 45, approved: 42, rejected: 3 },
  { store: "Bangalore - Koramangala", invoices: 38, approved: 35, rejected: 3 },
  { store: "Delhi - South Campus", invoices: 32, approved: 28, rejected: 4 },
  { store: "Mumbai - Andheri", invoices: 41, approved: 38, rejected: 3 },
  { store: "Bangalore - Indiranagar", invoices: 28, approved: 25, rejected: 3 },
];

const rejectionAnalytics = [
  { reason: "Missing POD", count: 15 },
  { reason: "Incorrect Quantity", count: 8 },
  { reason: "Blurry Image", count: 6 },
  { reason: "Incorrect Store", count: 4 },
  { reason: "Other", count: 3 },
];

export function Reports() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="mt-1 text-neutral-500">Comprehensive business insights</p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="thisMonth">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="thisQuarter">This Quarter</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="po">PO Analysis</TabsTrigger>
          <TabsTrigger value="invoices">Invoice Status</TabsTrigger>
          <TabsTrigger value="rejections">Rejections</TabsTrigger>
          <TabsTrigger value="stores">Store Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-500">Total POs</p>
                    <p className="mt-2 text-3xl font-semibold">283</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-500">Approval Rate</p>
                    <p className="mt-2 text-3xl font-semibold">88.6%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-500">Avg Processing Time</p>
                    <p className="mt-2 text-3xl font-semibold">2.4h</p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-500">Total Value</p>
                    <p className="mt-2 text-3xl font-semibold">₹45.2M</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-amber-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Status Distribution</CardTitle>
                <CardDescription>Invoice status breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      key="pie"
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip key="tooltip" />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Trend</CardTitle>
                <CardDescription>PO and invoice trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={poSummaryData}>
                    <CartesianGrid key="grid" strokeDasharray="3 3" />
                    <XAxis key="xaxis" dataKey="month" />
                    <YAxis key="yaxis" />
                    <Tooltip key="tooltip" />
                    <Legend key="legend" />
                    <Line key="total" type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} name="Total" />
                    <Line key="approved" type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={2} name="Approved" />
                    <Line key="rejected" type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2} name="Rejected" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="po" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>PO Summary Report</CardTitle>
              <CardDescription>Purchase order trends and analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={poSummaryData}>
                  <CartesianGrid key="grid" strokeDasharray="3 3" />
                  <XAxis key="xaxis" dataKey="month" />
                  <YAxis key="yaxis" />
                  <Tooltip key="tooltip" />
                  <Legend key="legend" />
                  <Bar key="total" dataKey="total" fill="#3b82f6" name="Total POs" />
                  <Bar key="approved" dataKey="approved" fill="#10b981" name="Approved" />
                  <Bar key="rejected" dataKey="rejected" fill="#ef4444" name="Rejected" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Status Report</CardTitle>
              <CardDescription>Detailed invoice status breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statusDistribution.map((status) => (
                  <div key={status.name} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="h-4 w-4 rounded"
                        style={{ backgroundColor: status.color }}
                      />
                      <div>
                        <p className="font-medium">{status.name}</p>
                        <p className="text-sm text-neutral-500">
                          {((status.value / statusDistribution.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    <p className="text-2xl font-semibold">{status.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rejection Analytics</CardTitle>
              <CardDescription>Common rejection reasons and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={rejectionAnalytics} layout="vertical">
                  <CartesianGrid key="grid" strokeDasharray="3 3" />
                  <XAxis key="xaxis" type="number" />
                  <YAxis key="yaxis" dataKey="reason" type="category" width={150} />
                  <Tooltip key="tooltip" />
                  <Bar key="count" dataKey="count" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stores" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Store Performance Report</CardTitle>
              <CardDescription>Performance metrics by store location</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={storePerformance}>
                  <CartesianGrid key="grid" strokeDasharray="3 3" />
                  <XAxis key="xaxis" dataKey="store" angle={-45} textAnchor="end" height={120} />
                  <YAxis key="yaxis" />
                  <Tooltip key="tooltip" />
                  <Legend key="legend" />
                  <Bar key="invoices" dataKey="invoices" fill="#3b82f6" name="Total Invoices" />
                  <Bar key="approved" dataKey="approved" fill="#10b981" name="Approved" />
                  <Bar key="rejected" dataKey="rejected" fill="#ef4444" name="Rejected" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
