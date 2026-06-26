import { useState } from "react";
import { User, Bell, Shield, Palette, Building2, Key, Mail, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";

export function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "security", name: "Security", icon: Shield },
    { id: "preferences", name: "Preferences", icon: Palette },
    { id: "organization", name: "Organization", icon: Building2 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-neutral-900">Settings</h1>
        <p className="mt-1 text-sm text-neutral-500">Manage your account settings and preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 md:w-60 shrink-0 md:border-r border-neutral-200/60 pr-0 md:pr-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 w-full px-3 py-2 text-sm font-medium rounded-lg transition-all text-left ${
                  isActive
                    ? "bg-neutral-100 text-neutral-900 font-semibold"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50/50"
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-neutral-900" : "text-neutral-400"}`} />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <Card className="border-neutral-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Profile Information</CardTitle>
                <CardDescription>Update your personal information and contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100/80">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="space-y-1">
                    <Button variant="outline" size="sm" className="h-8 text-xs font-semibold border-neutral-200" onClick={() => toast.info("Photo upload is not supported in prototype mode.")}>
                      Upload Photo
                    </Button>
                    <p className="text-[10px] text-neutral-500">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                <Separator className="bg-neutral-200/60" />

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="firstName" className="text-xs font-semibold text-neutral-700">First Name</Label>
                    <Input id="firstName" defaultValue="John" className="h-9 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lastName" className="text-xs font-semibold text-neutral-700">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" className="h-9 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-semibold text-neutral-700">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@ddapl.com" className="h-9 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs font-semibold text-neutral-700">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+91 98765 43210" className="h-9 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="role" className="text-xs font-semibold text-neutral-700">Role</Label>
                    <div className="flex items-center gap-2">
                      <Input id="role" defaultValue="Vendor" disabled className="h-9 text-sm flex-1 bg-neutral-50" />
                      <Badge variant="secondary" className="h-6 text-[10px] font-semibold bg-neutral-100 text-neutral-800">Current</Badge>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="department" className="text-xs font-semibold text-neutral-700">Department</Label>
                    <Input id="department" defaultValue="Supply Chain" className="h-9 text-sm" />
                  </div>
                </div>

                <Separator className="bg-neutral-200/60" />

                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="outline" className="h-9 text-xs font-semibold border-neutral-200" onClick={() => toast.info("Changes discarded.")}>Cancel</Button>
                  <Button className="h-9 text-xs font-semibold" onClick={() => toast.success("Profile saved successfully!")}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <Card className="border-neutral-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Email Notifications</CardTitle>
                  <CardDescription>Choose what updates you want to receive via email</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-neutral-500" />
                        <Label className="font-semibold text-sm">Invoice Updates</Label>
                      </div>
                      <p className="text-xs text-neutral-500 leading-normal">Get notified when invoices are approved or rejected</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator className="bg-neutral-200/60" />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-neutral-500" />
                        <Label className="font-semibold text-sm">PO Notifications</Label>
                      </div>
                      <p className="text-xs text-neutral-500 leading-normal">Receive updates on purchase order status changes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator className="bg-neutral-200/60" />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-neutral-500" />
                        <Label className="font-semibold text-sm">Rejection Alerts</Label>
                      </div>
                      <p className="text-xs text-neutral-500 leading-normal">Immediate notification when an invoice is rejected</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator className="bg-neutral-200/60" />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-neutral-500" />
                        <Label className="font-semibold text-sm">Weekly Summary</Label>
                      </div>
                      <p className="text-xs text-neutral-500 leading-normal">Get a weekly summary of your activity</p>
                    </div>
                    <Switch />
                  </div>

                  <Separator className="bg-neutral-200/60" />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-neutral-500" />
                        <Label className="font-semibold text-sm">System Updates</Label>
                      </div>
                      <p className="text-xs text-neutral-500 leading-normal">Notifications about system maintenance and updates</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-neutral-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Push Notifications</CardTitle>
                  <CardDescription>Manage your in-app notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 pr-4">
                      <Label className="font-semibold text-sm">Desktop Notifications</Label>
                      <p className="text-xs text-neutral-500 leading-normal">Show desktop notifications for important updates</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator className="bg-neutral-200/60" />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1 pr-4">
                      <Label className="font-semibold text-sm">Sound Alerts</Label>
                      <p className="text-xs text-neutral-500 leading-normal">Play sound for urgent notifications</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <Card className="border-neutral-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Password & Authentication</CardTitle>
                  <CardDescription>Manage your password and security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="currentPassword" className="text-xs font-semibold text-neutral-700">Current Password</Label>
                      <Input id="currentPassword" type="password" className="h-9 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="newPassword" className="text-xs font-semibold text-neutral-700">New Password</Label>
                      <Input id="newPassword" type="password" className="h-9 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="confirmPassword" className="text-xs font-semibold text-neutral-700">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" className="h-9 text-sm" />
                    </div>
                  </div>

                  <div className="rounded-lg border border-amber-200 bg-amber-50/40 p-4">
                    <div className="flex gap-3">
                      <Shield className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-amber-900">Password Requirements</p>
                        <ul className="text-[10px] text-amber-800 space-y-0.5 font-medium">
                          <li>• At least 8 characters long</li>
                          <li>• Include uppercase and lowercase letters</li>
                          <li>• Include at least one number</li>
                          <li>• Include at least one special character</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button className="h-9 text-xs font-semibold" onClick={() => toast.success("Password updated successfully!")}>Update Password</Button>
                </CardContent>
              </Card>

              <Card className="border-neutral-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4 text-neutral-500" />
                        <Label className="font-semibold text-sm">Enable 2FA</Label>
                      </div>
                      <p className="text-xs text-neutral-500 leading-normal">Require authentication code in addition to password</p>
                    </div>
                    <Switch />
                  </div>

                  <Separator className="bg-neutral-200/60" />

                  <div className="rounded-lg border border-neutral-200 bg-neutral-50/30 p-4">
                    <h4 className="font-bold text-xs text-neutral-800 mb-3">Active Sessions</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-neutral-850">Chrome on Windows</p>
                          <p className="text-[10px] text-neutral-500">192.168.1.1 • Active now</p>
                        </div>
                        <Badge variant="outline" className="text-[10px] font-semibold text-green-600 border-green-600 bg-green-50/20">Current</Badge>
                      </div>
                      <Separator className="bg-neutral-200/60" />
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-neutral-850">Safari on iPhone</p>
                          <p className="text-[10px] text-neutral-500">192.168.1.5 • 2 hours ago</p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50/50" onClick={() => toast.success("Session revoked!")}>
                          Revoke
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Preferences */}
          {activeTab === "preferences" && (
            <div className="space-y-6">
              <Card className="border-neutral-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Display Settings</CardTitle>
                  <CardDescription>Customize how the application looks and feels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="theme" className="text-xs font-semibold text-neutral-700">Theme</Label>
                      <Select defaultValue="light">
                        <SelectTrigger id="theme" className="h-9 text-sm border-neutral-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System Default</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="language" className="text-xs font-semibold text-neutral-700">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger id="language" className="h-9 text-sm border-neutral-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                          <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                          <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="timezone" className="text-xs font-semibold text-neutral-700">Timezone</Label>
                      <Select defaultValue="ist">
                        <SelectTrigger id="timezone" className="h-9 text-sm border-neutral-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ist">IST (GMT+5:30)</SelectItem>
                          <SelectItem value="pst">PST (GMT-8)</SelectItem>
                          <SelectItem value="est">EST (GMT-5)</SelectItem>
                          <SelectItem value="gmt">GMT (GMT+0)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="dateFormat" className="text-xs font-semibold text-neutral-700">Date Format</Label>
                      <Select defaultValue="dd-mm-yyyy">
                        <SelectTrigger id="dateFormat" className="h-9 text-sm border-neutral-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                          <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                          <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator className="bg-neutral-200/60" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1 pr-4">
                        <Label className="font-semibold text-sm">Compact Mode</Label>
                        <p className="text-xs text-neutral-500 leading-normal">Display more content in less space</p>
                      </div>
                      <Switch />
                    </div>

                    <Separator className="bg-neutral-200/60" />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1 pr-4">
                        <Label className="font-semibold text-sm">Show Tooltips</Label>
                        <p className="text-xs text-neutral-500 leading-normal">Display helpful tooltips on hover</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <Separator className="bg-neutral-200/60" />

                  <div className="flex justify-end pt-2">
                    <Button className="h-9 text-xs font-semibold" onClick={() => toast.success("Preferences saved successfully!")}>Save Preferences</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-neutral-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Data & Privacy</CardTitle>
                  <CardDescription>Control your data and privacy settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 pr-4">
                      <Label className="font-semibold text-sm">Usage Analytics</Label>
                      <p className="text-xs text-neutral-500 leading-normal">Help us improve by sharing anonymous usage data</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator className="bg-neutral-200/60" />

                  <div className="space-y-3">
                    <Label className="font-semibold text-sm">Export Your Data</Label>
                    <p className="text-xs text-neutral-500 leading-normal">Download a copy of your account data</p>
                    <Button variant="outline" className="h-9 text-xs font-semibold border-neutral-200">
                      Request Data Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Organization Settings */}
          {activeTab === "organization" && (
            <div className="space-y-6">
              <Card className="border-neutral-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Organization Details</CardTitle>
                  <CardDescription>Manage your organization information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="orgName" className="text-xs font-semibold text-neutral-700">Organization Name</Label>
                      <Input id="orgName" defaultValue="DDAPL" className="h-9 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="orgType" className="text-xs font-semibold text-neutral-700">Organization Type</Label>
                      <Select defaultValue="vendor">
                        <SelectTrigger id="orgType" className="h-9 text-sm border-neutral-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vendor">Vendor</SelectItem>
                          <SelectItem value="customer">Customer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="gst" className="text-xs font-semibold text-neutral-700">GST Number</Label>
                      <Input id="gst" defaultValue="29AABCU9603R1ZM" className="h-9 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="pan" className="text-xs font-semibold text-neutral-700">PAN Number</Label>
                      <Input id="pan" defaultValue="AABCU9603R" className="h-9 text-sm" />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <Label htmlFor="address" className="text-xs font-semibold text-neutral-700">Address</Label>
                      <Input id="address" defaultValue="123, Industrial Area, Mumbai, Maharashtra - 400001" className="h-9 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="city" className="text-xs font-semibold text-neutral-700">City</Label>
                      <Input id="city" defaultValue="Mumbai" className="h-9 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="state" className="text-xs font-semibold text-neutral-700">State</Label>
                      <Input id="state" defaultValue="Maharashtra" className="h-9 text-sm" />
                    </div>
                  </div>

                  <Separator className="bg-neutral-200/60" />

                  <div className="flex justify-end gap-3 pt-2">
                    <Button variant="outline" className="h-9 text-xs font-semibold border-neutral-200" onClick={() => toast.info("Changes discarded.")}>Cancel</Button>
                    <Button className="h-9 text-xs font-semibold" onClick={() => toast.success("Organization settings saved successfully!")}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-neutral-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Billing Information</CardTitle>
                  <CardDescription>Manage your billing and payment details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="rounded-lg border border-neutral-200 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs font-bold text-neutral-800">Current Plan</p>
                        <p className="text-sm font-semibold text-neutral-600">Enterprise</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Billing Cycle</span>
                        <span className="font-semibold text-neutral-800">Monthly</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Next Billing Date</span>
                        <span className="font-semibold text-neutral-800">June 1, 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Amount</span>
                        <span className="font-semibold text-neutral-800">₹49,999/month</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-neutral-200/60" />

                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" className="h-9 text-xs font-semibold border-neutral-200">
                      View Invoices
                    </Button>
                    <Button variant="outline" className="h-9 text-xs font-semibold border-neutral-200">
                      Update Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
