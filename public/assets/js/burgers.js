// This is going to be all the jquery stuff for our burgers


$(function() {
  $(".devour-button").on("click", function(event) {
    var id = $(this).data("id");
    var newDevour = $(this).data("newDevour");

    var newDevourState = {
      devoured: newDevour
    };

    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevourState
    }).then(
      function() {
        console.log("I ate da burger, devoured = " newDevour);
        location.reload();
      }
    );
  });

  $(".create-burger-form").on("submit", function(event) {
    // for any submit event
    event.preventDefault();

    var newBurger = {
      name: $("#burger_name")
    };

  // post request to send new burger to db
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("Cooked up a new burger!");
        location.reload();
      }
    );
  });
});
