import NotificationDropdown from "@/components/common/navigation/notification-dropdown";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardNavbar() {
  return (
    <header className="flex h-15 items-center border-b-4 border-foreground bg-primary sm:h-16">
      <nav className="flex h-full w-full items-center justify-between">
        <SidebarTrigger className="h-full w-15 border-0 border-r-4 transition-colors duration-200 ease-in-out hover:bg-background focus-visible:bg-background active:not-aria-[haspopup]:translate-y-0 sm:w-16" />
        <div className="h-full border-l-4 border-l-foreground">
          <NotificationDropdown className="h-full px-3.5 sm:px-5" />
        </div>
      </nav>
    </header>
  );
}
