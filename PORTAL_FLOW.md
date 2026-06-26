# PO & Invoice Management System - Portal Flow Documentation

This document describes the end-to-end user flows, page routes, layout contents, and system purposes for the PO & Invoice Management System.

---

## 1. Entry Point: Role Selection
* **Route**: `/`
* **Component**: [RoleSelection](file:///e:/Sukanya/VENDOR-APP-main/src/app/pages/role-selection.tsx)
* **What it Contains**: A clean, premium card interface prompting the user to select their role: **Vendor (DDAPL)**, **Customer (Zepto)**, or **Administrator**.
* **Purpose**: Serves as the gateway to route the user into the specific workflow dashboards tailored to their permissions.

---

## 2. Workflow A: The Vendor Portal (Supplier Flow)
This workflow handles the creation of Purchase Orders (POs), invoice billing submissions, delivery receipt uploads, and resolving rejected items.

### A. Vendor Dashboard
* **Route**: `/vendor/dashboard`
* **Component**: [VendorDashboard](file:///e:/Sukanya/VENDOR-APP-main/src/app/pages/vendor/dashboard.tsx)
* **Contents**:
  * A `"View KPI Metrics"` button in the header that opens a dialog showing overall statistics (Total POs, pending approvals, rejections).
  * An **Invoices Table** displaying active invoices. Clicking a PO Number opens a horizontal dropdown showing invoice metadata and an **Eye button** that triggers a nested menu with options to preview files (**View Invoice**, **View PO**, or **View POD**).
  * **Recent Activity** list and **Pending Action Center** (alerts for items needing attention).
  * **Trend Charts** analyzing approvals/rejections over time.
* **Purpose**: Serves as the central vendor command center to monitor business transactions.

### B. Create Purchase Order
* **Route**: `/vendor/create-po`
* **Component**: [CreatePO](file:///e:/Sukanya/VENDOR-APP-main/src/app/pages/vendor/create-po.tsx)
* **Contents**: A form grid inputting PO Number, dates, device categories, quantities, store locations, and an optional notes field. Includes a sidebar for direct file uploads and submission buttons.
* **Purpose**: Used by the vendor to create and register a new Purchase Order in the system.

### C. Invoice Management
* **Route**: `/vendor/invoices`
* **Component**: [InvoiceManagement](file:///e:/Sukanya/VENDOR-APP-main/src/app/pages/vendor/invoice-management.tsx)
* **Contents**: Search/filter controls and a primary log of invoices. Includes an `"Upload Invoice"` button which triggers a dialog form to associate a digital invoice PDF to an active PO Number.
* **Purpose**: Used to record invoice submissions and link them directly to authorized POs.

### D. POD Upload
* **Route**: `/vendor/pod-upload/:invoiceId`
* **Component**: [PODUpload](file:///e:/Sukanya/VENDOR-APP-main/src/app/pages/vendor/pod-upload.tsx)
* **Contents**: A Drag & Drop file upload zone specifically styled for uploading signed Proof of Delivery (POD) documents.
* **Purpose**: Completed once delivery is made, finalizing the vendor's transaction loop.

### E. Rejection Resolution
* **Route**: `/vendor/rejections/:invoiceId`
* **Component**: [RejectionResolution](file:///e:/Sukanya/VENDOR-APP-main/src/app/pages/vendor/rejection-resolution.tsx)
* **Contents**: Horizontal header summary bar, a `"Rejection Resolution Center"` card displaying reviewer feedback comments on the left, and a corrective upload zone on the right. Shows the history timeline at the bottom.
* **Purpose**: Helps vendors quickly understand *why* an invoice was rejected (e.g. Missing POD) and submit the required corrections in one place.

---

## 3. Workflow B: The Customer Portal (Reviewer/Retailer Flow)
This workflow handles the evaluation, verification, and approval of incoming vendor invoices.

### A. Customer Dashboard
* **Route**: `/customer/dashboard`
* **Component**: [CustomerDashboard](file:///e:/Sukanya/VENDOR-APP-main/src/app/pages/customer/dashboard.tsx)
* **Contents**: Core metrics dialog (approved, pending, rejected counts) and a main table of incoming invoices awaiting verification.
* **Purpose**: Helps customer audit teams monitor their pending workload.

### B. Invoice Review
* **Route**: `/customer/review/:invoiceId`
* **Component**: [InvoiceReview](file:///e:/Sukanya/VENDOR-APP-main/src/app/pages/customer/invoice-review.tsx)
* **Contents**: A detailed layout showing the uploaded Invoice document, the corresponding PO details, and the linked POD status. Offers two primary buttons: `"Approve"` or `"Reject"` (which opens a dialog requesting reviewer comments).
* **Purpose**: Allows the customer to review the transaction documents side-by-side and execute the final financial approval.

---

## 4. Workflow C: The Administrator Portal (System Admin Flow)
This workflow handles user accounting, access control, and auditing.

### A. Admin Dashboard
* **Route**: `/admin/dashboard`
* **Component**: [AdminDashboard](file:///e:/Sukanya/VENDOR-APP-main/src/app/pages/admin/dashboard.tsx)
* **Contents**: System metrics trigger and charts depicting total invoice volumes across all vendor networks.
* **Purpose**: Gives managers a high-level overview of portal utilization.

### B. User Management
* **Route**: `/admin/users`
* **Component**: [AdminUsers](file:///e:/Sukanya/VENDOR-APP-main/src/app/pages/admin/users.tsx)
* **Contents**: Table showing active users, their emails, assigned roles (Vendor, Customer, Admin), and department locations.
* **Purpose**: Allows admins to provision, configure, or deactivate accounts.

### C. System Activity Logs
* **Route**: `/admin/logs`
* **Component**: [AdminLogs](file:///e:/Sukanya/VENDOR-APP-main/src/app/pages/admin/logs.tsx)
* **Contents**: An audit trail showing details of every operation executed in the system (e.g. `"Invoice INV-2024-045 approved by Zepto review team"`).
* **Purpose**: Essential for system auditing, troubleshooting, and compliance tracking.

---

## 5. Workflow D: Shared Resource Pages
These pages are accessible by all roles to generate insights or manage account details.

### A. Reports
* **Route**: `/reports`
* **Component**: [Reports](file:///e:/Sukanya/VENDOR-APP-main/src/app/pages/reports.tsx)
* **Contents**: Filterable grids and summary panels tracking payment cycles, average approval times, and total billing amounts.
* **Purpose**: Used to evaluate logistical performance.

### B. Document Center
* **Route**: `/documents`
* **Component**: [Documents](file:///e:/Sukanya/VENDOR-APP-main/src/app/pages/documents.tsx)
* **Contents**: A file directory table displaying all uploaded items (Invoices, POs, PODs). Each row features an **Eye icon** to preview the PDF overlay and a **Download button**.
* **Purpose**: Serves as a single library for retrieving PDF receipts.

### C. Settings
* **Route**: `/settings`
* **Component**: [Settings](file:///e:/Sukanya/VENDOR-APP-main/src/app/pages/settings.tsx)
* **Contents**: Custom vertical sidebar tabs (`Profile`, `Notifications`, `Security`, `Preferences`, `Organization`) containing details for updating account passwords, email alerts, theme setups, active sessions, and company registration data.
* **Purpose**: Allows users to manage personal preferences and business organization profile details.
