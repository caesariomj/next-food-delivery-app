"use client";

import Image from "next/image";
import Link from "next/link";

import { RiHome5Fill } from "@remixicon/react";

import { Button } from "@/components/ui/button";

type AuthErrorViewProps = {
  title: string;
  message: string;
};

export function AuthErrorView({ title, message }: AuthErrorViewProps) {
  return (
    <section className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-y-8 p-8 md:p-16">
      <Image
        src="/images/illustrations/error-illustration.svg"
        alt="Error"
        loading="eager"
        width={750}
        height={750}
      />
      <h1 className="text-center font-display text-7xl font-black tracking-wide md:text-8xl">
        {title}
      </h1>
      <p className="text-center text-lg font-semibold tracking-tight md:text-xl">
        {message}
      </p>
      <Button variant="default" size="xl" className="mt-8" asChild>
        <Link href="/">
          <RiHome5Fill />
          Back to Home
        </Link>
      </Button>
    </section>
  );
}
