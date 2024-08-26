import React from "react";
import ExtraCalcsSideBar from "../../components/ExtraCalcsSideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <ExtraCalcsSideBar />
      <section className="w-11/12 flex flex-col items-center justify-center text-center rounded-xl p-2 sm:p-8 mb-8 text-xs sm:text-base lg:max-w-[60%] sm:max-w-[80%] sm:ml-24 md:ml-0">
        {children}
      </section>
    </main>
  );
}
