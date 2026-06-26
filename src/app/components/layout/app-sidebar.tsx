import { useLocation, useNavigate } from "react-router";
import {
  Home,
  FileText,
  Upload,
  XCircle,
  BarChart3,
  FolderOpen,
  ShoppingCart,
  CheckCircle,
  Users,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "../ui/sidebar";

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentRole = location.pathname.split("/")[1];

  const vendorNavigation = [
    { name: "Dashboard", href: "/vendor/dashboard", icon: Home },
    { name: "Create PO", href: "/vendor/create-po", icon: ShoppingCart },
    { name: "Invoices", href: "/vendor/invoices", icon: FileText },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Documents", href: "/documents", icon: FolderOpen },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const customerNavigation = [
    { name: "Dashboard", href: "/customer/dashboard", icon: Home },
    { name: "Pending Reviews", href: "/customer/dashboard?filter=pending", icon: FileText },
    { name: "Approved", href: "/customer/dashboard?filter=approved", icon: CheckCircle },
    { name: "Rejected", href: "/customer/dashboard?filter=rejected", icon: XCircle },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Documents", href: "/documents", icon: FolderOpen },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const adminNavigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "System Logs", href: "/admin/logs", icon: FileText },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const navigation =
    currentRole === "vendor"
      ? vendorNavigation
      : currentRole === "customer"
      ? customerNavigation
      : currentRole === "admin"
      ? adminNavigation
      : vendorNavigation;

  const roleTitle =
    currentRole === "vendor"
      ? "DDAPL Vendor"
      : currentRole === "customer"
      ? "Zepto Customer"
      : currentRole === "admin"
      ? "Admin Panel"
      : "PO & Invoice System";

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold">{roleTitle}</div>
            <div className="text-xs text-neutral-500">Management System</div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.href)}
                    isActive={location.pathname + location.search === item.href}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
