import { AppSidebar } from "@/components/Dashboard/SidebarMenu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="bg-black">
        <AppSidebar />
      </div>
      <main className="">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
