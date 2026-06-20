import { Outlet, useLocation } from "react-router";
import { AppSidebar } from "../components/layout/app-sidebar";
import { TopNavigation } from "../components/layout/top-navigation";
import { SidebarProvider } from "../components/ui/sidebar";

export function RootLayout() {
  const location = useLocation();
  const isRoleSelection = location.pathname === "/";

  if (isRoleSelection) {
    return <Outlet />;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopNavigation />
          <main className="flex-1 overflow-y-auto bg-neutral-50 p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
