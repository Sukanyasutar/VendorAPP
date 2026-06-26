import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Search, Filter, Download, Eye, FileText, LayoutGrid, LayoutList, FolderOpen, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { toast } from "sonner";

const documents = [
  {
    id: 1,
    name: "INV-2024-045.pdf",
    type: "Invoice",
    po: "PO-2024-056",
    store: "Mumbai - Bandra",
    size: "245 KB",
    uploadedBy: "vendor@ddapl.com",
    uploadedDate: "2024-05-15",
    status: "approved",
  },
  {
    id: 2,
    name: "POD-2024-045-1.jpg",
    type: "POD",
    po: "PO-2024-056",
    store: "Mumbai - Bandra",
    size: "1.2 MB",
    uploadedBy: "vendor@ddapl.com",
    uploadedDate: "2024-05-15",
    status: "approved",
  },
  {
    id: 3,
    name: "INV-2024-044.pdf",
    type: "Invoice",
    po: "PO-2024-055",
    store: "Delhi - South Campus",
    size: "312 KB",
    uploadedBy: "vendor@ddapl.com",
    uploadedDate: "2024-05-14",
    status: "rejected",
  },
  {
    id: 4,
    name: "INV-2024-043.pdf",
    type: "Invoice",
    po: "PO-2024-054",
    store: "Bangalore - Koramangala",
    size: "198 KB",
    uploadedBy: "vendor@ddapl.com",
    uploadedDate: "2024-05-13",
    status: "pending",
  },
  {
    id: 5,
    name: "POD-2024-043-1.jpg",
    type: "POD",
    po: "PO-2024-054",
    store: "Bangalore - Koramangala",
    size: "980 KB",
    uploadedBy: "vendor@ddapl.com",
    uploadedDate: "2024-05-13",
    status: "pending",
  },
];

export function Documents() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterQuery = searchParams.get("filter");
  
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [filterType, setFilterType] = useState(filterQuery || "all");
  const [previewDoc, setPreviewDoc] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (filterQuery) {
      setFilterType(filterQuery);
    } else {
      setFilterType("all");
    }
  }, [filterQuery]);

  const handleFilterTypeChange = (value: string) => {
    setFilterType(value);
    if (value === "all") {
      searchParams.delete("filter");
    } else {
      searchParams.set("filter", value);
    }
    setSearchParams(searchParams);
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesType = filterType === "all" || doc.type.toLowerCase() === filterType.toLowerCase();
    const matchesStatus = filterStatus === "all" || doc.status.toLowerCase() === filterStatus.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      doc.name.toLowerCase().includes(query) ||
      doc.po.toLowerCase().includes(query) ||
      doc.store.toLowerCase().includes(query) ||
      doc.type.toLowerCase().includes(query);

    return matchesType && matchesStatus && matchesSearch;
  });

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

  const getFileIcon = (type: string) => {
    if (type === "Invoice") {
      return <FileText className="h-8 w-8 text-blue-600" />;
    }
    return <FolderOpen className="h-8 w-8 text-purple-600" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Document Center</h1>
        <p className="mt-1 text-neutral-500">Manage and search all documents</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <button
          onClick={() => handleFilterTypeChange("all")}
          className="text-left w-full block focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl cursor-pointer"
        >
          <Card className={`transition-all duration-200 ${
            filterType === "all" 
              ? "border-blue-600 bg-blue-50/20 ring-1 ring-blue-600/30 shadow-xs" 
              : "border-neutral-200/70 hover:border-neutral-300 hover:bg-neutral-50/40"
          }`}>
            <CardContent className="p-4">
              <div className="text-xs text-neutral-500 font-medium">Total Documents</div>
              <div className="mt-1 text-2xl font-bold">{documents.length}</div>
            </CardContent>
          </Card>
        </button>

        <button
          onClick={() => handleFilterTypeChange("invoice")}
          className="text-left w-full block focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl cursor-pointer"
        >
          <Card className={`transition-all duration-200 ${
            filterType === "invoice" 
              ? "border-blue-600 bg-blue-50/20 ring-1 ring-blue-600/30 shadow-xs" 
              : "border-neutral-200/70 hover:border-neutral-300 hover:bg-neutral-50/40"
          }`}>
            <CardContent className="p-4">
              <div className="text-xs text-neutral-500 font-medium">Invoices</div>
              <div className="mt-1 text-2xl font-bold">
                {documents.filter((d) => d.type === "Invoice").length}
              </div>
            </CardContent>
          </Card>
        </button>

        <button
          onClick={() => handleFilterTypeChange("pod")}
          className="text-left w-full block focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl cursor-pointer"
        >
          <Card className={`transition-all duration-200 ${
            filterType === "pod" 
              ? "border-blue-600 bg-blue-50/20 ring-1 ring-blue-600/30 shadow-xs" 
              : "border-neutral-200/70 hover:border-neutral-300 hover:bg-neutral-50/40"
          }`}>
            <CardContent className="p-4">
              <div className="text-xs text-neutral-500 font-medium">POD Documents</div>
              <div className="mt-1 text-2xl font-bold">
                {documents.filter((d) => d.type === "POD").length}
              </div>
            </CardContent>
          </Card>
        </button>

        <Card className="border-neutral-200/70">
          <CardContent className="p-4">
            <div className="text-xs text-neutral-500 font-medium">Total Size</div>
            <div className="mt-1 text-2xl font-bold text-neutral-900">4.2 MB</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Browse and manage all uploaded files</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input 
                placeholder="Search by PO, invoice, or store..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterType} onValueChange={handleFilterTypeChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="invoice">Invoice</SelectItem>
                <SelectItem value="pod">POD</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
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
                setFilterStatus("all");
                handleFilterTypeChange("all");
              }}
            >
              Reset Filters
            </Button>
          </div>

          {/* Grid View */}
          {viewMode === "grid" && (
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="mb-3 flex items-center justify-center rounded-lg bg-neutral-50 p-6">
                      {getFileIcon(doc.type)}
                    </div>
                    <div className="space-y-2">
                      <p className="truncate font-medium text-sm">{doc.name}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">{doc.type}</Badge>
                        {getStatusBadge(doc.status)}
                      </div>
                      <p className="text-xs text-neutral-500">{doc.size}</p>
                      <div className="flex gap-1 pt-2">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => setPreviewDoc(doc)}>
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => toast.success(`Downloading ${doc.name}...`)}>
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === "list" && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>PO Number</TableHead>
                    <TableHead>Store</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{doc.type}</Badge>
                      </TableCell>
                      <TableCell>{doc.po}</TableCell>
                      <TableCell>{doc.store}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell className="text-sm text-neutral-500">{doc.uploadedBy}</TableCell>
                      <TableCell>{doc.uploadedDate}</TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => setPreviewDoc(doc)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => toast.success(`Downloading ${doc.name}...`)}>
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!previewDoc} onOpenChange={(open) => !open && setPreviewDoc(null)}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Document Preview
            </DialogTitle>
            <DialogDescription>
              Viewing {previewDoc?.name} ({previewDoc?.type})
            </DialogDescription>
          </DialogHeader>
          
          {previewDoc && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4 rounded-lg bg-neutral-50 p-4 text-sm">
                <div>
                  <span className="text-neutral-500 block">Document Name</span>
                  <span className="font-medium text-neutral-900">{previewDoc.name}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Associated PO</span>
                  <span className="font-medium text-neutral-900">{previewDoc.po}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Store Location</span>
                  <span className="font-medium text-neutral-900">{previewDoc.store}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">File Size</span>
                  <span className="font-medium text-neutral-900">{previewDoc.size}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Uploaded By</span>
                  <span className="font-medium text-neutral-900">{previewDoc.uploadedBy}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Upload Date</span>
                  <span className="font-medium text-neutral-900">{previewDoc.uploadedDate}</span>
                </div>
              </div>

              <div className="rounded-lg border bg-white p-6 shadow-xs min-h-[250px] flex flex-col justify-between">
                {previewDoc.type === "Invoice" ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-start border-b pb-4">
                      <div>
                        <h4 className="text-lg font-bold text-neutral-800">INVOICE</h4>
                        <span className="text-xs text-neutral-500">{previewDoc.name.replace(".pdf", "")}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-neutral-800">DDAPL India</span>
                        <p className="text-xs text-neutral-500">Bandra West, Mumbai</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Bill To:</span>
                        <span className="font-medium text-neutral-800">Retail Distribution Corp</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">PO Number:</span>
                        <span className="font-medium text-neutral-800">{previewDoc.po}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 mt-2 font-medium">
                        <span>Description</span>
                        <span>Amount</span>
                      </div>
                      <div className="flex justify-between text-neutral-600">
                        <span>Device Batch Purchase (Qty: 50)</span>
                        <span>₹12,45,000.00</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-start border-b pb-4">
                      <div>
                        <h4 className="text-lg font-bold text-neutral-800">PROOF OF DELIVERY</h4>
                        <span className="text-xs text-neutral-500">{previewDoc.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold text-green-600 uppercase border border-green-200 bg-green-50 px-2 py-0.5 rounded">
                          Delivered
                        </span>
                      </div>
                    </div>
                    
                    <div className="rounded-md border bg-neutral-50 p-4 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-2">
                        <CheckCircle className="h-6 w-6 text-blue-600" />
                      </div>
                      <p className="text-sm font-medium text-neutral-800">Delivery Receipt Scan Attached</p>
                      <p className="text-xs text-neutral-400 mt-1">Recipient Signature: Verified</p>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-between items-center text-xs text-neutral-400 border-t pt-4">
                  <span>DDAPL Management System</span>
                  <span className="text-green-600 font-medium">Verified Document</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
