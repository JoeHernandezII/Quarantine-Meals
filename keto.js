


//Edamam APIs --- Keto Friendly food

$("#submitRecipe").on("click", function () {
  var searchValue = $("#recipeSearchBox").val().trim();
  localStorage.setItem("lastRecipe", searchValue);
  //calling KetoDiet function to populate the recipes based on the search term
  ketoFriendly(searchValue);
});

//retrieves the last searched recipe term and loads the webpage with the same
if (localStorage.getItem("lastRecipe") != null) {
  ketoFriendly(localStorage.getItem("lastRecipe"));
}

//main function to load the recipe details
function ketoFriendly(keto) {
  var queryURL =
    "https://api.edamam.com/search?q=" +
    keto +
    "&app_id=8576ed90&app_key=ab55075184c4b008009b866d7c39b885&Health=keto-friendly&to=5";
  // API call for getting recipe details
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // console.log(response);
    $("#recipeInfo").empty();

    // start rendering the data on the html from here
    for (i = 0; i < response.hits.length; i++) {
      var recipeHeading = $("<p>").text(
        "Recipe " + (i + 1) + ": " + response.hits[i].recipe.label
      );
      $(recipeHeading).addClass("title is-4");

      healthLabels = $("<p>").text(
        "Category: " + response.hits[i].recipe.healthLabels[0]
      );

      var calories = $("<p>").text(
        "Calories: " + Math.floor(response.hits[i].recipe.calories)
      );

      var recipeImage = $("<img>").attr("src", response.hits[i].recipe.image);

      var ingredients = $("<p>").text("Ingredients: ");
      $(ingredients).addClass("subtitle is-5");

      $("#recipeInfo").append(
        recipeHeading,
        recipeImage,
        healthLabels,
        calories,
        ingredients
      );

      //loop for building ingredient list based on the number of ingredients
      for (j = 0; j < response.hits[i].recipe.ingredientLines.length; j++) {
        ingredients = $("<p>").text(response.hits[i].recipe.ingredientLines[j]);
        $("#recipeInfo").append(ingredients);
      }

      //building the URL for displaying on HTML
      var urlText = $("<p>").text("For recipe directions use this link: ");
      var url = $("<a>").text(response.hits[i].recipe.url);
      $(url).attr("href", response.hits[i].recipe.url);
      $(url).attr("target", "_blank");

      $("#recipeInfo").append("<br>", urlText, url, "<br><br><br>");
    }
  });
}
