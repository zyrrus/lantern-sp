import { SidebarProvider, SidebarTrigger } from "~/app/_components/ui/sidebar";
import { AppSidebar } from "~/app/_components/macro/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
