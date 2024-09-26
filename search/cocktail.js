document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cocktailId = urlParams.get("id");
  
    if (cocktailId) {
      await showCocktailDetail(cocktailId);
    }
  });
  
  async function showCocktailDetail(id) {
    const titleElem = document.querySelector("#cocktail-title");
    const imageElem = document.querySelector("#cocktail-image");
    const ingredientsElem = document.querySelector("#cocktail-ingredients");
    const infoElem = document.querySelector("#cocktail-info");
    const instructionsElem = document.querySelector("#cocktail-instructions");
  
    const req = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await req.json();
    const drink = data.drinks[0];
  
    titleElem.textContent = drink.strDrink;
    imageElem.src = drink.strDrinkThumb;
  
    ingredientsElem.innerHTML = Object.keys(drink)
      .filter(key => key.startsWith("strIngredient") && drink[key])
      .map(key => {
        const ingredient = drink[key];
        const measure = drink[`strMeasure${key.slice(13)}`] || "";
        const ingredientImage = `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`;
        const ingredientLink = `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredient.replace(/ /g, "_")}`;
        return `
          <li>
            <img src="${ingredientImage}" alt="${ingredient}" class="ingredient-image" onclick="window.open('${ingredientLink}', '_blank')">
            ${ingredient} - ${measure}
          </li>`;
      })
      .join("");
  
    infoElem.innerHTML = `
      <h3 class="text-xl mt-2">Information</h3>
      <p><strong>Category:</strong> ${drink.strCategory}</p>
      <p><strong>IBA:</strong> ${drink.strIBA || "No"}</p>
      <p><strong>Type:</strong> ${drink.strAlcoholic}</p>
      <p><strong>Glass:</strong> ${drink.strGlass}</p>
    `;
  
    instructionsElem.innerHTML = `
      <h3 class="text-xl mt-2">Instructions</h3>
      <p>${drink.strInstructions}</p>
    `;
  }  