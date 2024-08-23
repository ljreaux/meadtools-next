import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className="my-40 md:my-24">{children}</section>;
}
