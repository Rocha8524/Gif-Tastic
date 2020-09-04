// Create variable for favorite sports teams
var sport = ["Packers", "Yankees", "Tottenham Hotspur", "Benfica", "Portugal Team", "USA Soccer", "Ronaldo"];

// function to create new buttons from the teams array
function buttonGenerator() {

  // the previous div elements are emptied 
  $("#buttons-view").empty();

  // loops through the array of teams and creates buttons
  for (i = 0; i < sport.length; i++) {
    var button = $("<button>");
    button.addClass("team , btn btn-light");
    button.attr("data-name", sport[i]);
    button.text(sport[i]);
    $("#buttons-view").append(button);
  }
}

// Ajax Call
function sportsGifsDisplay() {
  var sports = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    sports + "&api_key=VOB42k43YwwyvA4LU1bG86RXHJU1eZMQ&limit=4";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {

      var results = response.data;
      $("#display-gifs").empty();

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");

        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);

        var gifImage = $("<img>");
        gifImage.attr("src", results[i].images.fixed_height.url);

        gifDiv.prepend(p);
        gifDiv.prepend(gifImage);

        $("#display-gifs").prepend(gifDiv);
      }
    })
}

// This function handles events where one button is clicked
$("#add-button").on("click", function (event) {

  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var sports = $("#sports-input").val().trim();
  sport.push(sports);

  // calling buttonGenerator which handles the processing of our teams array
  buttonGenerator();
});

// Adding a click event listener to all elements with a class of "display-gif"
$(document).on("click", ".team", sportsGifsDisplay);

// Pause and animate gifs when clicked
$(document).on("click", function () {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).data("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).data("data-still"));
    $(this).attr("data-state", "still");
  }
});

// Calling the buttonGenerator function at least once to display the initial list of movies
buttonGenerator();