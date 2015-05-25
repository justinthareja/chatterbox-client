// YOUR CODE HERE:
$.ajax({
  url: "https://api.parse.com/1/classes/chatterbox",
  type: 'GET',
  dataType:'json',
  success: function(data){
  var messages = data.results;
  // get returns object
  for (var i = 0; i < messages.length; i++) {
    var username = messages[i].username;
    var message = messages[i].text;
    var $textContainer = $('<li class="list-group-item"></li>')

    $textContainer.text(username +': ' + message);
    $('.list-group').append($textContainer);

  }
    // parse object for all messages
    // iterate over object.results
    // within each iteration capture the element.username field and element.text field
    // concat them together in a string and add it to a list item within .container
    console.log(message);
  }
})

// function


