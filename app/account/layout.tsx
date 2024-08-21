"use client";
import { useUser } from "@/hooks/useUser";

import React from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, error } = useUser();
  if (!user || error) return <section>Loading...</section>;

  return (
    <section>
      <p>{JSON.stringify(user)}</p>
      <p>{JSON.stringify(error)}</p>
      {children}
    </section>
  );
}
