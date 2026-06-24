import { useNavigate, useParams } from "react-router";
import { AlertCircle, Upload, Clock, CheckCircle, ChevronLeft, HelpCircle, FileText } from "lucide-react";
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
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
            <span className="cursor-pointer hover:text-neutral-600 transition-colors" onClick={() => navigate("/vendor/invoices")}>Invoices</span>
            <span>/</span>
            <span className="text-neutral-600">Rejection Resolution</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 mt-1">Rejection Resolution</h1>
          <p className="text-sm text-neutral-500">Resolve issues and resubmit invoice</p>
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 self-start sm:self-auto border-neutral-200"
          onClick={() => navigate("/vendor/invoices")}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Invoices
        </Button>
      </div>

      {/* Horizontal Metadata Summary Bar */}
      <Card className="bg-neutral-50/20 border-neutral-200/80">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:divide-x divide-neutral-200/80">
            <div className="lg:px-4 first:pl-0">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Invoice Number</span>
              <p className="mt-1 font-semibold text-neutral-900 text-sm">{rejection.invoice}</p>
            </div>
            <div className="lg:px-4">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">PO Number</span>
              <p className="mt-1 font-semibold text-neutral-900 text-sm">{rejection.po}</p>
            </div>
            <div className="lg:px-4">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Store Name</span>
              <p className="mt-1 font-semibold text-neutral-900 text-sm">{rejection.store}</p>
            </div>
            <div className="lg:px-4">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Rejected Date</span>
              <p className="mt-1 font-semibold text-neutral-900 text-sm">{rejection.rejectedDate}</p>
            </div>
            <div className="lg:px-4">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Rejected By</span>
              <p className="mt-1 font-semibold text-neutral-900 text-sm">{rejection.rejectedBy}</p>
            </div>
            <div className="lg:px-4">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Previous Status</span>
              <p className="mt-1 font-semibold text-neutral-900 text-sm">{rejection.previousStatus}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Resolution Center Grid */}
      <Card className="border-neutral-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-neutral-50/40 border-b border-neutral-200/60 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <CardTitle className="text-lg font-bold text-neutral-900">Rejection Resolution Center</CardTitle>
              <CardDescription className="text-xs">Review reviewer comments and correct invoice issues</CardDescription>
            </div>
            <Badge variant="destructive" className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-800 border-red-200 hover:bg-red-100">
              {rejection.priority} Priority
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left Column: Rejection Details */}
            <div className="rounded-xl border border-red-100 bg-red-50/20 p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 animate-pulse shrink-0" />
                  <h4 className="font-bold text-red-950 text-sm">Reviewer Feedback</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-red-800 uppercase tracking-wider">Reason for Rejection</span>
                    <p className="mt-0.5 text-base font-extrabold text-red-955">{rejection.reason}</p>
                  </div>
                  <Separator className="bg-red-200/30" />
                  <div>
                    <span className="text-[10px] font-bold text-red-800 uppercase tracking-wider">Comments</span>
                    <p className="mt-1 text-sm text-red-900 leading-relaxed font-medium">{rejection.comments}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Required Action */}
            <div className="rounded-xl border border-blue-100 bg-blue-50/5 p-5 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-blue-600 shrink-0" />
                  <h4 className="font-bold text-neutral-900 text-sm">Required Action</h4>
                </div>
                <div className="rounded-lg border border-dashed border-blue-200 bg-blue-50/40 p-4">
                  <p className="font-bold text-blue-900 text-sm">Upload POD Document</p>
                  <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                    Upload a clear proof of delivery document (PDF, JPG, or PNG) to resolve this rejection and resubmit the invoice.
                  </p>
                  <Button
                    className="mt-3.5 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                    onClick={handleUploadPOD}
                  >
                    Upload POD Now
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  variant="outline"
                  className="w-full text-xs font-semibold text-neutral-700 border-neutral-200 hover:bg-neutral-50"
                  onClick={() => toast.info("Viewing invoice details...")}
                >
                  View Invoice PDF
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-xs font-semibold text-neutral-700 border-neutral-200 hover:bg-neutral-50"
                  onClick={() => toast.info("Viewing PO details...")}
                >
                  View PO Details
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline & Tips */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Timeline - 2/3 width */}
        <div className="md:col-span-2">
          <Card className="h-full border-neutral-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-bold text-neutral-900">Activity Timeline</CardTitle>
              <CardDescription className="text-xs">History of actions and invoice updates</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="relative border-l-2 border-neutral-100 pl-6 ml-4 space-y-6">
                {timeline.map((event, index) => (
                  <div key={index} className="relative">
                    {/* Timeline Bullet */}
                    <div
                      className={`absolute -left-[37px] top-0.5 flex h-6 w-6 items-center justify-center rounded-full border bg-white ${
                        event.status === "complete"
                          ? "border-green-200 text-green-600"
                          : event.status === "error"
                          ? "border-red-200 text-red-600"
                          : "border-amber-200 text-amber-600"
                      }`}
                    >
                      {event.status === "complete" && <CheckCircle className="h-3.5 w-3.5" />}
                      {event.status === "error" && <AlertCircle className="h-3.5 w-3.5" />}
                      {event.status === "pending" && <Clock className="h-3.5 w-3.5" />}
                    </div>
                    {/* Timeline details */}
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span className="font-semibold text-sm text-neutral-900">{event.action}</span>
                        <span className="text-neutral-300 hidden sm:inline">•</span>
                        <span className="text-xs text-neutral-500">{event.user}</span>
                      </div>
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

        {/* Resolution Tips - 1/3 width */}
        <div className="md:col-span-1">
          <Card className="bg-blue-50/20 border-blue-100/80 h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-blue-700" />
                <CardTitle className="text-sm font-bold text-blue-900">Resolution Tips</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-xs text-blue-955">
              <div className="space-y-1.5">
                <p className="font-bold text-blue-900">For Missing POD:</p>
                <ul className="list-disc pl-4 space-y-1 text-blue-800 font-medium">
                  <li>Upload clear delivery receipt</li>
                  <li>Ensure all details are visible</li>
                  <li>Include signature and timestamp</li>
                </ul>
              </div>
              <div className="space-y-1.5">
                <p className="font-bold text-blue-900">For Incorrect Details:</p>
                <ul className="list-disc pl-4 space-y-1 text-blue-800 font-medium">
                  <li>Verify store name matches PO</li>
                  <li>Check quantity is accurate</li>
                  <li>Confirm device type is correct</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
