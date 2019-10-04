// Create variable for favorite sports teams
var teams = ["Green Bay Packers", "New York Yankees", "Tottenham Hotspur", "Sport Lisboa e Benfica", "Portuguese National Team"];

// function to create new buttons from the teams array
function buttonGenerator() {

  // the previous div elements are emptied 
  $("#buttons-view").empty();

  // loops through the array of teams and creates buttons
  for (i = 0; i < teams.length; i++) {
    var button = $("<button>");
    button.addClass("team , btn btn-light");
    button.attr("data-name", teams[i]);
    button.text(teams[i]);
    $("#buttons-view").append(button);
  }
}

// This function handles events where one button is clicked
$("#add-gif").on("click", function (event) {

  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var sports = $("#sports-input").val().trim();
  teams.push(sports);

  // calling buttonGenerator which handles the processing of our teams array
  buttonGenerator();
});

// Calling the buttonGenerator function at least once to display the initial list of movies
buttonGenerator();

// Creating an AJAX call for the specific gif button being clicked
$("gif-button").on("click", function () {
  var sports = $(this).attr("data-sports");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    sports + "&api_key=VOB42k43YwwyvA4LU1bG86RXHJU1eZMQ&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var gifImage = $("<img>");
        gifImage.attr("src", results[i].images.fixed_height.url);

        gifDiv.prepend(p);
        gifDiv.prepend(gifImage);

        $("#display-gifs").prepend(gifDiv);

        // Pause and animate gifs when clicked
        $(".gif").on("click", function () {
          var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
      }
    });
});