"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { HeaderProvider } from "@/context/header-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HeaderProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 60)",
            "--header-height": "calc(var(--spacing) * 12)",
            "--sidebar-content-background": "var(--color-sidebar-content-background)"
          } as React.CSSProperties
        }
      >
        <AppSidebar  />
        <SidebarInset>
          <SiteHeader />
          <div
            className="flex flex-1 flex-col p-5"
          >
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </HeaderProvider>
  );
}
