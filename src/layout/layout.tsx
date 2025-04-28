import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/layout/_components/app-sidebar.tsx";
import { Outlet } from "react-router-dom";
import { Header } from "@/layout/_components/header.tsx";
import { useAuth } from "@/context/AuthContext.tsx";
import UnauthenticatedNotice from "@/layout/_components/UnauthenticatedNotice.tsx";

export default function Layout() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        {user ? <Outlet /> : <UnauthenticatedNotice />}
      </SidebarInset>
    </SidebarProvider>
  );
}
