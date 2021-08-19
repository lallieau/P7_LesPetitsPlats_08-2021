import { recipes } from "./recipes.js";

const recipesList = document.querySelector("#list-recipes");

const recipeIngredientsListTemplate = (recipeIngredients) => {
  if (!recipeIngredients.unit && !recipeIngredients.quantity) {
    return `<li class="card-recipe__list-ingredients__name">
        <strong>${recipeIngredients.ingredient}</strong>
      </li>`;
  }
  if (!recipeIngredients.unit && recipeIngredients.quantity) {
    return `<li class="card-recipe__list-ingredients__name">
    <strong>${recipeIngredients.ingredient}:</strong> ${recipeIngredients.quantity}
  </li>`;
  }
  return `<li class="card-recipe__list-ingredients__name">
      <strong>${recipeIngredients.ingredient}:</strong> ${recipeIngredients.quantity} ${recipeIngredients.unit}
    </li>`;
};

const recipesListTemplate = (recipe) => {
  return `
    <div class="card-recipe">
        <img src="./src/public/assets/food.png" class="card-img-top" alt="..." />
        <div class="card-recipe__body">
            <div class="card-recipe__header">
                <h2 class="card-recipe__title">${recipe.name}</h5>
                <div class="card-recipe__time">
                    <!-- <i class="bi bi-clock"></i> -->
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-clock"
                        viewBox="0 0 16 16"
                    >
                        <path
                        d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"
                        />
                        <path
                        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"
                        />
                    </svg>
                    <p>${recipe.time} min</p>
                </div>
            </div>
            <div class="card-recipe__content">
                <ul id="card-recipe__list-ingredients">
                ${recipe.ingredients
                  .map(recipeIngredientsListTemplate)
                  .join("")}
                </ul>
                <p class="card-recipe__text">
                ${recipe.description}
                </p>
            </div>
        </div>
    </div>
      `;
};

const searchValue = document.querySelector(".form-control");

const showRecipes = (searchValue) => {
  const filterRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchValue) ||
      recipe.description.toLowerCase().includes(searchValue)
    // ||
    // recipe.ingredients.filter((element) => {
    //   element.ingredient.toLowerCase().includes(searchValue);
    // })
  );

  recipesList.innerHTML = filterRecipes
    .map((recipe) => recipesListTemplate(recipe))
    .join("");
};

searchValue.addEventListener("input", () => {
  if (searchValue.value.length >= 3) {
    return showRecipes(searchValue.value);
  }
});

showRecipes("coco");
