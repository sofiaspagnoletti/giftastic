


// $("button").on("click", function () {
//     var animal = $(this).attr("data-animal");

var animals = ["Cats", "Dogs", "Birds", "Elephants"];

function displayAnimalGif() {
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=7un57cj6jtMoJGpdAjYAHDSAwdf2oxxN&limit=10";

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
                var p = $("<p>").text("Rating: " + results[i].rating);

                var animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height.url);

                animalDiv.append(p);
                animalDiv.append(animalImage);

                $("#gifs-appear-here").prepend(animalDiv);
            }
        });
}

function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < animals.length; i++) {

        var a = $("<button>");
        a.addClass("animal-btn");
        a.addClass("btn btn-info");
        // Adding a data-attribute
        a.attr("data-name", animals[i]);
        // Providing the initial button text
        a.text(animals[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

$("#add-animal").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var animal = $("#animal-input").val().trim();

    // Adding movie from the textbox to our array
    animals.push(animal);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

$(".gif").on("click", function (event) {

    var state = $(this).att('data-state');
    console.log(state);
    if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    }
    else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }

});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".animal-btn", displayAnimalGif);

// Calling the renderButtons function to display the intial buttons
renderButtons();


