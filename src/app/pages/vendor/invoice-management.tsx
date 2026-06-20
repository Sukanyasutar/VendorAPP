import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Filter, Upload, Download, Eye, MoreHorizontal } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";

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
  },
];

export function InvoiceManagement() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");

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

  const filteredInvoices = statusFilter === "all"
    ? invoices
    : invoices.filter((inv) => inv.status === statusFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invoice Management</h1>
          <p className="mt-1 text-neutral-500">Manage and track all invoices</p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Invoice
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-neutral-500">Total Invoices</div>
            <div className="mt-2 text-2xl font-semibold">{invoices.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-neutral-500">Approved</div>
            <div className="mt-2 text-2xl font-semibold text-green-600">
              {invoices.filter((i) => i.status === "approved").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-neutral-500">Pending</div>
            <div className="mt-2 text-2xl font-semibold text-amber-600">
              {invoices.filter((i) => i.status === "pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-neutral-500">Rejected</div>
            <div className="mt-2 text-2xl font-semibold text-red-600">
              {invoices.filter((i) => i.status === "rejected").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>Search and filter invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input placeholder="Search by invoice, PO, or store..." className="pl-10" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice Number</TableHead>
                  <TableHead>Store Name</TableHead>
                  <TableHead>PO Number</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>POD Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.store}</TableCell>
                    <TableCell>{invoice.po}</TableCell>
                    <TableCell>{invoice.quantity}</TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>{getPODStatusBadge(invoice.podStatus)}</TableCell>
                    <TableCell>{invoice.submittedDate}</TableCell>
                    <TableCell>{invoice.lastUpdated}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/vendor/pod-upload/${invoice.id}`)}>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload POD
                          </DropdownMenuItem>
                          <DropdownMenuItem>
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
    </div>
  );
}
