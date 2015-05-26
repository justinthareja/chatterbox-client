$(document).ready(function() {

  var username, message, userInput, roomName = 'Home';
  var timerId = 0;

// Display username and message of the 15 most recent messages.
  var getHomeMessages = function(){
      $.ajax({
      url: "https://api.parse.com/1/classes/chatterbox",
      type: 'GET',
      dataType:'json',
      success: function(data) {
        var messages = data.results;
        $('.list-group-item').remove();
        // console.log(data);

        for (var i = 0; i < 15; i++) {
          var $username = $('<span></span>').text(messages[i].username);
          var $message = $('<span></span>').text(': ' + messages[i].text);
          var $textContainer = $('<li class="list-group-item"></li>').append($username).append($message);
          $('.list-group').append($textContainer);

        }
      }
    })
  };

// Retrieve messages every second.
  // timerId = setInterval(getHomeMessages, 1000);

// Display username and messages of the 15 (or less) most recent messages with matching chat room name
  var getChatRoomMessages = function() {

    $.ajax({
      url: "https://api.parse.com/1/classes/chatterbox",
      type: 'GET',
      dataType:'json',
      success: function(data) {
        // debugger;
        var messages = data.results;
        var chatMessages = [];
        $('.list-group-item').remove();


        for (var i = 0; i < messages.length; i++) {
          if (messages[i].roomname === roomName) {
            chatMessages.push(messages[i]);
          }
        }


        for(var i = 0; i < chatMessages.length && i < 15; i++){
          var $username = $('<span></span>').text(chatMessages[i].username);
          var $message = $('<span></span>').text(': ' + chatMessages[i].text);
          var $textContainer = $('<li class="list-group-item"></li>').append($username).append($message);
          $('.list-group').append($textContainer);
        }
      }
    });
  }

  setInterval(function () {

    if (roomName === 'Home') {
      getHomeMessages();
    }
    else {
      getChatRoomMessages();
    }


  }, 1000);


// Initial update of chatrooms
// only occurs on load, need to wrap in a function and put on interval timer to maintain a current list
  $.ajax({
    url: "https://api.parse.com/1/classes/chatterbox",
    type: 'GET',
    dataType:'json',
    success: function(data) {
      var messages = data.results;
      var rooms = {};

      for (var i = 0; i < messages.length; i++) {
        rooms[messages[i].roomname] = true;
      }

      for (var key in rooms) {
        var $chatRoom = $('<li></li>');
        var $anchor = $('<a class="room" href="#"></a>');
        $anchor.text(key);
        $chatRoom.attr('id', key);
        $chatRoom.append($anchor);
        $('.dropdown-menu').prepend($chatRoom);
      }
    }
  })


// Extract string from input box and post to server along with username and roomname.
  var send = function () {
    // extract user input
    userInput = $('#userInput').val();
    $('#userInput').val('');

    // updates current message with username and roomname
    message = {
      username: username,
      text: userInput,
      roomname: roomName
    }

    // post message to server
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






// EVENT LISTENERS

  $('#submit').on('click', send)

// Set username
// After username is set, clicking username will allow user to change username again.
  $('#login').on('click', function(){
    username = prompt("Enter your username: ")
    $('#login').val('').text(username);
  });

// Appends a chatroom to the list
  $('.addRoom').on('click', function() {
    roomName = prompt('Name your chat room, punk', 'A chatroom');
    // on click, setting a room name send them to that room
    // add a note that the chat room will not be created until the first message is sent.
  });

  $('.dropdown-menu').delegate('.room', 'click', function () {
    $('.list-group-item').remove();
    roomName = $(this).text();
    $('h1').text('').text(roomName);
    // clearInterval(timerId);
    // timerId = setInterval(getChatRoomMessages, 1000);
  });



}); // end of document ready

