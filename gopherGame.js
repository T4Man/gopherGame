$(function(){ //document ready function

//----put user name in the aside---------------------------------
  $('#message1').hide();
  $('#message2').hide();
  function getUserName(){
    var queryString = window.location.search;
    queryString = queryString.substring(1).split('=')[1];
    $('#user').text("Player Name: " + queryString);
  }
  getUserName();
  //--- button same player plays again
  $('#playAgainButton').click(function(){
    window.location.reload(true);
  });
  //--- button new player, new game
  $('#newGameButton').click(function(){
    location.href='start.html';
  });
//----variable to hold user clicks--------------------------------
  var userClicks = 0;
  //display user clicks
  function showClicks(){
    $('#clicks').text("Clicks = " + userClicks);
  }
  showClicks();
//----variable to hold level number------------------------------
  var level = 1;
  //display level on page
  function showLevel(){
    $('#level').text("Level = " + level);
  }
  showLevel();
//----psuedo image array to count number of images in play--------
  var x = ['el'];
//----create starting gopher position-----------------------------
  var gopher = function(){
    var y = Math.round(Math.random())*x.length;
    gopher = y;
  }; gopher();
  console.log(gopher);
//---- this runs when player loses game -------------------------
  var loser = function(){
    $(event.target).effect('pulsate');
    setTimeout(function(){
    $('#message2').show();
    $('#mound').hide();
    $('.images').append('<img class="loser" src="images/caddyGopher.gif" />');
    }, 1000);
  };
//---- this runs when player wins game ---------------------------
  var winner = function(){
    $('#mound').hide();
    $('.images').append('<img class="boom" src="images/csExplosion.gif" />');
    setTimeout(function(){
      $('.boom').hide();
    }, 3500);
    setTimeout(function(){
    $('.images').append('<img class="rise" src="images/flyGopher.gif" />');
    }, 3500);
    setTimeout(function(){
      $('.images').hide();
    }, 8500);
  };
//---core game play function code----------------------------------------------
  //----capture click event on mound image----------------------------
  var playerGuess = function() {
    $('#mound').on('keypress click', function(event){
      var index = $('#mound').index(this);
      var whichMound = $(event.target).index();
      userClicks += 1;
      showClicks();
  //---- level one condition ------------------------------------------
      if (whichMound !== gopher && level === 1) {
        loser();
  //---- level two condition -- show gopher behind bars ---------------
      } else if (whichMound === gopher && level === 2) {
        $(event.target).attr('src', 'images/gopherCartoonSm.gif');
        setTimeout(function(){
          $(event.target).attr('src', 'images/gopherBars.jpg');
        }, 2000);
        setTimeout(function(){
          $(event.target).attr('src', 'images/gopherStaticSm.jpg');
        }, 4000);
        setTimeout(function(){
          addMounds();
          level += 1;
          showLevel();
        }, 4000);
      userClicks = 0;
      showClicks();
        x.push('el', 'el');
        gopher = Math.floor(Math.random()*x.length)+1;
        console.log(gopher);
  //---level five condition -------------------------------------------
      } else if (whichMound === gopher && level === 5) {
          $(event.target).attr('src', 'images/gopherCartoonSm.gif');
          setTimeout(function(){
            $(event.target).effect('explode',{pieces: 512}, 2000);
          }, 2000);
        $('#mound').unbind('click');
         setTimeout (function() {
          winner();
        }, 3500);
  //--- correct guess condition ---------------------------------------
      } else if (whichMound === gopher){
        userClicks = 0;
        showClicks();
        x.push('el', 'el');
        gopher = Math.floor(Math.random()*x.length)+1;
        console.log(gopher);
        $(event.target).attr('src', 'images/gopherCartoonSm.gif');
        setTimeout(function(){
          $(event.target).attr('src', 'images/gopherStaticSm.jpg');
          addMounds();
          level += 1;
          showLevel();
        }, 2200);
  //--- incorrect guess condition --------------------------------------
      } else if (whichMound !== gopher && userClicks === level) {
        loser();
      } else {
        $(event.target).effect('pulsate');
        $('#message1').show();
        setTimeout(function(){
          $('#message1').hide();
        }, 2000);
      }
    });
  };
//----append images to DOM------------------------------------------
  var image = 'images/gopherStaticSm.jpg';
  var mounds = [image, image];
  var addMounds = function(){
    $moundImgs = $('#mound');
    $.each(mounds, function(index, value){
      $('<img />').attr('src', value).appendTo($moundImgs).addClass('selected');
    });
  };
  addMounds();
  playerGuess();
});
