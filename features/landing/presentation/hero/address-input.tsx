"use client";

import { RiMapPinFill } from "@remixicon/react";

export default function AddressInput() {
  function handleOpenMap() {
    // TODO: Implement Mapbox API here
  }

  return (
    <button
      className="flex h-16 w-full cursor-pointer items-center border-4 border-foreground bg-background px-4 text-base font-medium tracking-tight neo-shadow transition-shadow duration-200 ease-in-out hover:shadow-none focus-visible:shadow-none"
      onClick={handleOpenMap}
    >
      Find Food Near You
      <div className="ms-auto flex h-full w-auto items-center justify-center border-l-4 border-l-foreground ps-4">
        <RiMapPinFill className="size-6" />
      </div>
    </button>
  );
}
