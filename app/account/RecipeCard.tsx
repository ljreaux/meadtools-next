import { useTranslation } from "react-i18next";

import { useToast } from "@/components/ui/use-toast";
import RecipeTogglePrivate from "@/components/ui/RecipeTogglePrivate";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Recipe } from "../actions/recipes";

export default function RecipeCard({
  recipe,
  deleteRecipe,
}: {
  recipe: Recipe;
  deleteRecipe: () => Promise<{ message: string; status: string }>;
}) {
  const { push } = useRouter();
  const { t } = useTranslation();
  const { toast } = useToast();

  return (
    <div className="grid items-center justify-center gap-2">
      <p>{recipe.name}</p>
      <RecipeTogglePrivate recipe={recipe} />
      <div className="flex gap-1">
        <Button onClick={() => push(`/recipes/${recipe.id}`)}>
          {t("accountPage.viewRecipe")}
        </Button>
        <Button onClick={() => push(`/recipes/${recipe.id}?pdf=true`)}>
          {t("PDF.title")}
        </Button>
      </div>
      <Button
        onClick={async () => {
          const { message, status } = await deleteRecipe();
          toast({
            description: message,
            variant: status === "error" ? "destructive" : "default",
          });
        }}
        variant="destructive"
      >
        {t("accountPage.deleteRecipe")}
      </Button>
    </div>
  );
}
