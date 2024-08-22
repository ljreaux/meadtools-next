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

  return <section>{children}</section>;
}
