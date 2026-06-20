import { useState } from "react";
import { Search, Filter, Download, Eye, FileText, LayoutGrid, LayoutList, FolderOpen } from "lucide-react";
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
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [filterType, setFilterType] = useState("all");

  const filteredDocuments = filterType === "all"
    ? documents
    : documents.filter((doc) => doc.type.toLowerCase() === filterType);

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
        <h1 className="text-3xl font-bold">Document Center</h1>
        <p className="mt-1 text-neutral-500">Manage and search all documents</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-neutral-500">Total Documents</div>
            <div className="mt-2 text-2xl font-semibold">{documents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-neutral-500">Invoices</div>
            <div className="mt-2 text-2xl font-semibold">
              {documents.filter((d) => d.type === "Invoice").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-neutral-500">POD Documents</div>
            <div className="mt-2 text-2xl font-semibold">
              {documents.filter((d) => d.type === "POD").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-neutral-500">Total Size</div>
            <div className="mt-2 text-2xl font-semibold">4.2 MB</div>
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
              <Input placeholder="Search by PO, invoice, or store..." className="pl-10" />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="invoice">Invoice</SelectItem>
                <SelectItem value="pod">POD</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
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
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
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
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
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
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
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
    </div>
  );
}
