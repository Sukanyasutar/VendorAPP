import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { Search, Filter, Upload, Download, Eye, MoreHorizontal, X, CheckCircle, FileText, TrendingUp } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../../components/ui/dialog";
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
    amount: "₹2,50,000",
    customerName: "Zepto",
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
  },
];

const mockPOs = [
  { po: "PO-2024-056", store: "Mumbai - Bandra" },
  { po: "PO-2024-055", store: "Delhi - South Campus" },
  { po: "PO-2024-054", store: "Bangalore - Koramangala" },
  { po: "PO-2024-053", store: "Mumbai - Andheri" },
  { po: "PO-2024-052", store: "Bangalore - Indiranagar" },
];

export function InvoiceManagement() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [invoicesList, setInvoicesList] = useState(invoices);

  // Upload Invoice Form State
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [selectedPO, setSelectedPO] = useState("");
  const [storeName, setStoreName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
    progress: number;
    status: "uploading" | "complete" | "error";
  } | null>(null);

  const handlePOChange = (poNum: string) => {
    setSelectedPO(poNum);
    const poObj = mockPOs.find((p) => p.po === poNum);
    if (poObj) {
      setStoreName(poObj.store);
    } else {
      setStoreName("");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF, JPG, and PNG files are allowed");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setUploadedFile({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      progress: 0,
      status: "uploading",
    });

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setUploadedFile((prev) =>
        prev
          ? {
              ...prev,
              progress,
              status: progress === 100 ? "complete" : "uploading",
            }
          : null
      );
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 150);
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceNumber || !selectedPO || !quantity || !uploadedFile) {
      toast.error("Please fill in all fields and upload a file");
      return;
    }
    if (uploadedFile.status === "uploading") {
      toast.error("Please wait for the file upload to complete");
      return;
    }

    const newInvoice = {
      id: invoiceNumber,
      store: storeName,
      po: selectedPO,
      quantity: Number(quantity),
      status: "pending",
      podStatus: "pending",
      submittedDate: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      amount: `₹${(Number(quantity) * 5000).toLocaleString("en-IN")}`,
      customerName: "Zepto",
    };

    setInvoicesList([newInvoice, ...invoicesList]);
    toast.success("Invoice uploaded successfully!");
    setIsUploadOpen(false);

    // Reset Form
    setInvoiceNumber("");
    setSelectedPO("");
    setStoreName("");
    setQuantity("");
    setUploadedFile(null);
  };

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

  const filteredInvoices = invoicesList.filter((inv) => {
    const matchesStatus = statusFilter === "all" || inv.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      inv.id.toLowerCase().includes(query) ||
      inv.po.toLowerCase().includes(query) ||
      inv.store.toLowerCase().includes(query) ||
      inv.customerName.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Invoice Management</h1>
          <p className="mt-1 text-neutral-500">Manage and track all invoices</p>
        </div>
        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 font-medium">
                <TrendingUp className="h-4 w-4" />
                View Metrics
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl">
              <DialogHeader>
                <DialogTitle>Invoice Metrics Overview</DialogTitle>
                <DialogDescription>
                  Overview of invoice counts by status (Approved, Pending, and Rejected).
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 md:grid-cols-4 mt-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-sm text-neutral-500">Total Invoices</div>
                    <div className="mt-2 text-2xl font-semibold">{invoicesList.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-sm text-neutral-500">Approved</div>
                    <div className="mt-2 text-2xl font-semibold text-green-600">
                      {invoicesList.filter((i) => i.status === "approved").length}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-sm text-neutral-500">Pending</div>
                    <div className="mt-2 text-2xl font-semibold text-amber-600">
                      {invoicesList.filter((i) => i.status === "pending").length}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-sm text-neutral-500">Rejected</div>
                    <div className="mt-2 text-2xl font-semibold text-red-600">
                      {invoicesList.filter((i) => i.status === "rejected").length}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Invoice
              </Button>
            </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Upload Invoice</DialogTitle>
              <DialogDescription>
                Link a new invoice to an active Purchase Order.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUploadSubmit} className="space-y-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="inv-num">Invoice Number *</Label>
                <Input
                  id="inv-num"
                  placeholder="e.g. INV-2024-046"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="po-select">PO Number *</Label>
                  <Select value={selectedPO} onValueChange={handlePOChange} required>
                    <SelectTrigger id="po-select">
                      <SelectValue placeholder="Select PO Number" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockPOs.map((p) => (
                        <SelectItem key={p.po} value={p.po}>
                          {p.po}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="store-name">Store Name</Label>
                  <Input
                    id="store-name"
                    value={storeName}
                    readOnly
                    placeholder="Auto-populated"
                    className="bg-neutral-50"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="inv-qty">Quantity *</Label>
                <Input
                  id="inv-qty"
                  type="number"
                  placeholder="e.g. 50"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>Invoice Document *</Label>
                {!uploadedFile ? (
                  <div
                    className={`relative rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
                      isDragging
                        ? "border-blue-600 bg-blue-50/50"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      id="invoice-file-upload"
                      className="sr-only"
                      accept=".pdf,image/*"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="invoice-file-upload" className="cursor-pointer block">
                      <Upload className="mx-auto h-8 w-8 text-neutral-400" />
                      <p className="mt-2 text-sm font-medium text-neutral-700">
                        Drag & drop Invoice file, or <span className="text-blue-600 hover:underline">browse</span>
                      </p>
                      <p className="mt-1 text-xs text-neutral-500">
                        Supports PDF, JPG, PNG up to 10MB
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-4 bg-neutral-50/50">
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-neutral-900 truncate">
                          {uploadedFile.name}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-neutral-500">{uploadedFile.size}</span>
                          {uploadedFile.status === "uploading" && (
                            <span className="text-xs text-blue-600 animate-pulse">Uploading...</span>
                          )}
                          {uploadedFile.status === "complete" && (
                            <span className="flex items-center text-xs text-green-600">
                              <CheckCircle className="mr-1 h-3.5 w-3.5" /> Uploaded
                            </span>
                          )}
                        </div>
                        {uploadedFile.status === "uploading" && (
                          <div className="mt-2 w-full bg-neutral-100 rounded-full h-1.5">
                            <div
                              className="bg-blue-600 h-1.5 rounded-full transition-all duration-150"
                              style={{ width: `${uploadedFile.progress}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100/50"
                      onClick={removeFile}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsUploadOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!uploadedFile || uploadedFile.status === "uploading"}>
                  Submit Invoice
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
          </Dialog>
        </div>
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
              <Input 
                placeholder="Search by invoice, PO, or store..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
            <Button 
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
              }}
            >
              Reset Filters
            </Button>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO Number</TableHead>
                  <TableHead>Store Name</TableHead>
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
                    <TableCell className="font-medium">{invoice.po}</TableCell>
                    <TableCell>{invoice.store}</TableCell>
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
