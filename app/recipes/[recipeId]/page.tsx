import React from "react";

function Recipe({ params: { recipeId } }: { params: { recipeId: string } }) {
  return <div>This is recipe number {recipeId}</div>;
}

export default Recipe;
