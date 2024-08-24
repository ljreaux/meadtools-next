"use client";
import { Switch } from "./switch";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function RecipeTogglePrivate({
  recipe,
}: {
  recipe: { id: number; user_id: number; name: string; private: boolean };
}) {
  const { t } = useTranslation();
  const [isPrivate, setIsPrivate] = useState(recipe.private);
  async function togglePrivate(recipe: { private: boolean; id: number }) {
    setIsPrivate(!isPrivate);
  }

  return (
    <div className="flex items-center justify-center gap-2 text-center">
      <p>{t("private")}</p>
      <Switch
        checked={isPrivate}
        onCheckedChange={() => {
          togglePrivate(recipe);
        }}
      />
    </div>
  );
}

export default RecipeTogglePrivate;
