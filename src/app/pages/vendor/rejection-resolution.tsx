import { useNavigate, useParams } from "react-router";
import { AlertCircle, Upload, Clock, CheckCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { toast } from "sonner";

export function RejectionResolution() {
  const navigate = useNavigate();
  const { invoiceId } = useParams();

  const rejection = {
    invoice: invoiceId || "INV-2024-044",
    store: "Delhi - South Campus",
    po: "PO-2024-055",
    rejectedDate: "2024-05-17",
    rejectedBy: "Zepto Review Team",
    reason: "Missing POD",
    comments: "The proof of delivery document is missing. Please upload a clear image of the delivery receipt with all details visible including date, time, recipient name, and signature.",
    previousStatus: "Submitted",
    priority: "High",
  };

  const timeline = [
    { date: "2024-05-14", time: "10:30 AM", action: "Invoice Submitted", user: "DDAPL Team", status: "complete" },
    { date: "2024-05-14", time: "02:15 PM", action: "POD Upload Attempted", user: "DDAPL Team", status: "complete" },
    { date: "2024-05-17", time: "09:45 AM", action: "Invoice Rejected", user: "Zepto Team", status: "error" },
    { date: "2024-05-18", time: "Current", action: "Pending Correction", user: "DDAPL Team", status: "pending" },
  ];

  const handleResubmit = () => {
    navigate(`/vendor/pod-upload/${invoiceId}`);
  };

  const handleUploadPOD = () => {
    navigate(`/vendor/pod-upload/${invoiceId}`);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Rejection Resolution</h1>
        <p className="mt-1 text-neutral-500">Resolve issues and resubmit invoice</p>
      </div>

      {/* Rejection Alert */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-red-900">Invoice Rejected</h3>
                <Badge variant="destructive">{rejection.priority} Priority</Badge>
              </div>
              <p className="mt-1 text-sm text-red-800">
                This invoice requires immediate attention. Please review the rejection reason and
                take necessary action.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice Details */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Information</CardTitle>
              <CardDescription>Details of the rejected invoice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-neutral-500">Invoice Number</span>
                  <p className="mt-1 font-medium">{rejection.invoice}</p>
                </div>
                <div>
                  <span className="text-neutral-500">PO Number</span>
                  <p className="mt-1 font-medium">{rejection.po}</p>
                </div>
                <div>
                  <span className="text-neutral-500">Store Name</span>
                  <p className="mt-1 font-medium">{rejection.store}</p>
                </div>
                <div>
                  <span className="text-neutral-500">Rejected Date</span>
                  <p className="mt-1 font-medium">{rejection.rejectedDate}</p>
                </div>
                <div>
                  <span className="text-neutral-500">Rejected By</span>
                  <p className="mt-1 font-medium">{rejection.rejectedBy}</p>
                </div>
                <div>
                  <span className="text-neutral-500">Previous Status</span>
                  <p className="mt-1 font-medium">{rejection.previousStatus}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rejection Reason */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-900">Rejection Reason</CardTitle>
              <CardDescription>Why this invoice was rejected</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-red-50 p-4">
                <p className="font-semibold text-red-900">{rejection.reason}</p>
                <Separator className="my-3 bg-red-200" />
                <p className="text-sm text-red-800">{rejection.comments}</p>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
              <CardDescription>History of actions and changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          event.status === "complete"
                            ? "bg-green-100"
                            : event.status === "error"
                            ? "bg-red-100"
                            : "bg-amber-100"
                        }`}
                      >
                        {event.status === "complete" && <CheckCircle className="h-5 w-5 text-green-600" />}
                        {event.status === "error" && <AlertCircle className="h-5 w-5 text-red-600" />}
                        {event.status === "pending" && <Clock className="h-5 w-5 text-amber-600" />}
                      </div>
                      {index < timeline.length - 1 && (
                        <div className="my-1 h-full w-0.5 bg-neutral-200" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <p className="font-medium">{event.action}</p>
                      <p className="text-sm text-neutral-500">{event.user}</p>
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

        <div className="space-y-6">
          {/* Action Card */}
          <Card>
            <CardHeader>
              <CardTitle>Required Actions</CardTitle>
              <CardDescription>Steps to resolve this rejection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border-2 border-dashed border-blue-200 bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <Upload className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Upload POD</p>
                    <p className="text-sm text-blue-700">
                      Upload a clear proof of delivery document
                    </p>
                  </div>
                </div>
                <Button
                  className="mt-4 w-full"
                  onClick={handleUploadPOD}
                >
                  Upload POD Now
                </Button>
              </div>

              <Separator />

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => toast.info("Viewing invoice details...")}
                >
                  View Invoice PDF
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => toast.info("Viewing PO details...")}
                >
                  View PO Details
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Resolution Tips */}
          <Card className="bg-blue-50">
            <CardHeader>
              <CardTitle className="text-sm">Resolution Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-blue-900">
              <div>
                <p className="font-medium">For Missing POD:</p>
                <ul className="mt-1 list-disc pl-4 text-blue-800">
                  <li>Upload clear delivery receipt</li>
                  <li>Ensure all details are visible</li>
                  <li>Include signature and timestamp</li>
                </ul>
              </div>
              <div>
                <p className="font-medium">For Incorrect Details:</p>
                <ul className="mt-1 list-disc pl-4 text-blue-800">
                  <li>Verify store name matches PO</li>
                  <li>Check quantity is accurate</li>
                  <li>Confirm device type is correct</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Resubmit Button */}
          <Button
            className="w-full"
            size="lg"
            onClick={handleResubmit}
          >
            Resubmit Invoice
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/vendor/invoices")}
          >
            Back to Invoices
          </Button>
        </div>
      </div>
    </div>
  );
}
