"use client";

import { useUser } from "@/hooks/useUser";

import React, { Suspense } from "react";
import Loading from "../loading";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useUser();

  return (
    <main className="flex items-center justify-center">
      <section className="w-11/12 flex flex-col items-center justify-center text-center rounded-xl bg-background p-2 sm:p-8 my-40 md:my-24 mb-8 text-xs sm:text-base">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </section>
    </main>
  );
}
