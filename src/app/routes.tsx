import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/root-layout";
import { VendorDashboard } from "./pages/vendor/dashboard";
import { CustomerDashboard } from "./pages/customer/dashboard";
import { AdminDashboard } from "./pages/admin/dashboard";
import { AdminUsers } from "./pages/admin/users";
import { AdminLogs } from "./pages/admin/logs";
import { CreatePO } from "./pages/vendor/create-po";
import { InvoiceManagement } from "./pages/vendor/invoice-management";
import { PODUpload } from "./pages/vendor/pod-upload";
import { RejectionResolution } from "./pages/vendor/rejection-resolution";
import { InvoiceReview } from "./pages/customer/invoice-review";
import { Reports } from "./pages/reports";
import { Documents } from "./pages/documents";
import { Settings } from "./pages/settings";
import { NotFound } from "./pages/not-found";
import { RoleSelection } from "./pages/role-selection";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: RoleSelection },
      
      // Vendor routes
      { path: "vendor/dashboard", Component: VendorDashboard },
      { path: "vendor/create-po", Component: CreatePO },
      { path: "vendor/invoices", Component: InvoiceManagement },
      { path: "vendor/pod-upload/:invoiceId", Component: PODUpload },
      { path: "vendor/rejections/:invoiceId", Component: RejectionResolution },
      
      // Customer routes
      { path: "customer/dashboard", Component: CustomerDashboard },
      { path: "customer/review/:invoiceId", Component: InvoiceReview },
      
      // Admin routes
      { path: "admin/dashboard", Component: AdminDashboard },
      { path: "admin/users", Component: AdminUsers },
      { path: "admin/logs", Component: AdminLogs },
      
      // Shared routes
      { path: "reports", Component: Reports },
      { path: "documents", Component: Documents },
      { path: "settings", Component: Settings },

      { path: "*", Component: NotFound },
    ],
  },
]);
