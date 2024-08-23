"use client";
import { useUserRecipes } from "@/hooks/useUser";
import { logout } from "@/lib/users";

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
      <button onClick={logout}>Logout</button>
    </div>
  );
}
