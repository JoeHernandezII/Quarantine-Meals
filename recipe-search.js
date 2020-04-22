//Spoonacular APIs --- Recipe Search

//on click Submit button, recipe result will return
$("#submitBtn").on("click", function () {
  var searchValue = $("#searchBox").val().trim();
  localStorage.setItem("lastRecipeSearched", searchValue);

  //calling recipe function to populate the recipes based on the search term
  recipeSearch(searchValue);
});

//retrieves the last searched recipe term and loads the webpage with the same
if (localStorage.getItem("lastRecipeSearched") != null) {
  recipeSearch(localStorage.getItem("lastRecipeSearched"));
}

function recipeSearch(recipe) {
  var queryURL =
    "https://api.spoonacular.com/recipes/search?query= " +
    recipe +
    "&number=5&apiKey=e22d59d21eba4b1197fb42ef5257977a";
  // API call for getting recipe details
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    $("#recipeDisplay").empty();

    // start rendering the data on the html from here
    for (i = 0; i < 5; i++) {
      var recipeHeading = $("<p>").text(
        "Recipe " + (i + 1) + ": " + response.results[i].title
      );
      $(recipeHeading).addClass("title is-4");

      var recipeImage = $("<img>").attr(
        "src",
        "https://spoonacular.com/recipeImages/" +
          response.results[i].id +
          "-556x370.jpg"
      );

      var readyInMinutes = $("<p>").text(
        "Ready In Minutes: " + Math.floor(response.results[i].readyInMinutes)
      );

      var servings = $("<p>").text(
        "Servings: " + Math.floor(response.results[i].servings)
      );

      $("#recipeDisplay").append(
        recipeHeading,
        recipeImage,
        readyInMinutes,
        servings
      );

      //building the URL for displaying on HTML
      var urlText = $("<p>").text("For recipe directions use this link: ");
      var url = $("<a>").text(response.results[i].sourceUrl);

      //displays URLs
      $(url).attr("href", response.results[i].sourceUrl);
      $(url).attr("target", "_blank");

      $("#recipeDisplay").append("<br>", urlText, url, "<br><br><br>");
    }
  });
}
