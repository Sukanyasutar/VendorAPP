import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Calendar } from "../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { CalendarIcon, Save, Send, Upload, X, CheckCircle, FileText } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Separator } from "../../components/ui/separator";

export function CreatePO() {
  const navigate = useNavigate();
  const [poDate, setPoDate] = useState<Date>();
  const [dispatchDate, setDispatchDate] = useState<Date>();
  const [poFile, setPoFile] = useState<{
    name: string;
    size: string;
    progress: number;
    status: "uploading" | "complete" | "error";
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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

    setPoFile({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      progress: 0,
      status: "uploading",
    });

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setPoFile((prev) =>
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
    setPoFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (poFile && poFile.status === "uploading") {
      toast.error("Please wait for the PO upload to complete");
      return;
    }
    toast.success("PO created successfully!");
    navigate("/vendor/dashboard");
  };

  const handleSaveDraft = () => {
    toast.success("Draft saved!");
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
            <span className="cursor-pointer hover:text-neutral-600 transition-colors" onClick={() => navigate("/vendor/dashboard")}>Dashboard</span>
            <span>/</span>
            <span className="text-neutral-600">Create PO</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 mt-1">Create Purchase Order</h1>
          <p className="text-sm text-neutral-500">Enter PO details and submit for processing</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-2">
            <Card className="border-neutral-200 shadow-sm h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold">PO Details</CardTitle>
                <CardDescription className="text-xs">Provide the necessary purchase order data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="poNumber" className="text-xs font-semibold text-neutral-700">PO Number *</Label>
                    <Input id="poNumber" placeholder="PO-2024-XXX" required className="h-9 text-sm" />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-neutral-700">PO Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left h-9 text-sm border-neutral-200 text-neutral-600">
                          <CalendarIcon className="mr-2 h-4 w-4 text-neutral-400" />
                          {poDate ? format(poDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={poDate} onSelect={setPoDate} />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="deviceType" className="text-xs font-semibold text-neutral-700">Device Type *</Label>
                    <Select required>
                      <SelectTrigger id="deviceType" className="h-9 text-sm border-neutral-200">
                        <SelectValue placeholder="Select device type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="smartphone">Smartphone</SelectItem>
                        <SelectItem value="tablet">Tablet</SelectItem>
                        <SelectItem value="laptop">Laptop</SelectItem>
                        <SelectItem value="desktop">Desktop</SelectItem>
                        <SelectItem value="accessory">Accessory</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="quantity" className="text-xs font-semibold text-neutral-700">Quantity *</Label>
                    <Input id="quantity" type="number" placeholder="0" min="1" required className="h-9 text-sm" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="store" className="text-xs font-semibold text-neutral-700">Store Name *</Label>
                    <Select required>
                      <SelectTrigger id="store" className="h-9 text-sm border-neutral-200">
                        <SelectValue placeholder="Select store" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mumbai-bandra">Mumbai - Bandra</SelectItem>
                        <SelectItem value="mumbai-andheri">Mumbai - Andheri</SelectItem>
                        <SelectItem value="delhi-south">Delhi - South Campus</SelectItem>
                        <SelectItem value="bangalore-koramangala">Bangalore - Koramangala</SelectItem>
                        <SelectItem value="bangalore-indiranagar">Bangalore - Indiranagar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-neutral-700">Expected Dispatch Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left h-9 text-sm border-neutral-200 text-neutral-600">
                          <CalendarIcon className="mr-2 h-4 w-4 text-neutral-400" />
                          {dispatchDate ? format(dispatchDate, "PPP") : "Select dispatch date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={dispatchDate} onSelect={setDispatchDate} />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="notes" className="text-xs font-semibold text-neutral-700">Notes (Optional)</Label>
                  <textarea
                    id="notes"
                    rows={2}
                    className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Additional notes or comments..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Actions and Upload */}
          <div className="space-y-4">
            {/* Summary & Submit Action Card */}
            <Card className="border-neutral-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold text-neutral-900">Summary & Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Status:</span>
                    <span className="font-semibold text-neutral-800">Draft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Created:</span>
                    <span className="font-semibold text-neutral-800">Today</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Auto-save:</span>
                    <span className="font-semibold text-green-600">Active</span>
                  </div>
                </div>

                <Separator className="bg-neutral-200/60" />

                <div className="space-y-2">
                  <Button type="submit" className="w-full h-9 text-xs font-semibold">
                    <Send className="mr-2 h-4 w-4" />
                    Submit PO
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button type="button" variant="outline" onClick={handleSaveDraft} className="h-9 text-xs font-semibold border-neutral-200">
                      <Save className="mr-1.5 h-3.5 w-3.5 text-neutral-500" />
                      Save Draft
                    </Button>
                    <Button type="button" variant="outline" onClick={() => navigate("/vendor/dashboard")} className="h-9 text-xs font-semibold border-neutral-200">
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upload PO Card */}
            <Card className="border-neutral-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold text-neutral-900">Upload PO Document</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {!poFile ? (
                  <div
                    className={`relative rounded-lg border-2 border-dashed p-4 text-center transition-colors ${
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
                      id="po-file-upload"
                      className="sr-only"
                      accept=".pdf,image/*"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="po-file-upload" className="cursor-pointer block">
                      <Upload className="mx-auto h-7 w-7 text-neutral-400" />
                      <p className="mt-1.5 text-xs font-semibold text-neutral-700">
                        Drag & drop PO file, or <span className="text-blue-600 hover:underline">browse</span>
                      </p>
                      <p className="mt-0.5 text-[10px] text-neutral-500">
                        PDF, JPG, PNG up to 10MB
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-3 bg-neutral-50/50">
                    <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                        <FileText className="h-4.5 w-4.5 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-neutral-900 truncate">
                          {poFile.name}
                        </p>
                        <div className="flex items-center space-x-2 mt-0.5">
                          <span className="text-[10px] text-neutral-500">{poFile.size}</span>
                          {poFile.status === "complete" && (
                            <span className="flex items-center text-[10px] text-green-600 font-medium">
                              <CheckCircle className="mr-0.5 h-3 w-3" /> Uploaded
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100/50 h-7 w-7"
                      onClick={removeFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Tips Card */}
            <Card className="bg-blue-50/20 border-blue-100 shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-1.5 text-xs text-blue-950">
                  <p className="font-bold text-blue-900">Quick Tips</p>
                  <ul className="list-disc space-y-1 pl-4 text-blue-800 font-medium">
                    <li>All fields marked with * are required</li>
                    <li>Drafts are autosaved automatically</li>
                    <li>You can upload documents at any time</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
