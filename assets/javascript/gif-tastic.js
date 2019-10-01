$("button").on("click", function () {
    var sports = $(this).attr("data-sports");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      sports + "&api_key=VOB42k43YwwyvA4LU1bG86RXHJU1eZMQ&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
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

        }
    });
});