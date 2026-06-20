import { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { Upload, X, CheckCircle, FileImage } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { toast } from "sonner";

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: "uploading" | "complete" | "error";
}

export function PODUpload() {
  const navigate = useNavigate();
  const { invoiceId } = useParams();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  }, []);

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    
    if (imageFiles.length !== files.length) {
      toast.error("Only image files are allowed");
    }

    const newFiles: UploadedFile[] = imageFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: "uploading",
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((file) => {
      simulateUpload(file.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === fileId
            ? { ...f, progress, status: progress === 100 ? "complete" : "uploading" }
            : f
        )
      );
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => {
      const file = prev.find((f) => f.id === fileId);
      if (file) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== fileId);
    });
  };

  const handleSubmit = () => {
    if (uploadedFiles.length === 0) {
      toast.error("Please upload at least one POD image");
      return;
    }

    const allComplete = uploadedFiles.every((f) => f.status === "complete");
    if (!allComplete) {
      toast.error("Please wait for all uploads to complete");
      return;
    }

    toast.success("POD uploaded successfully!");
    navigate("/vendor/invoices");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Upload Proof of Delivery</h1>
        <p className="mt-1 text-neutral-500">Invoice: {invoiceId}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload POD Images</CardTitle>
              <CardDescription>
                Upload clear images of the delivery receipt or proof of delivery
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Upload Area */}
              <div
                className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors ${
                  isDragging
                    ? "border-blue-600 bg-blue-50"
                    : "border-neutral-300 hover:border-neutral-400"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="sr-only"
                  accept="image/*"
                  multiple
                  onChange={handleFileInput}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <Upload className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="mt-4 font-medium">
                    Drag & drop images here, or click to browse
                  </p>
                  <p className="mt-2 text-sm text-neutral-500">
                    Supports: JPG, PNG, HEIC (Max 10MB per file)
                  </p>
                </label>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6 space-y-4">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center gap-4 rounded-lg border p-4">
                      <img
                        src={file.preview}
                        alt="Preview"
                        className="h-16 w-16 rounded object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{file.file.name}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(file.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-neutral-500">
                          {(file.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        {file.status === "uploading" && (
                          <Progress value={file.progress} className="mt-2" />
                        )}
                        {file.status === "complete" && (
                          <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            Upload complete
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {uploadedFiles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Preview Gallery</CardTitle>
                <CardDescription>Review uploaded images</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="group relative aspect-square">
                      <img
                        src={file.preview}
                        alt="POD preview"
                        className="h-full w-full rounded-lg object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex gap-3">
                <FileImage className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Image Quality</p>
                  <p className="text-neutral-500">Ensure images are clear and readable</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Complete Information</p>
                  <p className="text-neutral-500">All delivery details should be visible</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Upload className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">Multiple Images</p>
                  <p className="text-neutral-500">Upload from different angles if needed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-50">
            <CardContent className="p-4">
              <p className="text-sm font-medium text-amber-900">Important</p>
              <p className="mt-2 text-sm text-amber-800">
                POD is mandatory for invoice approval. Ensure all delivery information is
                clearly visible in the images.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between border-t bg-white p-6">
        <Button variant="outline" onClick={() => navigate("/vendor/invoices")}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={uploadedFiles.length === 0}>
          <Upload className="mr-2 h-4 w-4" />
          Submit POD
        </Button>
      </div>
    </div>
  );
}
