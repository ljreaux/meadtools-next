"use client";
import { useUserRecipes } from "@/hooks/useUser";

export default function Account() {
  const { recipes, error } = useUserRecipes();
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      {recipes.map((rec) => {
        return <p key={rec.id}>{rec.name}</p>;
      })}
    </div>
  );
}
