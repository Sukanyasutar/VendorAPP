# Senior UI/UX Design Prompt — Vendor–Customer PO & Invoice Management System

## Project Overview

Act as a world-class Senior Product Designer and UX Architect designing an enterprise-grade web application for managing Purchase Orders (PO), Invoices, Dispatches, and POD (Proof of Delivery) workflows between vendor DDAPL and customer Zepto.

Design a modern, scalable, highly intuitive SaaS-style dashboard platform focused on operational efficiency, transparency, document management, workflow automation, and approval tracking.

The UI should feel like a premium combination of:

* Notion + Linear + Stripe Dashboard + Zoho + SAP Fiori
* Clean enterprise minimalism
* High readability
* Fast workflow execution
* Modern card-based layouts
* Professional B2B operations software

The system is role-based with 3 user types:

1. Vendor (DDAPL)
2. Customer (Zepto)
3. Admin

The platform should support:

* PO creation
* Invoice management
* POD uploads
* Approval/Rejection workflows
* Audit logs
* Reports
* Notifications
* File/document management
* Status tracking
* Email workflow triggers

---

# UX Design Goals

Design the product with these UX principles:

### Primary Goals

* Reduce manual operations
* Simplify invoice approvals
* Improve document traceability
* Enable quick status visibility
* Make workflows intuitive for non-technical operations teams
* Reduce approval/rejection confusion
* Improve response time for rejected invoices

### UX Style

* Enterprise SaaS
* Clean spacing
* Soft shadows
* Large readable typography
* Minimal cognitive load
* Responsive layouts
* Clear hierarchy
* Workflow-first interface
* Data-heavy but uncluttered

### Design Language

Use:

* 8px grid system
* Rounded cards (12–16px)
* Subtle elevation
* Neutral backgrounds
* High-contrast tables
* Modern sidebar navigation
* Sticky headers
* Search-first experience
* Smart filters
* Status chips
* Timeline indicators
* Progress tracking

---

# Information Architecture

## Global Layout Structure

### Main Layout

* Left collapsible sidebar
* Top navigation bar
* Main content area
* Notification center
* User profile dropdown
* Global search

### Sidebar Navigation

Design separate navigation flows per role.

---

# Vendor Dashboard UX Flow (DDAPL)

## Vendor Dashboard Home

Design a highly actionable dashboard.

### Top KPI Cards

Include:

* Total POs
* Pending Approvals
* Rejected Invoices
* Approved Invoices
* Resubmitted Cases
* Dispatches This Week

### Dashboard Sections

1. Recent Activity Timeline
2. Pending Action Center
3. Rejected Cases Needing Attention
4. PO Status Analytics
5. Invoice Submission Progress
6. Quick Upload Widget
7. Notification Feed

### Charts

Include:

* PO trend chart
* Approval vs rejection graph
* Monthly invoice analytics
* Store-level dispatch analytics

### Quick Actions

Buttons:

* Create PO
* Upload Invoice
* Upload POD
* View Rejections
* Generate Reports

---

# Vendor Workflow Screens

## 1. Create PO Screen

Design a clean multi-step form.

### Fields

* PO Number
* PO Date
* Device Type
* Quantity
* Expected Dispatch Date

### UX Requirements

* Auto-save draft
* Inline validation
* Progress indicator
* Smart date picker
* File attachment support
* Save as draft option

### Layout

* Two-column enterprise form layout
* Sticky action buttons
* Summary sidebar

---

## 2. Invoice Management Screen

Design a powerful invoice management workspace.

### Features

* Multiple invoices under one PO
* Table/grid layout
* Advanced filters
* Bulk upload support
* Status tags
* Search functionality

### Table Columns

* Invoice Number
* Store Name
* PO Number
* Device Quantity
* Status
* POD Status
* Submission Date
* Last Updated
* Actions

### Actions

* Upload invoice PDF
* Upload POD
* Edit invoice
* Resubmit rejected invoice
* View comments
* Download documents

### UX Style

* Enterprise data-table experience
* Sticky headers
* Row expansion
* Inline actions
* Batch operations

---

## 3. POD Upload Experience

Create a modern drag-and-drop upload system.

### Features

* Drag & drop area
* Multi-image upload
* File preview cards
* Upload progress
* Timestamp visibility
* Mobile-friendly image preview
* File size validation

### UX Requirements

* Mandatory upload indication
* Real-time validation
* Retry failed uploads
* Thumbnail preview
* Annotated upload states

---

## 4. Rejection Resolution Workflow

Design an intelligent correction workflow.

### Screen Requirements

* Rejection reason card
* Highlighted error comments
* Version history timeline
* Previous POD comparison
* Re-upload CTA
* Activity history

### UX Focus

* Make issue resolution extremely simple
* Reduce operational confusion
* Show exactly what needs correction

---

# Customer Dashboard UX Flow (Zepto)

## Customer Dashboard Home

### KPI Cards

* Pending Reviews
* Approved Invoices
* Rejected Invoices
* Recent Submissions
* Pending Resubmissions

### Sections

1. Pending Approval Queue
2. Recently Approved Invoices
3. Rejected Cases
4. Vendor Activity Timeline
5. Quick Approval Panel

---

# Customer Approval Workflow

## Invoice Review Screen

Design a split-view document review experience.

### Left Panel

* Invoice details
* Store details
* PO information
* Submission metadata
* Timeline

### Right Panel

* PDF invoice viewer
* POD image gallery
* Zoom support
* Fullscreen preview

### Bottom Sticky Action Bar

Buttons:

* Accept Invoice
* Reject Invoice
* Download Files
* Add Comment

### Rejection UX

If user clicks Reject:

* Mandatory comment modal
* Suggested rejection reasons
* Smart templates
* Error categorization

### Example Suggestions

* Missing POD
* Incorrect Store Name
* Blurry Image
* Incorrect Quantity

### Approval UX

* Success animation
* Confirmation modal
* Auto email trigger indicator

---

# Admin Panel UX

## Admin Dashboard

### Features

* User management
* Role assignment
* Storage monitoring
* System logs
* Email template management
* Audit logs
* Status override controls

### Admin Design Style

* Technical operations dashboard
* Dense information layout
* Permission matrix UI
* Activity monitoring panels

---

# Status Workflow Design

Create a visually strong status system.

### Status Types

* PO Booked
* Submitted
* Approved
* Rejected
* Resubmitted

### UX Requirements

Use:

* Color-coded status chips
* Workflow timelines
* Step indicators
* Animated transitions
* Hover tooltips

### Suggested Color Logic

* Approved → Green
* Rejected → Red
* Pending → Amber
* Resubmitted → Blue
* Draft → Gray

---

# Document Management UX

## File Center Design

Create a structured document explorer.

### Features

* Folder-like hierarchy
* Breadcrumb navigation
* Search by:

  * PO Number
  * Invoice Number
  * Store Name
  * Status
* File preview
* Bulk download
* Grid/list toggle

### File Cards

Show:

* File type icon
* Upload timestamp
* Uploaded by
* File size
* Version history

---

# Notification System UX

Design a modern notification center.

### Notifications Include

* Invoice submitted
* Invoice approved
* Invoice rejected
* Resubmission received
* Missing POD alert

### Notification Styles

* Real-time toast alerts
* Inbox notification center
* Priority labels
* Actionable CTAs

---

# Reporting & Analytics UX

## Reports Module

Design advanced analytics pages.

### Reports

1. PO Summary Report
2. Invoice Status Report
3. Rejection Analytics
4. Pending Approvals
5. Date Range Analytics
6. Store Dispatch Reports

### Features

* Export PDF
* Export Excel
* Interactive charts
* Smart filtering
* Date range selectors
* Download center

---

# Audit Trail UX

Design a transparent activity tracking system.

### Timeline Should Show

* Who uploaded
* Who approved/rejected
* Timestamp
* Previous document versions
* Status changes
* Comments

### UI Style

* Chronological activity timeline
* Expandable event cards
* Human-readable audit logs

---

# Design System Requirements

## Typography

Use modern enterprise typography.

### Hierarchy

* Dashboard headings
* Section titles
* Table labels
* Helper text
* Status indicators

### Characteristics

* High readability
* Strong contrast
* Minimal visual noise

---

# Component Library

Design reusable components:

### Components

* Sidebar
* KPI cards
* Data tables
* Status chips
* Upload widgets
* Timeline cards
* Notification toasts
* Filters
* Search bars
* Approval modals
* PDF preview modal
* Image gallery
* Empty states
* Confirmation dialogs
* Activity cards

---

# Responsive Design

Ensure responsiveness for:

* Desktop
* Tablet
* Large screens

Prioritize desktop enterprise workflow.

---

# Micro Interactions

Include:

* Smooth transitions
* Hover states
* Skeleton loaders
* Smart empty states
* Animated success states
* Upload progress animations
* Approval success feedback

---

# Accessibility Requirements

Ensure:

* WCAG-compliant contrast
* Keyboard accessibility
* Screen-reader support
* Clear button hierarchy
* Large clickable areas

---

# Deliverables Required

Generate:

1. Full UX workflow
2. User journey maps
3. Wireframes
4. High-fidelity dashboard UI
5. Vendor workflow screens
6. Customer approval workflow
7. Admin dashboard
8. Mobile-responsive layouts
9. Design system
10. Component library
11. Figma-ready structure
12. Interactive prototype flows

---

# Final UI Direction

The final product should feel like:

* Premium enterprise SaaS
* Fast operational workflow software
* Clean and trustworthy
* Highly scalable
* Designed for real-world operations teams
* Minimal learning curve
* Modern B2B dashboard ecosystem

Focus heavily on:

* Workflow clarity
* Approval speed
* Document visibility
* Operational efficiency
* Status transparency
* Professional enterprise aesthetics
* Reduced manual dependency

Generate the complete end-to-end UI/UX workflow and screen architecture in exceptional enterprise SaaS quality.
