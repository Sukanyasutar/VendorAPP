import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CheckCircle, XCircle, Download, MessageSquare, ZoomIn, FileText, Package } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";
import { unsplash_tool } from "../../../tools/unsplash";

export function InvoiceReview() {
  const navigate = useNavigate();
  const { invoiceId } = useParams();
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const invoice = {
    id: invoiceId || "INV-2024-043",
    vendor: "DDAPL",
    store: "Bangalore - Koramangala",
    po: "PO-2024-054",
    deviceType: "Smartphone",
    quantity: 45,
    amount: "₹2,45,000",
    submittedDate: "2024-05-13",
    submittedBy: "vendor@ddapl.com",
    status: "pending",
  };

  const timeline = [
    { date: "2024-05-13", time: "10:30 AM", action: "Invoice Submitted", user: "DDAPL Vendor" },
    { date: "2024-05-13", time: "11:15 AM", action: "POD Uploaded", user: "DDAPL Vendor" },
    { date: "2024-05-18", time: "Current", action: "Pending Review", user: "Zepto Team" },
  ];

  const rejectionTemplates = [
    "Missing POD - Proof of delivery document is not uploaded or incomplete",
    "Incorrect Store Name - Store name does not match the PO details",
    "Blurry Image - POD image is unclear or unreadable",
    "Incorrect Quantity - Quantity mentioned doesn't match PO",
    "Incorrect Device Type - Device type doesn't match PO specifications",
  ];

  const handleApprove = () => {
    setShowApproveDialog(false);
    toast.success("Invoice approved successfully!");
    navigate("/customer/dashboard");
  };

  const handleReject = () => {
    if (!rejectionReason && !selectedTemplate) {
      toast.error("Please provide a rejection reason");
      return;
    }
    setShowRejectDialog(false);
    toast.success("Invoice rejected and vendor has been notified");
    navigate("/customer/dashboard");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invoice Review</h1>
          <p className="mt-1 text-neutral-500">{invoice.id}</p>
        </div>
        <Badge className="bg-amber-100 text-amber-800">Pending Review</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Panel - Invoice Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Information</CardTitle>
              <CardDescription>Details and metadata</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Invoice Number</span>
                  <span className="font-medium">{invoice.id}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-neutral-500">PO Number</span>
                  <span className="font-medium">{invoice.po}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-neutral-500">Vendor</span>
                  <span className="font-medium">{invoice.vendor}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-neutral-500">Store</span>
                  <span className="font-medium">{invoice.store}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-neutral-500">Device Type</span>
                  <span className="font-medium">{invoice.deviceType}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-neutral-500">Quantity</span>
                  <span className="font-medium">{invoice.quantity} units</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-neutral-500">Amount</span>
                  <span className="font-semibold text-lg">{invoice.amount}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-neutral-500">Submitted Date</span>
                  <span className="font-medium">{invoice.submittedDate}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-neutral-500">Submitted By</span>
                  <span className="font-medium">{invoice.submittedBy}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
              <CardDescription>Activity history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((event, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                        <div className="h-2 w-2 rounded-full bg-blue-600" />
                      </div>
                      {index < timeline.length - 1 && (
                        <div className="my-1 h-full w-0.5 bg-neutral-200" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm font-medium">{event.action}</p>
                      <p className="text-xs text-neutral-500">{event.user}</p>
                      <p className="text-xs text-neutral-400">
                        {event.date} • {event.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Document Preview */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Invoice Document</CardTitle>
                  <CardDescription>PDF preview</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <ZoomIn className="mr-2 h-4 w-4" />
                  Fullscreen
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed bg-neutral-50">
                <div className="text-center">
                  <FileText className="mx-auto h-12 w-12 text-neutral-400" />
                  <p className="mt-2 text-sm text-neutral-500">Invoice PDF Preview</p>
                  <p className="text-xs text-neutral-400">{invoice.id}.pdf</p>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Proof of Delivery (POD)</CardTitle>
              <CardDescription>Delivery receipt images</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="group relative aspect-square overflow-hidden rounded-lg border bg-neutral-100">
                  <div className="flex h-full items-center justify-center">
                    <Package className="h-12 w-12 text-neutral-400" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button variant="secondary" size="sm">
                      <ZoomIn className="mr-2 h-4 w-4" />
                      View Full
                    </Button>
                  </div>
                </div>
                <div className="group relative aspect-square overflow-hidden rounded-lg border bg-neutral-100">
                  <div className="flex h-full items-center justify-center">
                    <Package className="h-12 w-12 text-neutral-400" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button variant="secondary" size="sm">
                      <ZoomIn className="mr-2 h-4 w-4" />
                      View Full
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="sticky bottom-0 flex justify-between gap-4 border-t bg-white p-6">
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate("/customer/dashboard")}>
            Back to Dashboard
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download All
          </Button>
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Add Comment
          </Button>
        </div>
        <div className="flex gap-3">
          <Button variant="destructive" onClick={() => setShowRejectDialog(true)}>
            <XCircle className="mr-2 h-4 w-4" />
            Reject Invoice
          </Button>
          <Button onClick={() => setShowApproveDialog(true)}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Approve Invoice
          </Button>
        </div>
      </div>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reject Invoice</DialogTitle>
            <DialogDescription>
              Provide a reason for rejection. The vendor will be notified and can resubmit.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Common Rejection Reasons</Label>
              <div className="space-y-2">
                {rejectionTemplates.map((template, index) => (
                  <button
                    key={index}
                    className={`w-full rounded-lg border p-3 text-left text-sm transition-colors hover:bg-neutral-50 ${
                      selectedTemplate === template ? "border-blue-600 bg-blue-50" : ""
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
              <Label htmlFor="customReason">Custom Reason (Required)</Label>
              <Textarea
                id="customReason"
                placeholder="Provide detailed reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Reject & Notify Vendor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Invoice</DialogTitle>
            <DialogDescription>
              Confirm that you want to approve this invoice. The vendor will be notified.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-lg bg-green-50 p-4">
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Ready to approve</p>
                  <p className="text-sm text-green-700">
                    Invoice {invoice.id} for {invoice.amount} will be approved and processed.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleApprove}>
              Confirm Approval
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
