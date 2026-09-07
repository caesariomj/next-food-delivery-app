import { RiCheckFill, RiNotificationFill } from "@remixicon/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils/cn";

type NotificationType = "order" | "payment";

type Notification = {
  id: number;
  type: NotificationType;
  label: string;
  text: string;
  time: string;
  opened: boolean;
};

const notificationIcons: Record<NotificationType, string> = {
  order: "📋",
  payment: "💵",
};

const notifications: readonly Notification[] = [
  {
    id: 1,
    type: "order",
    label: "Test Notification Order 1",
    text: "",
    time: "12 minutes ago",
    opened: false,
  },
  {
    id: 2,
    type: "payment",
    label:
      "This is a very long notification label to test the component i'm building right now",
    text: "",
    time: "12 minutes ago",
    opened: true,
  },
];

type NotificationDropdownProps = {
  className?: string;
};

// TODO: Implement notification feature here
export default function NotificationDropdown({
  className,
}: NotificationDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "relative inline-flex cursor-pointer items-center bg-primary px-5 text-base font-bold tracking-tight text-nowrap transition-colors duration-300 ease-in-out hover:bg-background focus:bg-background focus:text-foreground focus:outline-none",
            className
          )}
        >
          <RiNotificationFill className="size-6" />
          <span className="absolute top-0 right-0 flex size-5 items-center justify-center border-b-3 border-l-3 border-foreground bg-destructive p-2 text-xs font-bold text-background select-none md:size-6 md:text-sm">
            9+
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="mt-1 w-96">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-center">
            Notifications
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notifications.map((notification) => (
            <DropdownMenuItem
              className="flex w-full items-center justify-between gap-4"
              key={notification.id}
            >
              <div className="flex w-full items-center gap-2">
                <span className="flex size-14 shrink-0 items-center justify-center bg-secondary text-4xl">
                  {notificationIcons[notification.type]}
                </span>
                <div className="flex min-w-0 flex-col items-start gap-1">
                  <p className="text-base font-semibold tracking-tight text-foreground">
                    {notification.label}
                  </p>
                  <span className="text-sm tracking-tight text-foreground/80">
                    {notification.time}
                    {!notification.opened && " — New"}
                  </span>
                </div>
              </div>
              {!notification.opened && (
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping bg-error-400 opacity-75" />
                  <span className="relative inline-flex size-2 bg-error-500" />
                </span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex w-full items-center justify-center text-center"
          asChild
        >
          <button>
            Mark all as read
            <RiCheckFill />
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
