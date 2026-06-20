import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Calendar } from "../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { CalendarIcon, Save, Send } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export function CreatePO() {
  const navigate = useNavigate();
  const [poDate, setPoDate] = useState<Date>();
  const [dispatchDate, setDispatchDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

        <div className="sticky bottom-0 mt-6 flex justify-between gap-4 border-t bg-white p-6">
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
      </form>
    </div>
  );
}
