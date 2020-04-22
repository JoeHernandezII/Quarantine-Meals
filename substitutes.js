var key = "2fab4c84b7764ca9958380e6b14dc6db";
var subInput = $(".input").text();



function getSubstitutes() {
    var subInput = $("input").val();
    console.log(subInput);
    $.ajax({
        url: "https://api.spoonacular.com/food/ingredients/substitutes?apiKey=" + key + "&ingredientName=" + subInput,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        document.getElementById("card-content").innerHTML = "";

        var ingredient = response.ingredient;
        var substitutes = response.substitutes
        var listLocation = $(".card-content");
        var cardHeader = "Substitutes for " + ingredient;
        var titleLocation = $(".media-content");

        var titleTag = $("<p>").val(cardHeader);
        console.log(titleTag.val());
        titleTag.addClass("title is-4");

        titleLocation.append(titleTag);

        //headerLocation.textContent(cardHeader);
        for (let i = 0; i < substitutes.length; i++) {
            var option = substitutes[i];

            var listItem = $("<p>").text(option);

            listLocation.append(listItem);


        }


    });

};