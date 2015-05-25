// YOUR CODE HERE:

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

// var parseMessages = function(data) {
//   var messages = data.results;
//   console.log(data);

//   for (var i = 0; i < messages.length; i++) {
//     var username = messages[i].username;
//     var message = messages[i].text;
//     var $textContainer = $('<li class="list-group-item"></li>');
//     $textContainer.text(username +': ' + message);
//     $('.list-group').append($textContainer);
//   }

// };


