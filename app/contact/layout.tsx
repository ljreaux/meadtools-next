import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-center justify-center">
      <section className="w-1/2 flex flex-col items-center justify-center text-center rounded-xl bg-background p-2 sm:p-8 my-40 md:my-24 mb-8 text-xs sm:text-base">
        {children}
      </section>
    </main>
  );
}
