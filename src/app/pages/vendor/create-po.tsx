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
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Create Purchase Order</h1>
        <p className="mt-1 text-neutral-500">Enter PO details and submit for processing</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>PO Information</CardTitle>
                <CardDescription>Fill in the purchase order details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="poNumber">PO Number *</Label>
                    <Input id="poNumber" placeholder="PO-2024-XXX" required />
                  </div>

                  <div className="space-y-2">
                    <Label>PO Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {poDate ? format(poDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={poDate} onSelect={setPoDate} />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="deviceType">Device Type *</Label>
                    <Select required>
                      <SelectTrigger id="deviceType">
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

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input id="quantity" type="number" placeholder="0" min="1" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Expected Dispatch Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dispatchDate ? format(dispatchDate, "PPP") : "Select dispatch date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dispatchDate} onSelect={setDispatchDate} />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="store">Store Name *</Label>
                  <Select required>
                    <SelectTrigger id="store">
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

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <textarea
                    id="notes"
                    className="min-h-[100px] w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
                    placeholder="Additional notes or comments..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Upload PO</Label>
                  {!poFile ? (
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
                        id="po-file-upload"
                        className="sr-only"
                        accept=".pdf,image/*"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="po-file-upload" className="cursor-pointer block">
                        <Upload className="mx-auto h-8 w-8 text-neutral-400" />
                        <p className="mt-2 text-sm font-medium text-neutral-700">
                          Drag & drop PO document, or <span className="text-blue-600 hover:underline">browse</span>
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
                            {poFile.name}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-neutral-500">{poFile.size}</span>
                            {poFile.status === "uploading" && (
                              <span className="text-xs text-blue-600 animate-pulse">Uploading...</span>
                            )}
                            {poFile.status === "complete" && (
                              <span className="flex items-center text-xs text-green-600">
                                <CheckCircle className="mr-1 h-3.5 w-3.5" /> Uploaded
                              </span>
                            )}
                          </div>
                          {poFile.status === "uploading" && (
                            <div className="mt-2 w-full bg-neutral-100 rounded-full h-1.5">
                              <div
                                className="bg-blue-600 h-1.5 rounded-full transition-all duration-150"
                                style={{ width: `${poFile.progress}%` }}
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

                <div className="flex justify-between gap-4 border-t pt-6 mt-8">
                  <Button type="button" variant="outline" onClick={() => navigate("/vendor/dashboard")}>
                    Cancel
                  </Button>
                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={handleSaveDraft}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Draft
                    </Button>
                    <Button type="submit">
                      <Send className="mr-2 h-4 w-4" />
                      Submit PO
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
                <CardDescription>Review before submission</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Status:</span>
                    <span className="font-medium">Draft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Created:</span>
                    <span className="font-medium">Today</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Auto-save:</span>
                    <span className="font-medium text-green-600">Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="space-y-2 text-sm">
                  <p className="font-medium">Quick Tips</p>
                  <ul className="list-disc space-y-1 pl-4 text-neutral-600">
                    <li>All fields marked with * are required</li>
                    <li>Your draft is auto-saved every 30 seconds</li>
                    <li>You can upload supporting documents after creation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Actions are placed inside the PO Information Card */}
      </form>
    </div>
  );
}
