$(document).ready(function() {

 var username;



  var getMessages = function(){
      $.ajax({
      url: "https://api.parse.com/1/classes/chatterbox",
      type: 'GET',
      dataType:'json',
      success: function(data) {
        $('li').remove();
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

  setInterval(getMessages, 1000);

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





$('#login').on('click', function(){
  username = prompt("Enter your username: ")
  $('#login').val('');
  $('#login').text(username);
});

});

// set username
  // click login link
    // alert box comes up to enter username
    // link switches to username
    // username variable in js updated




