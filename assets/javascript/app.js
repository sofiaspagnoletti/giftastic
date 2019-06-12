

var animals = ["Cat", "Dog", "Manatee", "Bird", "Elephant", "Pig", "Rabbit", "Hamster", "Turtle", "Frog", "Horse", "Lion"];

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
            $("#gifs-appear-here").empty();
            for (var i = 0; i < results.length; i++) {

                var animalDiv = $("<div>");
                animalDiv.addClass("col-6");
                var p = $("<p>").text("Rating: " + results[i].rating);

                var animalImage = $("<img>");
                animalImage.addClass("gif");

                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("data-state", "still");

                animalDiv.append(animalImage);
                animalDiv.append(p);

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
        a.attr("data-name", animals[i]);
        a.text(animals[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-animal").on("click", function (event) {
    event.preventDefault();
    var animal = $("#animal-input").val().trim();
    animals.push(animal);

    renderButtons();
});


$(document).on("click", ".animal-btn", displayAnimalGif);

renderButtons();

function changeState() {
    var state = $(this).attr('data-state');
    console.log(state);
    if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    }
    else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }
};

$(document).on("click", ".gif", changeState);




