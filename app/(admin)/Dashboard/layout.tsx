import { AppSidebar } from "@/components/Dashboard/SidebarMenu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import "./globals.css"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
