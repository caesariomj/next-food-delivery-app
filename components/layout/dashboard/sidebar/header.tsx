import Logo from "@/components/ui/logo";
import { SidebarHeader as ShadcnSidebarHeader } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils/cn";

type SidebarHeaderProps = {
  className?: string;
};

export default function SidebarHeader({ className }: SidebarHeaderProps) {
  return (
    <ShadcnSidebarHeader
      className={cn(
        "flex items-start justify-center bg-primary p-4",
        className
      )}
    >
      <Logo />
    </ShadcnSidebarHeader>
  );
}
