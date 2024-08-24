"use client";
import { useUserRecipes } from "@/hooks/useUser";
import { logout } from "@/lib/users";
import RecipeCard from "./RecipeCard";
import { SkeletonCard } from "@/components/SkeletonCard";

export default function Account() {
  const { recipes, error, deleteRecipe } = useUserRecipes();
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <h1 className="text-3xl my-4">User Recipes</h1>
      {recipes.length ? (
        <div className="flex gap-4 flex-wrap justify-center">
          {recipes.map((rec) => {
            return (
              <RecipeCard
                key={rec.id}
                recipe={rec}
                deleteRecipe={async () => {
                  return await deleteRecipe(rec.id);
                }}
              />
            );
          })}
        </div>
      ) : (
        <CardLoading />
      )}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

const CardLoading = () => (
  <div className="flex gap-4 flex-wrap my-4 justify-center">
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
  </div>
);
