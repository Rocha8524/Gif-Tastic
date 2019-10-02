// Create variable for favorite sports teams
var teams = ["Green Bay Packers", "New York Yankees", "Tottenham Hotspur", "Sport Lisboa e Benfica", "Portuguese National Team"];

// Create a variable for button
var button;

// Create variable for new topic generated from user input
var newTopicChosen = "";

// function to create new buttons from the topics array
var buttonGenerator = function () {
  // the previous div elements are emptied 
  $("#buttonArea").empty();
  // loops through the array and creates buttons
  for (i = 0; i < topics.length; i++) {
    button = $("<button type=" + "button" + ">" + topics[i] + "</button>").addClass("btn btn-warning").attr("data", topics[i]);
    $("#buttonArea").append(button);
  };
}

$("button").on("click", function () {
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

        var personImage = $("<img>");
        personImage.attr("src", results[i].images.fixed_height.url);

        gifDiv.prepend(p);
        gifDiv.prepend(personImage);

        $("#gifs-appear-here").prepend(gifDiv);

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