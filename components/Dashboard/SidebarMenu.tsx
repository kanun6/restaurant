import { LayoutDashboard, Utensils, Armchair , BarChart, House  } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Usericon from "../Navbar/Usericon"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/Dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Menu",
    url: "/Dashboard/add_food",
    icon: Utensils,
  },
  {
    title: "Table",
    url: "/Dashboard/add_table",
    icon: Armchair,
  },
  {
    title: "Usage statistics",
    url: "/Dashboard/Usage_statistics",
    icon: BarChart,
  },
  {
    title: "Home",
    url: "/",
    icon: House,
  },
]

export function AppSidebar() {
  return (
    <Sidebar variant='floating'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <div className="flex mt-4">
          <Usericon />
          </div>          
          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
