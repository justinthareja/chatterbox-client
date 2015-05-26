$(document).ready(function() {

  var username;


// Display username and message of the 15 most recent messages.
  var getMessages = function(){
      $.ajax({
      url: "https://api.parse.com/1/classes/chatterbox",
      type: 'GET',
      dataType:'json',
      success: function(data) {
        $('.list-group-item').remove();
        var messages = data.results;
        // console.log(data);

        for (var i = 0; i < 15; i++) {
          var username = messages[i].username;
          var message = messages[i].text;
          var $textContainer = $('<li class="list-group-item"></li>');
          $textContainer.text(username +': ' + message);
          $('.list-group').append($textContainer);

        }
      }
    })
  };

// Initial update of chatrooms
  $.ajax({
    url: "https://api.parse.com/1/classes/chatterbox",
    type: 'GET',
    dataType:'json',
    success: function(data) {
      var messages = data.results;
      var rooms = {};

      for (var i = 0; i < messages.length; i++) {
        console.log(messages[i].roomname);
        rooms[messages[i].roomname] = true;
      }

      console.log(rooms);

      // debugger;
      for (var key in rooms) {
        var $chatRoom = $('<li class="room"></li>');
        var $anchor = $('<a href="#"></a>');
        $anchor.text(key);
        $chatRoom.append($anchor);
        $('.dropdown-menu').prepend($chatRoom);
        // $anchor.val('');
      }

    }
  })

// Retrieve messages every second.
  setInterval(getMessages, 1000);

// Extract string from input box and post to server along with username and roomname.
  var send = function () {

    var userInput = $('#userInput').val();
    $('#userInput').val('');

    var message = {
      username: username,
      text: userInput,
      roomname: 'hrhehe'
    }


    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });

  }

  $('#submit').on('click', send)

// Set username
// After username is set, clicking username will allow user to change username again.
  $('#login').on('click', function(){
    username = prompt("Enter your username: ")
    $('#login').val('');
    $('#login').text(username);
  });


}); // end of document ready




