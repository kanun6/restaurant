import { AppSidebar } from "@/components/Dashboard/SidebarMenu"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"



// import "./goba"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
