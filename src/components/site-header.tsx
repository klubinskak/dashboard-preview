import ThemeToggle from "@/app/components/shared/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useHeader } from "@/context/header-context";
import Notification from "@/app/components/shared/notification";

export function SiteHeader() {
  const {title} = useHeader();

  return (
    <header className="flex py-8 h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
        <div className="w-full">
          <div className="flex justify-end items-center gap-2">
            <Notification />
            <ThemeToggle/>
          </div>
        </div>
      </div>
    </header>
  );
}
