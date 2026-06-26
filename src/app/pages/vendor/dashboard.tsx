import { useState } from "react";
import { 
  FileText, 
  Clock, 
  XCircle, 
  CheckCircle, 
  TrendingUp, 
  Package, 
  Eye, 
  MoreHorizontal, 
  Upload, 
  Download, 
  ChevronDown, 
  ChevronRight, 
  SlidersHorizontal,
  PlusSquare,
  AlertCircle,
  Banknote
} from "lucide-react";
import { KPICard } from "../../components/dashboard/kpi-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { useNavigate } from "react-router";
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
} from "../../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

interface PODDocument {
  id: string;
  status: "verified" | "uploaded" | "pending";
}

interface Invoice {
  id: string;
  store: string;
  amount: string;
  status: "approved" | "rejected" | "pending";
  submittedDate: string;
  pods: PODDocument[];
}

interface PurchaseOrder {
  poNumber: string;
  customerName: string;
  poType: string;
  status: "approved" | "rejected" | "pending";
  podStatus: "uploaded" | "pending";
  poDate: string;
  lastUpdated: string;
  invoices: Invoice[];
}

const purchaseOrdersData: PurchaseOrder[] = [
  {
    poNumber: "PO-2024-056",
    customerName: "Zepto",
    poType: "Standard",
    status: "approved",
    podStatus: "uploaded",
    poDate: "2024-05-15",
    lastUpdated: "2024-05-16",
    invoices: [
      {
        id: "INV-2024-045",
        store: "Mumbai - Bandra",
        amount: "₹2,50,000",
        status: "approved",
        submittedDate: "2024-05-15",
        pods: [
          { id: "POD-882-A", status: "verified" },
          { id: "POD-882-B", status: "uploaded" }
        ]
      }
    ]
  },
  {
    poNumber: "PO-2024-054",
    customerName: "Zepto",
    poType: "Standard",
    status: "approved",
    podStatus: "uploaded",
    poDate: "2024-05-14",
    lastUpdated: "2024-05-17",
    invoices: [
      {
        id: "INV-2024-043",
        store: "Bangalore - Koramangala",
        amount: "₹2,25,000",
        status: "pending",
        submittedDate: "2024-05-13",
        pods: [
          { id: "POD-880-A", status: "verified" }
        ]
      }
    ]
  },
  {
    poNumber: "PO-2024-053",
    customerName: "Zepto",
    poType: "Regular",
    status: "pending",
    podStatus: "pending",
    poDate: "2024-05-12",
    lastUpdated: "2024-05-15",
    invoices: [
      {
        id: "INV-2024-042",
        store: "Mumbai - Andheri",
        amount: "₹3,00,000",
        status: "approved",
        submittedDate: "2024-05-12",
        pods: []
      }
    ]
  }
];

const recentActivities = [
  {
    id: 1,
    title: "Invoice #INV-2024-045 Approved",
    subtitle: "Verified by System Admin • 2 hours ago",
    type: "approved"
  },
  {
    id: 2,
    title: "New Purchase Order Issued",
    subtitle: "PO-2024-059 from Zepto Retail • 4 hours ago",
    type: "issued"
  },
  {
    id: 3,
    title: "Payment Disbursed",
    subtitle: "₹12,45,000 sent for Batch 08 • Yesterday",
    type: "payment"
  }
];

const pendingActionsList = [
  {
    id: 1,
    title: "Unsigned PODs",
    subtitle: "3 deliveries require signature uploads",
    color: "border-red-500",
    buttonText: "Resolve",
    buttonClass: "border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300",
    path: "/vendor/pod-upload/INV-2024-044"
  },
  {
    id: 2,
    title: "Tax Compliance",
    subtitle: "Update GST Certificate before end of month",
    color: "border-amber-500",
    buttonText: "Update",
    buttonClass: "border-amber-200 text-amber-600 hover:bg-amber-50 hover:border-amber-300",
    path: "/settings"
  },
  {
    id: 3,
    title: "Draft Invoices",
    subtitle: "2 invoices are in draft mode",
    color: "border-blue-500",
    buttonText: "Submit",
    buttonClass: "border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300",
    path: "/vendor/invoices"
  }
];

export function VendorDashboard() {
  const navigate = useNavigate();
  const [purchaseOrders] = useState<PurchaseOrder[]>(purchaseOrdersData);
  const [expandedPOs, setExpandedPOs] = useState<Record<string, boolean>>({
    "PO-2024-056": true
  });
  const [expandedInvoices, setExpandedInvoices] = useState<Record<string, boolean>>({
    "INV-2024-045": true
  });

  const [previewDoc, setPreviewDoc] = useState<{
    type: "Invoice" | "PO" | "POD";
    invoiceId: string;
    poNumber: string;
    store: string;
    amount: string;
    submittedDate: string;
    podStatus: string;
    customerName: string;
  } | null>(null);

  const togglePO = (poNumber: string) => {
    setExpandedPOs(prev => ({
      ...prev,
      [poNumber]: !prev[poNumber]
    }));
  };

  const toggleInvoice = (invoiceId: string) => {
    setExpandedInvoices(prev => ({
      ...prev,
      [invoiceId]: !prev[invoiceId]
    }));
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <Badge className="bg-green-50 text-green-700 border-none font-semibold text-[10px] px-2 py-0.5 rounded-md hover:bg-green-50 uppercase">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-50 text-red-700 border-none font-semibold text-[10px] px-2 py-0.5 rounded-md hover:bg-red-50 uppercase">Rejected</Badge>;
      case "pending":
        return <Badge className="bg-amber-50 text-amber-700 border-none font-semibold text-[10px] px-2 py-0.5 rounded-md hover:bg-amber-50 uppercase">Pending</Badge>;
      default:
        return <Badge variant="secondary" className="text-[10px] px-2 py-0.5 rounded-md uppercase">{status}</Badge>;
    }
  };

  const getPODStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "uploaded":
        return <Badge className="bg-blue-50 text-blue-700 border-none font-semibold text-[10px] px-2 py-0.5 rounded-md hover:bg-blue-50 uppercase">Uploaded</Badge>;
      case "verified":
        return <Badge className="bg-green-50 text-green-700 border-none font-semibold text-[10px] px-2 py-0.5 rounded-md hover:bg-green-50 uppercase">Verified</Badge>;
      case "pending":
        return <Badge className="bg-neutral-100 text-neutral-600 border border-neutral-200/60 font-semibold text-[10px] px-2 py-0.5 rounded-md hover:bg-neutral-100 uppercase">Pending</Badge>;
      default:
        return <Badge variant="secondary" className="text-[10px] px-2 py-0.5 rounded-md uppercase">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Vendor Dashboard</h1>
          <p className="mt-1 text-sm text-neutral-500">Welcome back, DDAPL. Here's what needs your attention today.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 h-10 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-lg px-4 shadow-sm text-xs font-bold text-neutral-800 transition-colors cursor-pointer">
                <TrendingUp className="h-4.5 w-4.5 text-neutral-500" />
                <span>View KPI Metrics</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl">
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

          <Button 
            onClick={() => navigate("/vendor/create-po")}
            className="flex items-center gap-2 h-10 bg-[#1e293b] text-white hover:bg-[#0f172a] rounded-lg px-4 shadow-sm text-xs font-bold transition-colors cursor-pointer"
          >
            <PlusSquare className="h-4.5 w-4.5 text-white/90" />
            <span>Create PO</span>
          </Button>

          <Button 
            onClick={() => navigate("/vendor/invoices")} 
            className="flex items-center gap-2 h-10 bg-[#0052cc] text-white hover:bg-[#0747a6] rounded-lg px-4 shadow-sm text-xs font-bold transition-colors cursor-pointer"
          >
            <Upload className="h-4.5 w-4.5 text-white/90" />
            <span>Upload Invoice</span>
          </Button>
        </div>
      </div>

      {/* Recent Invoices & POs Card */}
      <Card className="border border-neutral-200/70 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-neutral-100 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-neutral-800">Recent Invoices & POs</CardTitle>
              <CardDescription className="text-xs text-neutral-500 mt-1">Overview of your most recent transactions and their statuses.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-600 hover:bg-neutral-100">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-600 hover:bg-neutral-100">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-neutral-50/50">
              <TableRow className="border-b border-neutral-100 hover:bg-transparent">
                <TableHead className="font-bold text-neutral-500 text-xs py-3">PO NUMBER</TableHead>
                <TableHead className="font-bold text-neutral-500 text-xs py-3">CUSTOMER NAME</TableHead>
                <TableHead className="font-bold text-neutral-500 text-xs py-3">TYPE</TableHead>
                <TableHead className="font-bold text-neutral-500 text-xs py-3">STATUS</TableHead>
                <TableHead className="font-bold text-neutral-500 text-xs py-3">POD STATUS</TableHead>
                <TableHead className="font-bold text-neutral-500 text-xs py-3">PO DATE</TableHead>
                <TableHead className="font-bold text-neutral-500 text-xs py-3">LAST UPDATED</TableHead>
                <TableHead className="font-bold text-neutral-500 text-xs py-3 text-right pr-6">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseOrders.map((po) => {
                const isPoExpanded = !!expandedPOs[po.poNumber];
                return (
                  <>
                    <TableRow key={po.poNumber} className="border-b border-neutral-100 hover:bg-neutral-50/20">
                      <TableCell className="py-4">
                        <Button
                          variant="ghost"
                          className="p-0 h-auto font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1.5 justify-start cursor-pointer focus:ring-0"
                          onClick={() => togglePO(po.poNumber)}
                        >
                          {isPoExpanded ? (
                            <ChevronDown className="h-4 w-4 text-blue-600 shrink-0" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-blue-600 shrink-0" />
                          )}
                          {po.poNumber}
                        </Button>
                      </TableCell>
                      <TableCell className="text-neutral-700 py-4 font-medium">{po.customerName}</TableCell>
                      <TableCell className="text-neutral-500 py-4">{po.poType}</TableCell>
                      <TableCell className="py-4">{getStatusBadge(po.status)}</TableCell>
                      <TableCell className="py-4">{getPODStatusBadge(po.podStatus)}</TableCell>
                      <TableCell className="text-neutral-500 py-4">{po.poDate}</TableCell>
                      <TableCell className="text-neutral-500 py-4">{po.lastUpdated}</TableCell>
                      <TableCell className="text-right pr-6 py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-neutral-100">
                              <MoreHorizontal className="h-4 w-4 text-neutral-400" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toast.info(`Viewing details for ${po.poNumber}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => po.invoices[0] && navigate(`/vendor/pod-upload/${po.invoices[0].id}`)}>
                              <Upload className="mr-2 h-4 w-4" />
                              Upload POD
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.success(`Downloading PO ${po.poNumber}...`)}>
                              <Download className="mr-2 h-4 w-4" />
                              Download PO
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>

                    {/* Level 1: Nested Invoice Sub-Table */}
                    {isPoExpanded && (
                      <TableRow className="bg-neutral-50/30 hover:bg-neutral-50/30 border-b border-neutral-100">
                        <TableCell colSpan={8} className="p-4 pl-8">
                          <div className="rounded-xl border border-neutral-200/50 bg-white p-4 shadow-xs">
                            <Table>
                              <TableHeader className="bg-neutral-50/40">
                                <TableRow className="border-b border-neutral-100 hover:bg-transparent">
                                  <TableHead className="font-bold text-[10px] uppercase text-neutral-400 py-2.5">INVOICE</TableHead>
                                  <TableHead className="font-bold text-[10px] uppercase text-neutral-400 py-2.5">CUSTOMER NAME - STORE</TableHead>
                                  <TableHead className="font-bold text-[10px] uppercase text-neutral-400 py-2.5">AMOUNT</TableHead>
                                  <TableHead className="font-bold text-[10px] uppercase text-neutral-400 py-2.5">STATUS</TableHead>
                                  <TableHead className="font-bold text-[10px] uppercase text-neutral-400 py-2.5">DATE</TableHead>
                                  <TableHead className="font-bold text-[10px] uppercase text-neutral-400 py-2.5 text-center">VIEW</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {po.invoices.map((invoice) => {
                                  const isInvExpanded = !!expandedInvoices[invoice.id];
                                  return (
                                    <>
                                      <TableRow key={invoice.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/10">
                                        <TableCell className="py-3">
                                          <Button
                                            variant="ghost"
                                            className="p-0 h-auto font-bold text-neutral-800 hover:text-neutral-900 flex items-center gap-1.5 justify-start cursor-pointer focus:ring-0"
                                            onClick={() => toggleInvoice(invoice.id)}
                                          >
                                            {isInvExpanded ? (
                                              <ChevronDown className="h-4 w-4 text-neutral-700 shrink-0" />
                                            ) : (
                                              <ChevronRight className="h-4 w-4 text-neutral-700 shrink-0" />
                                            )}
                                            {invoice.id}
                                          </Button>
                                        </TableCell>
                                        <TableCell className="text-xs font-semibold text-neutral-500 py-3">{po.customerName} - {invoice.store}</TableCell>
                                        <TableCell className="text-xs font-bold text-neutral-800 py-3">{invoice.amount}</TableCell>
                                        <TableCell className="py-3">{getStatusBadge(invoice.status)}</TableCell>
                                        <TableCell className="text-xs text-neutral-500 py-3">{invoice.submittedDate}</TableCell>
                                        <TableCell className="text-center py-3">
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 rounded-full border border-blue-100 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              navigate(`/customer/review/${invoice.id}`, { state: { from: "/vendor/dashboard" } });
                                            }}
                                            title="Open Invoice Verification Hub"
                                          >
                                            <Eye className="h-3.5 w-3.5" />
                                          </Button>
                                        </TableCell>
                                      </TableRow>

                                      {/* Level 2: Nested POD Document Table */}
                                      {isInvExpanded && invoice.pods && invoice.pods.length > 0 && (
                                        <TableRow className="bg-neutral-50/20 hover:bg-neutral-50/20">
                                          <TableCell colSpan={6} className="p-3 pl-12">
                                            <div className="border border-neutral-200/50 bg-white rounded-lg p-3 shadow-2xs">
                                              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2.5">
                                                Linked POD Documents
                                              </div>
                                              <Table>
                                                <TableHeader className="bg-neutral-50/30">
                                                  <TableRow className="border-b border-neutral-100/50 hover:bg-transparent">
                                                    <TableHead className="text-[9px] font-bold uppercase text-neutral-400 py-1.5">POD REFERENCE</TableHead>
                                                    <TableHead className="text-[9px] font-bold uppercase text-neutral-400 py-1.5">STATUS</TableHead>
                                                    <TableHead className="text-[9px] font-bold uppercase text-neutral-400 py-1.5 text-center pr-4">ACTION</TableHead>
                                                  </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                  {invoice.pods.map((pod) => (
                                                    <TableRow key={pod.id} className="border-b border-neutral-100/50 last:border-0 hover:bg-neutral-50/30">
                                                      <TableCell className="text-xs font-semibold text-neutral-700 py-2">{pod.id}</TableCell>
                                                      <TableCell className="py-2">{getPODStatusBadge(pod.status)}</TableCell>
                                                      <TableCell className="text-center py-2 pr-4">
                                                        <Button
                                                          variant="ghost"
                                                          size="icon"
                                                          className="h-6 w-6 text-blue-500 hover:text-blue-700 hover:bg-blue-50/50 rounded"
                                                          onClick={() => {
                                                            setPreviewDoc({
                                                              type: "POD",
                                                              invoiceId: invoice.id,
                                                              poNumber: po.poNumber,
                                                              store: invoice.store,
                                                              amount: invoice.amount,
                                                              submittedDate: invoice.submittedDate,
                                                              podStatus: pod.status,
                                                              customerName: po.customerName
                                                            });
                                                          }}
                                                        >
                                                          <Eye className="h-3.5 w-3.5" />
                                                        </Button>
                                                      </TableCell>
                                                    </TableRow>
                                                  ))}
                                                </TableBody>
                                              </Table>
                                            </div>
                                          </TableCell>
                                        </TableRow>
                                      )}
                                    </>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bottom widgets section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="border border-neutral-200/70 shadow-sm">
          <CardHeader className="border-b border-neutral-100 pb-3">
            <CardTitle className="text-base font-bold text-neutral-800">Recent Activity</CardTitle>
            <CardDescription className="text-xs text-neutral-400 mt-0.5">Overview of your most recent transactions and activities.</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 px-6 pb-6">
            <div className="space-y-4">
              {recentActivities.map((act) => {
                let icon = <CheckCircle className="h-5 w-5 text-blue-600" />;
                let bg = "bg-blue-50";
                if (act.type === "issued") {
                  icon = <AlertCircle className="h-5 w-5 text-orange-600" />;
                  bg = "bg-orange-50";
                } else if (act.type === "payment") {
                  icon = <Banknote className="h-5 w-5 text-green-600" />;
                  bg = "bg-green-50";
                }

                return (
                  <div key={act.id} className="flex items-center gap-4 py-1 border-b border-neutral-100 last:border-0 last:pb-0 pb-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bg}`}>
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-neutral-800 text-sm">{act.title}</p>
                      <p className="text-xs text-neutral-400 mt-0.5">{act.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Pending Action Center */}
        <Card className="border border-neutral-200/70 shadow-sm">
          <CardHeader className="border-b border-neutral-100 pb-3">
            <CardTitle className="text-base font-bold text-neutral-800">Pending Action Center</CardTitle>
            <CardDescription className="text-xs text-neutral-400 mt-0.5">Items requiring your immediate attention.</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 px-6 pb-6">
            <div className="space-y-4">
              {pendingActionsList.map((action) => (
                <div 
                  key={action.id} 
                  className={`flex items-center justify-between gap-4 rounded-lg border border-neutral-200/60 p-4 bg-neutral-50/30 hover:bg-neutral-50/75 border-l-4 ${action.color} transition-all duration-150 cursor-pointer hover:shadow-xs active:scale-[0.99]`}
                  onClick={() => navigate(action.path)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-neutral-800 text-sm truncate">{action.title}</p>
                    <p className="text-xs text-neutral-500 mt-0.5 truncate">{action.subtitle}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className={`h-8 px-4 text-xs font-bold shrink-0 transition-colors rounded-lg border pointer-events-none ${action.buttonClass}`}
                  >
                    {action.buttonText}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document Preview Dialog */}
      <Dialog open={!!previewDoc} onOpenChange={(open) => !open && setPreviewDoc(null)}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Document Preview
            </DialogTitle>
            <DialogDescription>
              Viewing {previewDoc?.type} details
            </DialogDescription>
          </DialogHeader>

          {previewDoc && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4 rounded-lg bg-neutral-50 p-4 text-sm">
                <div>
                  <span className="text-neutral-500 block text-xs">Document Type</span>
                  <span className="font-semibold text-neutral-900">{previewDoc.type}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-xs">Invoice Number</span>
                  <span className="font-semibold text-neutral-900">{previewDoc.invoiceId}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-xs">Associated PO</span>
                  <span className="font-semibold text-neutral-900">{previewDoc.poNumber}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-xs">Store / Customer</span>
                  <span className="font-semibold text-neutral-900">{previewDoc.customerName} - {previewDoc.store}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-xs">Amount</span>
                  <span className="font-semibold text-neutral-900">{previewDoc.amount}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-xs">Date</span>
                  <span className="font-semibold text-neutral-900">{previewDoc.submittedDate}</span>
                </div>
              </div>

              <div className="rounded-lg border bg-white p-6 shadow-xs min-h-[220px] flex flex-col justify-between">
                {previewDoc.type === "Invoice" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-start border-b pb-4">
                      <div>
                        <h4 className="text-lg font-bold text-neutral-800 font-sans">INVOICE</h4>
                        <span className="text-xs text-neutral-500">{previewDoc.invoiceId}.pdf</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-neutral-800">{previewDoc.customerName} Inc.</span>
                        <p className="text-xs text-neutral-500">{previewDoc.store}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Bill To:</span>
                        <span className="font-medium text-neutral-800">DDAPL India Private Limited</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">PO Number:</span>
                        <span className="font-medium text-neutral-800">{previewDoc.poNumber}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 mt-2 font-semibold text-neutral-700">
                        <span>Description</span>
                        <span>Amount</span>
                      </div>
                      <div className="flex justify-between text-neutral-600">
                        <span>Device Batch Purchase & Commissioning</span>
                        <span>{previewDoc.amount}</span>
                      </div>
                    </div>
                  </div>
                )}

                {previewDoc.type === "PO" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-start border-b pb-4">
                      <div>
                        <h4 className="text-lg font-bold text-neutral-800 font-sans">PURCHASE ORDER</h4>
                        <span className="text-xs text-neutral-500">{previewDoc.poNumber}.pdf</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-neutral-800">Retail Distribution Corp</span>
                        <p className="text-xs text-neutral-500">Corporate Headquarters</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Vendor:</span>
                        <span className="font-medium text-neutral-800">DDAPL India Private Limited</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Store Destination:</span>
                        <span className="font-medium text-neutral-800">{previewDoc.store}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 mt-2 font-semibold text-neutral-700">
                        <span>Authorized Items</span>
                        <span>Approved Budget</span>
                      </div>
                      <div className="flex justify-between text-neutral-600">
                        <span>Batch Electronics & Devices Supply</span>
                        <span>{previewDoc.amount}</span>
                      </div>
                    </div>
                  </div>
                )}

                {previewDoc.type === "POD" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-start border-b pb-4">
                      <div>
                        <h4 className="text-lg font-bold text-neutral-800 font-sans">PROOF OF DELIVERY</h4>
                        <span className="text-xs text-neutral-500">POD-{previewDoc.poNumber}.pdf</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold text-green-600 uppercase border border-green-200 bg-green-50 px-2 py-0.5 rounded">
                          Delivered
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Carrier:</span>
                        <span className="font-medium text-neutral-800">DDAPL Logistics</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Recipient Store:</span>
                        <span className="font-medium text-neutral-800">{previewDoc.store}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Status:</span>
                        <span className="font-medium text-green-700 uppercase">Received in Good Condition</span>
                      </div>
                      <div className="border-t pt-2 mt-2 text-[10px] text-neutral-400 italic">
                        Signed electronically by Store Manager on {previewDoc.submittedDate}.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
