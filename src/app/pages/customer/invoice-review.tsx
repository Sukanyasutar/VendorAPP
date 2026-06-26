import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { 
  ArrowLeft, Download, CheckCircle, AlertCircle, Search, ZoomIn, ZoomOut, 
  RotateCcw, Maximize2, MapPin, User, Phone, Mail, FileText, Check, X, 
  AlertTriangle, Info, Calendar, Truck, Home, ShoppingCart, BarChart3, 
  FolderOpen, Bell, Settings, ChevronRight, RefreshCw
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Textarea } from "../../components/ui/textarea";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import { toast } from "sonner";

// Mock Database of Invoices for dynamic lookup
interface InvoiceData {
  id: string;
  po: string;
  poDate: string;
  customerName: string;
  store: string;
  storeAddress: string;
  storeHub: string;
  manager: string;
  managerEmail: string;
  managerPhone: string;
  amount: string;
  submittedDate: string;
  due: string;
  quantity: number;
  poType: string;
  podId: string;
  carrier: string;
  status: "approved" | "rejected" | "pending";
}

const mockInvoices: Record<string, InvoiceData> = {
  "INV-2024-045": {
    id: "INV-2024-045",
    po: "PO-2024-056",
    poDate: "May 12, 2024",
    customerName: "Zepto",
    store: "Mumbai - Bandra",
    storeHub: "Mumbai Hub-12",
    storeAddress: "88 Turner Road, Bandra West, Mumbai, MH 400050",
    manager: "Rajesh Kumar",
    managerEmail: "r.kumar@procurehub.com",
    managerPhone: "+91 98765 43210",
    amount: "₹2,50,000",
    submittedDate: "May 15, 2024",
    due: "June 15, 2024",
    quantity: 50,
    poType: "Standard",
    podId: "POD-882-A",
    carrier: "SwiftLogistics",
    status: "approved",
  },
  "INV-2024-044": {
    id: "INV-2024-044",
    po: "PO-2024-055",
    poDate: "May 11, 2024",
    customerName: "Zepto",
    store: "Delhi - South Campus",
    storeHub: "Delhi Hub-02",
    storeAddress: "14 Satya Niketan, South Campus, New Delhi, DL 110021",
    manager: "Aisha Sharma",
    managerEmail: "a.sharma@procurehub.com",
    managerPhone: "+91 99999 88888",
    amount: "₹1,50,000",
    submittedDate: "May 14, 2024",
    due: "June 14, 2024",
    quantity: 30,
    poType: "Regular",
    podId: "POD-881-B",
    carrier: "Bluedart Courier",
    status: "rejected",
  },
  "INV-2024-043": {
    id: "INV-2024-043",
    po: "PO-2024-054",
    poDate: "May 10, 2024",
    customerName: "Zepto",
    store: "Bangalore - Koramangala",
    storeHub: "Bangalore Hub-04",
    storeAddress: "88 Retail Parkway, Suite B, Bangalore, KA 560034",
    manager: "Marcus Thorne",
    managerEmail: "m.thorne@procurehub.com",
    managerPhone: "+1 (404) 555-0198",
    amount: "₹2,25,000",
    submittedDate: "May 13, 2024",
    due: "June 13, 2024",
    quantity: 45,
    poType: "Ad-hoc",
    podId: "POD-880-C",
    carrier: "Delhivery Premium",
    status: "pending",
  },
  "INV-2024-042": {
    id: "INV-2024-042",
    po: "PO-2024-053",
    poDate: "May 09, 2024",
    customerName: "Zepto",
    store: "Mumbai - Andheri",
    storeHub: "Mumbai Hub-08",
    storeAddress: "Lokhandwala Complex, Andheri West, Mumbai, MH 400053",
    manager: "Sanjay Dutt",
    managerEmail: "s.dutt@procurehub.com",
    managerPhone: "+91 98222 11111",
    amount: "₹3,00,000",
    submittedDate: "May 12, 2024",
    due: "June 12, 2024",
    quantity: 60,
    poType: "Standard",
    podId: "POD-879-D",
    carrier: "SwiftLogistics",
    status: "approved",
  },
  "INV-2024-041": {
    id: "INV-2024-041",
    po: "PO-2024-052",
    poDate: "May 08, 2024",
    customerName: "Zepto",
    store: "Bangalore - Indiranagar",
    storeHub: "Bangalore Hub-01",
    storeAddress: "100 Feet Road, Indiranagar, Bangalore, KA 560038",
    manager: "Priya Nair",
    managerEmail: "p.nair@procurehub.com",
    managerPhone: "+91 97444 33333",
    amount: "₹1,25,000",
    submittedDate: "May 11, 2024",
    due: "June 11, 2024",
    quantity: 25,
    poType: "Regular",
    podId: "POD-878-E",
    carrier: "XpressBees",
    status: "pending",
  },
};

const rejectionTemplates = [
  "Missing POD - Proof of delivery document is not uploaded or incomplete",
  "Incorrect Store Name - Store name does not match the PO details",
  "Blurry Image - POD image is unclear or unreadable",
  "Incorrect Quantity - Quantity mentioned doesn't match PO",
  "Incorrect Device Type - Device type doesn't match PO specifications",
];

export function InvoiceReview() {
  const navigate = useNavigate();
  const { invoiceId } = useParams();
  const location = useLocation();
  
  // Resolve current invoice data based on URL parameter, fallback to INV-2024-045
  const invoice = mockInvoices[invoiceId || ""] || mockInvoices["INV-2024-045"];

  const [activeTab, setActiveTab] = useState<"invoice" | "po" | "pod">("invoice");
  const [zoom, setZoom] = useState(100);
  const [confirmMatch, setConfirmMatch] = useState(false);
  const [notes, setNotes] = useState("");
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleResetZoom = () => setZoom(100);

  const handleBack = () => {
    const fromPath = location.state?.from;
    if (fromPath) {
      navigate(fromPath);
    } else {
      if (window.opener) {
        window.close();
      } else {
        if (window.history.length > 1) {
          navigate(-1);
        } else {
          navigate("/customer/dashboard");
        }
      }
    }
  };

  const handleApprove = () => {
    setShowApproveDialog(false);
    toast.success(`Invoice ${invoice.id} approved successfully!`);
    handleBack();
  };

  const handleReject = () => {
    if (!rejectionReason) {
      toast.error("Please provide a rejection reason");
      return;
    }
    setShowRejectDialog(false);
    toast.error(`Invoice ${invoice.id} has been rejected.`);
    handleBack();
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-foreground font-sans flex flex-col h-screen overflow-hidden">
      

        {/* 3. Sub-header & 3-Column Content Dashboard */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          
          {/* Dashboard Sub-header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5 mr-1 shrink-0">
                <Button 
                  variant="outline"
                  size="icon"
                  onClick={handleBack} 
                  className="h-8 w-8 rounded-full border border-neutral-200/80 bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all cursor-pointer shadow-2xs shrink-0"
                  title="Back to Dashboard"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-xl font-bold text-foreground select-none">Invoice Verification Hub</h1>
              </div>
              
              {/* Horizontal Document Bundle tabs, replacing 3-WAY MATCH PENDING */}
              <div className="flex items-center gap-1.5 bg-neutral-100/80 p-1.5 rounded-xl border border-neutral-200/60 shadow-inner">
                {/* PO Tab */}
                <button
                  onClick={() => setActiveTab("po")}
                  className={`px-4 py-2 transition-all duration-200 rounded-lg flex items-center gap-2 text-xs font-extrabold border cursor-pointer select-none ${
                    activeTab === "po" 
                      ? "border-neutral-200 bg-white text-blue-600 shadow-md scale-[1.02]" 
                      : "border-transparent text-neutral-500 hover:text-neutral-800 hover:bg-white/40"
                  }`}
                >
                  <Calendar className={`h-4 w-4 shrink-0 transition-colors ${activeTab === "po" ? "text-blue-600" : "text-neutral-400"}`} />
                  <span>PO #{invoice.po}</span>
                  <Badge className="bg-green-100 text-green-800 border-none font-bold text-[9px] px-1.5 py-0.5 rounded shrink-0 uppercase tracking-wide">
                    Completed
                  </Badge>
                </button>

                {/* Invoice Tab */}
                <button
                  onClick={() => setActiveTab("invoice")}
                  className={`px-4 py-2 transition-all duration-200 rounded-lg flex items-center gap-2 text-xs font-extrabold border cursor-pointer select-none ${
                    activeTab === "invoice" 
                      ? "border-neutral-200 bg-white text-blue-600 shadow-md scale-[1.02]" 
                      : "border-transparent text-neutral-500 hover:text-neutral-800 hover:bg-white/40"
                  }`}
                >
                  <FileText className={`h-4 w-4 shrink-0 transition-colors ${activeTab === "invoice" ? "text-blue-600" : "text-neutral-400"}`} />
                  <span>INV #{invoice.id}</span>
                  <Badge className="bg-blue-100 text-blue-800 border-none font-bold text-[9px] px-1.5 py-0.5 rounded shrink-0 uppercase tracking-wide">
                    Viewing
                  </Badge>
                </button>

                {/* POD Tab */}
                <button
                  onClick={() => setActiveTab("pod")}
                  className={`px-4 py-2 transition-all duration-200 rounded-lg flex items-center gap-2 text-xs font-extrabold border cursor-pointer select-none ${
                    activeTab === "pod" 
                      ? "border-neutral-200 bg-white text-blue-600 shadow-md scale-[1.02]" 
                      : "border-transparent text-neutral-500 hover:text-neutral-800 hover:bg-white/40"
                  }`}
                >
                  <Truck className={`h-4 w-4 shrink-0 transition-colors ${activeTab === "pod" ? "text-blue-600" : "text-neutral-400"}`} />
                  <span>{invoice.podId}</span>
                  <Badge className="bg-green-100 text-green-800 border-none font-bold text-[9px] px-1.5 py-0.5 rounded shrink-0 uppercase tracking-wide">
                    Verified
                  </Badge>
                </button>
              </div>

              <span className="text-muted-foreground text-sm font-medium border-l border-sidebar-border pl-3 hidden sm:inline">
                ID: #VRF-{invoice.id.replace("INV-2024-", "")}
              </span>
            </div>
            
            <button 
              onClick={() => toast.success(`Initiated batch download for ${invoice.id}...`)}
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="h-4 w-4" />
              Download All PDF
            </button>
          </div>

          {/* Three Column Grid Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN: Store Details & Verification Status Checklist */}
            <div className="lg:col-span-3 space-y-6">
              {/* STORE DETAILS Card */}
              <Card className="p-4 border border-slate-200 rounded-xl shadow-2xs bg-white">
                <h3 className="text-[11px] font-bold uppercase text-muted-foreground tracking-wider mb-3">STORE DETAILS</h3>
                <CardContent className="p-0 space-y-3.5">
                  {/* Hub / Location details */}
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4.5 w-4.5 text-neutral-400 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-neutral-800">{invoice.storeHub}</h4>
                      <p className="text-[10px] text-neutral-500 leading-normal mt-0.5">{invoice.storeAddress}</p>
                    </div>
                  </div>

                  {/* Manager details */}
                  <div className="flex items-start gap-3">
                    <User className="h-4.5 w-4.5 text-neutral-400 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-neutral-800">{invoice.manager}</h4>
                      <p className="text-[10px] text-neutral-500 leading-normal mt-0.5">Site Operations Manager</p>
                    </div>
                  </div>

                  {/* Contact details */}
                  <div className="flex items-start gap-3">
                    <Phone className="h-4.5 w-4.5 text-neutral-400 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-neutral-800">{invoice.managerPhone}</h4>
                      <p className="text-[10px] text-neutral-500 leading-normal mt-0.5">{invoice.managerEmail}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Verification Status list */}
              <div>
                <h3 className="text-[11px] font-bold uppercase text-muted-foreground tracking-wider mb-3">VERIFICATION STATUS</h3>
                <Card className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
                  <CardContent className="p-0 space-y-3.5">
                    <div className="flex items-center gap-3 text-xs font-semibold text-foreground">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-800 shrink-0">
                        <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                      </div>
                      <span>Vendor Match</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-semibold text-foreground">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-800 shrink-0">
                        <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                      </div>
                      <span>SKU Validation</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-semibold text-foreground">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-800 shrink-0 animate-spin">
                        <RefreshCw className="h-3 w-3" />
                      </div>
                      <span className="text-muted-foreground">Price Check (Pending)</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* MIDDLE COLUMN: PDF Document Preview Canvas & Bottom Thumbnails */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* PDF Zoom Controls Toolbar */}
              <div className="bg-muted rounded-lg px-4 py-2 flex items-center justify-between border border-sidebar-border shadow-2xs">
                <div className="flex items-center gap-4">
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <Search className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={handleZoomOut} 
                    className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <span className="text-xs font-bold text-muted-foreground select-none w-10 text-center">{zoom}%</span>
                  <button 
                    onClick={handleZoomIn} 
                    className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleResetZoom} 
                    className="p-1 rounded hover:bg-neutral-200/60 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    title="Reset Zoom"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    onClick={() => setZoom(100)} 
                    className="p-1 rounded hover:bg-neutral-200/60 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    title="Toggle Fullscreen Width"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* PDF Sheet Canvas */}
              <div className="bg-neutral-100/80 rounded-2xl border border-neutral-200/80 min-h-[740px] p-6 flex items-start justify-center overflow-auto relative shadow-inner">
                
                {/* PDF Document Render block */}
                <div 
                  className="w-full max-w-lg bg-white rounded-xl shadow-lg border border-neutral-200/50 p-8 transition-transform origin-top duration-200 font-sans"
                  style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
                >
                  
                  {activeTab === "invoice" && (
                    <div className="space-y-6 text-slate-700 py-2">
                      <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                        <div>
                          <h4 className="text-xl font-extrabold tracking-tight text-slate-900 font-sans">INVOICE</h4>
                          <span className="text-xs font-semibold text-slate-400 mt-1 block">#{invoice.id}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-slate-800 block">DDAPL India Private Limited</span>
                          <p className="text-[11px] text-slate-400 mt-0.5">Corporate Logistics & Distribution</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs mt-4">
                        <div className="space-y-1">
                          <span className="text-slate-400 block font-semibold text-[10px] uppercase">BILL TO:</span>
                          <span className="font-bold text-slate-800 block">ProcureVerify Hub-04</span>
                          <p className="text-slate-500 leading-relaxed text-[11px]">{invoice.storeAddress}</p>
                        </div>
                        <div className="space-y-1 text-right">
                          <span className="text-slate-400 block font-semibold text-[10px] uppercase">INVOICE DETAILS:</span>
                          <div className="flex justify-between text-[11px]"><span className="text-slate-400">Date:</span> <span className="font-bold text-slate-700">{invoice.submittedDate}</span></div>
                          <div className="flex justify-between text-[11px]"><span className="text-slate-400">Due Date:</span> <span className="font-bold text-slate-700">{invoice.due}</span></div>
                          <div className="flex justify-between text-[11px]"><span className="text-slate-400">PO Ref:</span> <span className="font-bold text-blue-600">#{invoice.po}</span></div>
                        </div>
                      </div>

                      {/* Items table */}
                      <table className="w-full text-xs mt-6 border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 pb-2 text-[10px] font-bold text-slate-400 uppercase text-left">
                            <th className="py-2 font-bold">Description</th>
                            <th className="py-2 text-center font-bold">Qty</th>
                            <th className="py-2 text-right font-bold">Price</th>
                            <th className="py-2 text-right font-bold">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-100 text-slate-700">
                            <td className="py-3 font-semibold text-[11px] max-w-[150px] truncate">Device Batch Purchase & Comm.</td>
                            <td className="py-3 text-center font-medium">{invoice.quantity}</td>
                            <td className="py-3 text-right font-medium">₹{(250000 / invoice.quantity).toLocaleString("en-IN")}</td>
                            <td className="py-3 text-right font-bold text-slate-900">{invoice.amount}</td>
                          </tr>
                          <tr className="text-slate-700">
                            <td className="py-3 font-semibold text-[11px]">Delivery & Setup Charges</td>
                            <td className="py-3 text-center font-medium">1</td>
                            <td className="py-3 text-right font-medium">₹0</td>
                            <td className="py-3 text-right font-bold text-slate-900">₹0</td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="border-t border-slate-200 pt-4 flex justify-end text-xs">
                        <div className="w-48 space-y-1.5">
                          <div className="flex justify-between text-[11px]"><span className="text-slate-400">Subtotal:</span> <span className="font-bold">{invoice.amount}</span></div>
                          <div className="flex justify-between text-[11px]"><span className="text-slate-400">Tax (IGST 0%):</span> <span className="font-bold">₹0</span></div>
                          <div className="flex justify-between border-t border-slate-200 pt-1.5 text-slate-950 font-extrabold text-sm">
                            <span>Total Due:</span> 
                            <span>{invoice.amount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "po" && (
                    <div className="space-y-6 text-slate-700 py-2">
                      <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                        <div>
                          <h4 className="text-xl font-extrabold tracking-tight text-slate-900 font-sans">PURCHASE ORDER</h4>
                          <span className="text-xs font-semibold text-slate-400 mt-1 block">#{invoice.po}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-slate-800 block">{invoice.customerName} Inc.</span>
                          <p className="text-[11px] text-slate-400 mt-0.5">Corporate Procurement Division</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs mt-4">
                        <div className="space-y-1">
                          <span className="text-slate-400 block font-semibold text-[10px] uppercase">DELIVERY DESTINATION:</span>
                          <span className="font-bold text-slate-800 block">{invoice.store}</span>
                          <p className="text-slate-500 leading-relaxed text-[11px]">{invoice.storeAddress}</p>
                        </div>
                        <div className="space-y-1 text-right">
                          <span className="text-slate-400 block font-semibold text-[10px] uppercase">ORDER METADATA:</span>
                          <div className="flex justify-between text-[11px]"><span className="text-slate-400">PO Date:</span> <span className="font-bold text-slate-700">{invoice.poDate}</span></div>
                          <div className="flex justify-between text-[11px]"><span className="text-slate-400">PO Type:</span> <span className="font-bold text-slate-700">{invoice.poType}</span></div>
                          <div className="flex justify-between text-[11px]"><span className="text-slate-400">Status:</span> <span className="font-bold text-emerald-600">Authorized</span></div>
                        </div>
                      </div>

                      {/* Items table */}
                      <table className="w-full text-xs mt-6 border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 pb-2 text-[10px] font-bold text-slate-400 uppercase text-left">
                            <th className="py-2 font-bold">Authorized Item</th>
                            <th className="py-2 text-center font-bold">Qty</th>
                            <th className="py-2 text-right font-bold">Budget Limit</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-100 text-slate-700">
                            <td className="py-3 font-semibold text-[11px]">Batch Electronics & Devices Supply</td>
                            <td className="py-3 text-center font-medium">{invoice.quantity} units</td>
                            <td className="py-3 text-right font-bold text-slate-900">{invoice.amount}</td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="border-t border-slate-200 pt-4 flex justify-end text-xs">
                        <div className="w-48 space-y-1.5">
                          <div className="flex justify-between border-t border-slate-200 pt-1.5 text-slate-955 font-extrabold text-sm">
                            <span>Approved Budget:</span> 
                            <span>{invoice.amount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "pod" && (
                    <div className="space-y-6 text-slate-700 py-2">
                      <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                        <div>
                          <h4 className="text-xl font-extrabold tracking-tight text-slate-900 font-sans">PROOF OF DELIVERY</h4>
                          <span className="text-xs font-semibold text-slate-400 mt-1 block">Ref: {invoice.podId}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded uppercase">
                            Delivered & Signed
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs mt-4">
                        <div className="space-y-1">
                          <span className="text-slate-400 block font-semibold text-[10px] uppercase">CARRIER DETAILS:</span>
                          <span className="font-bold text-slate-800 block">{invoice.carrier}</span>
                          <p className="text-slate-500 leading-relaxed text-[11px]">Electronic Manifest Shipment</p>
                        </div>
                        <div className="space-y-1 text-right">
                          <span className="text-slate-400 block font-semibold text-[10px] uppercase">RECEIVING STORE:</span>
                          <span className="font-bold text-slate-800 block">{invoice.store}</span>
                          <p className="text-slate-500 text-[11px]">{invoice.storeHub}</p>
                        </div>
                      </div>

                      <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 text-xs space-y-3 mt-6">
                        <div className="flex justify-between border-b border-slate-200/60 pb-2">
                          <span className="font-semibold text-slate-600">Goods Receipt Check:</span>
                          <span className="font-bold text-emerald-600">100% In Good Condition</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200/60 pb-2">
                          <span className="font-semibold text-slate-600">Delivery Date:</span>
                          <span className="font-bold text-slate-800">{invoice.submittedDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold text-slate-600">Signed Electronically By:</span>
                          <span className="font-bold text-blue-600">{invoice.manager} (Store Manager)</span>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-400 italic text-center mt-8">
                        This digital document constitutes proof that the invoice goods were received in full at the store.
                      </div>
                    </div>
                  )}

                </div>
              </div>



            </div>

            {/* RIGHT COLUMN: Review Action Panel */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* REVIEW ACTIONS Card */}
              <Card className="p-5 border border-slate-200 rounded-xl shadow-2xs bg-white">
                <h3 className="text-[11px] font-bold uppercase text-muted-foreground tracking-wider mb-4">REVIEW ACTIONS</h3>
                <CardContent className="p-0 space-y-4">
                  
                  {/* Notes Textarea */}
                  <div className="space-y-1.5">
                    <Label htmlFor="review-notes" className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider">
                      REVIEWER NOTES
                    </Label>
                    <Textarea 
                      id="review-notes"
                      placeholder="Add internal note..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[90px] text-xs border-slate-200 outline-none focus:border-blue-500 rounded-lg placeholder:text-slate-400 bg-slate-50/30 transition-colors focus:bg-white"
                    />
                  </div>

                  {/* Confirm checkbox check */}
                  <div className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                    confirmMatch 
                      ? "border-blue-200 bg-blue-50/30 text-blue-900" 
                      : "border-slate-100 bg-neutral-50/50 text-slate-600 hover:border-slate-200"
                  }`}>
                    <Checkbox 
                      id="confirm-match" 
                      checked={confirmMatch} 
                      onCheckedChange={(checked) => setConfirmMatch(!!checked)}
                      className="mt-0.5 cursor-pointer border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label 
                      htmlFor="confirm-match" 
                      className="text-xs font-semibold leading-relaxed cursor-pointer select-none"
                    >
                      I confirm all 3 documents match
                    </Label>
                  </div>

                  {/* Buttons block */}
                  <div className="space-y-3 pt-1">
                    
                    <Button 
                      disabled={!confirmMatch}
                      onClick={() => setShowApproveDialog(true)}
                      className={`w-full h-11 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all transform active:scale-[0.99] cursor-pointer ${
                        confirmMatch 
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                          : "bg-neutral-100 text-neutral-400 border border-neutral-200/40 cursor-not-allowed shadow-none"
                      }`}
                    >
                      <Check className="h-4 w-4 stroke-[2.5]" />
                      Accept Invoice
                    </Button>

                    <Button 
                      onClick={() => setShowRejectDialog(true)}
                      className="w-full h-11 rounded-xl font-bold text-xs bg-rose-50 hover:bg-rose-100/70 text-rose-700 border border-rose-200/50 flex items-center justify-center gap-2 shadow-2xs transition-all transform active:scale-[0.99] cursor-pointer"
                    >
                      <X className="h-4 w-4 stroke-[2.5]" />
                      Reject Invoice
                    </Button>

                    <div className="text-center pt-1">
                      <button 
                        onClick={() => toast.warning(`Flagged Invoice ${invoice.id} for further investigation.`)}
                        className="text-xs font-bold text-neutral-500 hover:text-neutral-900 hover:underline transition-all cursor-pointer"
                      >
                        Flag for Investigation
                      </button>
                    </div>

                  </div>

                </CardContent>
              </Card>

              {/* Blue Alert System match percentage tip */}
              <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 flex gap-3 text-xs text-blue-800 shadow-2xs">
                <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-bold block text-blue-900">System Tip</span>
                  Auto-matching engine detected a <span className="font-bold text-blue-900">98.4% confidence score</span> for this vendor pair.
                </div>
              </div>

            </div>

        </div>

      </div>

      {/* Approve Confirmation Modal Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent className="bg-white rounded-2xl shadow-xl sm:max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              Approve Invoice
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 mt-2">
              Are you sure you want to approve this invoice? The vendor will be notified and payment processing will initiate.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-xs space-y-2 text-emerald-800">
              <div className="flex justify-between"><span className="font-semibold">Invoice:</span> <span className="font-bold">{invoice.id}</span></div>
              <div className="flex justify-between"><span className="font-semibold">Store:</span> <span className="font-bold">{invoice.store}</span></div>
              <div className="flex justify-between"><span className="font-semibold">Amount:</span> <span className="font-bold text-sm">{invoice.amount}</span></div>
            </div>
          </div>

          <DialogFooter className="flex gap-3 justify-end mt-4">
            <Button variant="outline" onClick={() => setShowApproveDialog(false)} className="rounded-lg font-semibold text-xs py-4 px-5 border-slate-200 text-slate-700 hover:bg-slate-100">
              Cancel
            </Button>
            <Button onClick={handleApprove} className="rounded-lg font-semibold text-xs py-4 px-5 bg-emerald-600 hover:bg-emerald-700 text-white">
              Confirm Approval
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Reason Selection Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="bg-white rounded-2xl shadow-xl sm:max-w-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-rose-600" />
              Reject Invoice
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 mt-2">
              Provide a rejection reason. The vendor will be notified immediately to correct and resubmit the files.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4 max-h-[350px] overflow-y-auto">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-600">Select Rejection Template</Label>
              <div className="space-y-2">
                {rejectionTemplates.map((template, idx) => (
                  <button
                    key={idx}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-all cursor-pointer ${
                      selectedTemplate === template 
                        ? "border-blue-500 bg-blue-50/80 text-blue-900 font-semibold" 
                        : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                    onClick={() => {
                      setSelectedTemplate(template);
                      setRejectionReason(template);
                    }}
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-reject-reason" className="text-xs font-bold text-slate-600">Custom Reason (Required)</Label>
              <Textarea
                id="custom-reject-reason"
                placeholder="Provide detailed feedback on what needs to be fixed..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="min-h-[80px] text-xs border-slate-200 outline-none focus:border-blue-500 rounded-lg placeholder:text-slate-400 bg-slate-50/50"
              />
            </div>
          </div>

          <DialogFooter className="flex gap-3 justify-end mt-4">
            <Button variant="outline" onClick={() => setShowRejectDialog(false)} className="rounded-lg font-semibold text-xs py-4 px-5 border-slate-200 text-slate-700 hover:bg-slate-100">
              Cancel
            </Button>
            <Button onClick={handleReject} className="rounded-lg font-semibold text-xs py-4 px-5 bg-rose-600 hover:bg-rose-700 text-white">
              Reject & Notify Vendor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delivery & Product Photo zoom lightbox */}
      <Dialog open={!!imagePreview} onOpenChange={(open) => !open && setImagePreview(null)}>
        <DialogContent className="bg-slate-900 text-white rounded-2xl shadow-2xl sm:max-w-2xl p-6 border-none">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold tracking-wider text-slate-300 uppercase">
              Attachment Preview: {imagePreview === "delivery" ? "Delivery Confirmation Photo" : "Product SKU Image"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex items-center justify-center p-6 bg-slate-950 rounded-xl mt-4 border border-slate-800">
            {imagePreview === "delivery" ? (
              <div className="w-full flex flex-col items-center gap-4">
                {/* Stylized delivery box graphics inside big SVG */}
                <svg className="w-64 h-64 text-amber-600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 15L85 30L50 45L15 30L50 15Z" fill="#b45309" stroke="#d97706" strokeWidth="2" />
                  <path d="M15 30V70L50 85V45L15 30Z" fill="#78350f" stroke="#b45309" strokeWidth="2" />
                  <path d="M85 30V70L50 85V45L85 30Z" fill="#92400e" stroke="#b45309" strokeWidth="2" />
                  <path d="M50 45V85" stroke="#78350f" strokeWidth="2" />
                  <path d="M35 22.5L70 37.5" stroke="#f59e0b" strokeWidth="2" />
                </svg>
                <div className="text-center text-xs text-slate-400 space-y-1">
                  <p className="font-bold text-slate-200">Delivery Photo Uploaded by Carrier</p>
                  <p>Timestamp: {invoice.submittedDate} • Lat/Long Verified</p>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center gap-4">
                {/* Stylized product device graphics inside big SVG */}
                <svg className="w-64 h-64 text-blue-600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="25" y="10" width="50" height="80" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="3" />
                  <rect x="30" y="15" width="40" height="60" rx="4" fill="#1e293b" />
                  <circle cx="50" cy="80" r="4" fill="#334155" />
                  <circle cx="50" cy="45" r="12" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
                  <circle cx="50" cy="45" r="4" fill="#60a5fa" />
                </svg>
                <div className="text-center text-xs text-slate-400 space-y-1">
                  <p className="font-bold text-slate-200">Product Device Batch Reference Image</p>
                  <p>Model SKU Matching: OK ({invoice.quantity} Devices)</p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex justify-end mt-4">
            <Button onClick={() => setImagePreview(null)} className="rounded-lg font-semibold text-xs py-4 px-5 bg-slate-800 text-white hover:bg-slate-700">
              Close Preview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
