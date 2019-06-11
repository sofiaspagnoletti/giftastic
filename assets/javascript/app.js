


$("button").on("click", function () {
var animal = $(this).attr("data-animal");
    //links with the API key and search for cat tagged gifs/ storing query url 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=7un57cj6jtMoJGpdAjYAHDSAwdf2oxxN";

    // retrives data from API
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            console.log(queryURL);

            console.log(response);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var animalDiv = $("<div>");

                var animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height.url);

                animalDiv.append(animalImage);

                $("#gifs-appear-here").prepend(animalDiv);
            }
        });
});