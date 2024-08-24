"use client";
import { useUserRecipes } from "@/hooks/useUser";

import RecipeCard from "./RecipeCard";
import { SkeletonCard } from "@/components/SkeletonCard";

import { useTranslation } from "react-i18next";
import { AccountButtons } from "./AccountButtons";

export default function Account() {
  const { recipes, error, deleteRecipe } = useUserRecipes();
  const { t } = useTranslation();

  return (
    <>
      <AccountButtons />
      <h1 className="text-3xl my-4">{t("accountPage.title")} </h1>
      {error ? (
        <div>Error: {error.message}</div>
      ) : recipes.length ? (
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
    </>
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
