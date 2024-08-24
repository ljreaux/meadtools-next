import logo from "@/assets/full-logo.png";
import Image from "next/image";

export default function Loading() {
  return (
    <main className="flex items-center justify-center">
      <section className="w-11/12 flex flex-col items-center justify-center text-center p-2 sm:p-8 my-40 md:my-24 mb-8 text-xs sm:text-base">
        <Image className="animate-pulse" src={logo} alt="loading img" />
      </section>
    </main>
  );
}
