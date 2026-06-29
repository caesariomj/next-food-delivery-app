import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import "@/app/globals.css";

import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils/cn";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_APP_NAME ?? "My App",
    template: `%s ― ${process.env.NEXT_PUBLIC_APP_NAME ?? "My App"}`,
  },
  description:
    "Hungry? Browse menus, pick your favorites, and get great food delivered without the fuss.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        spaceGrotesk.variable,
        bebasNeue.variable
      )}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast: "rounded-none! border-4! border-foreground! neo-shadow!",
              title: "text-foreground! font-semibold!",
              description: "text-foreground!",
            },
          }}
        />
      </body>
    </html>
  );
}
