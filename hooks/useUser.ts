import { getUserRecipes, Recipe } from "@/app/actions/recipes";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
type User =
  { id: number, email: string, role: 'admin' | "user" }


export const useUser = () => {
  const { push } = useRouter();

  const [user, setUser] = useState<null | User>(null)
  const [error, setError] = useState<null | AxiosError>(null)


  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();
      if (error || !user) {
        setError(error);
        push("/");
      } else {
        setUser(user);
        setError(null);
      }
    })();
  }, []);
  return { user, error }
}
export const getUser = async () => {
  try {
    const { data } = await axios.get("/api/auth/me");
    if (data.status !== 200) throw new Error(data);
    return {
      user: data.user,
      error: null,
    };
  } catch (err) {
    const error = err as AxiosError;
    return {
      user: null,
      error: error,
    };
  }
};


export const useUserRecipes = () => {
  const [error, setError] = useState<null | AxiosError>(null)
  const [recipes, setRecipes] = useState<Recipe[]>([])

  const deleteRecipe = async (recipeId: number) => {
    try {
      const { data } = await axios.delete(`/api/recipes/${recipeId}`);
      if (data.status !== 200) throw new Error(data);
      const updatedRecipes = recipes.filter(rec => rec.id !== recipeId)
      setRecipes(updatedRecipes)
      return { message: 'Recipe deleted successfully', status: 'success' };
    } catch (err) {
      const error = err as AxiosError;
      setError(error)
      return { message: 'Error deleting recipe', status: 'error' };
    }
  }

  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();
      if (error) {
        setRecipes([])
        setError(error)
        return
      }
      const recipes = await getUserRecipes(user.id);
      if (recipes.length === 0) setError(new AxiosError('No recipes found'))
      setRecipes(recipes)
    })()
  }, [])
  return { error, recipes, deleteRecipe }
}