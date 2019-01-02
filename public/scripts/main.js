$(function() {

  function hideAllScreens() { $('.full-screen').addClass('hidden'); }
  function showSplashScreen() { hideAllScreens(); $('.full-screen.splash-screen').removeClass('hidden'); }
  function showAboutScreen() { hideAllScreens(); $('.full-screen.who-did-dis').removeClass('hidden'); }
  function showGender() { hideAllScreens(); $('.full-screen.match-with').removeClass('hidden'); }
  function showTrees() { hideAllScreens(); $('.full-screen.trees').removeClass('hidden'); }
  function showWalkthrough() { hideAllScreens(); $('.full-screen.how-this-works-1').removeClass('hidden'); }

  var step1 = $('.full-screen.how-this-works-1');
  var step2 = $('.full-screen.how-this-works-2');
  var step3 = $('.full-screen.how-this-works-3');
  var step4 = $('.full-screen.how-this-works-4');

  function stepForward() {
    if (!step1.hasClass('hidden')) {
      hideAllScreens();
      step2.removeClass('hidden');
    }
    else if (!step2.hasClass('hidden')) {
      hideAllScreens();
      step3.removeClass('hidden');
    }
    else if (!step3.hasClass('hidden')) {
      hideAllScreens();
      step4.removeClass('hidden');
    }
  }
  function stepBack() {
    if (!step1.hasClass('hidden')) {
      hideAllScreens();
      showSplashScreen();
    }
    else if (!step2.hasClass('hidden')) {
      hideAllScreens();
      step1.removeClass('hidden');
    }
    else if (!step3.hasClass('hidden')) {
      hideAllScreens();
      step2.removeClass('hidden');
    }
    else {
      hideAllScreens();
      step3.removeClass('hidden');
    }
  }


  // splash screen
  setTimeout(function() {
    const heart = $('.splash-screen .top-heart, .splash-screen .bottom-heart');

    const originalLogo = $('.splash-screen .logo');
    const originalPosition = originalLogo.position();

    originalLogo.css({
      'height': originalLogo.height(),
      'position': 'absolute',
      'top': originalPosition.top
    });

    heart.animate({
      'opacity': '0'
    }, 1000, function() {
      heart.css({'display': 'none'});
      $('.splash-screen .fade-in').css({'display': 'block'});

      const logoWrapper = $('.splash-screen .logo-wrapper');

      const finalLogoPosition = parseInt(logoWrapper.css('marginTop')) + parseInt(logoWrapper.css('paddingTop')) + (logoWrapper.height() - originalLogo.height()) / 2;

      originalLogo.animate({
        'top': finalLogoPosition,
        'width': '70px'
      }, 1000, function() {
        $('.splash-screen .fade-in').css({'opacity': '1'});
      });
    });
  }, 2000);

  $('.go-home').click(function() {
    showSplashScreen();
  });


  // homepage
  $('.how-does-it-work.button').click(function() {
    showWalkthrough();
  });
  $('.lets-start.button').click(function() {
    showGender();
  });
  $('.who-did-dis.link').click(function() {
    showAboutScreen();
  });

  // choosing gender match
  $('.match-with .continue').click(function() {
    if (!$('.match-with .button.radio.male').hasClass('selected') && !$('.match-with .button.radio.female').hasClass('selected'))
      return;
    showTrees();
    setupTreeCards();
  });

  // who did dis
  $('.back.link').click(function() {
    showSplashScreen();
  });

  // Match options
  $('.button.radio.male, .button.radio.female').click(function() {
    if ($(this).hasClass('selected'))
      $(this).removeClass('selected');
    else {
      $(this).addClass('selected');
      $('.match-with .button.continue').removeClass('disabled').addClass('primary');
    }

    if (!$('.button.radio.male').hasClass('selected') && !$('.button.radio.female').hasClass('selected')) {
      $('.match-with .button.continue').removeClass('primary').addClass('disabled');
    }
  });

  // treender cards
  function setupTreeCards() {
    $("#tree-cards").jTinder({
      // dislike callback
      onDislike: function (item) {
        // set the status text
        $('#status').html('Dislike image ' + (item.index() + 1));
      },
      // like callback
      onLike: function (item) {
        // set the status text
        $('#status').html('Like image ' + (item.index() + 1));
      },
      animationRevertSpeed: 200,
      animationSpeed: 400,
      threshold: 1,
      likeSelector: '.like',
      dislikeSelector: '.dislike'
    });
    $('.card-actions .like, .card-actions .dislike').click(function(e){
      e.preventDefault();
      $("#tree-cards").jTinder($(this).attr('class'));
    });
  }




  // tutorial steps


  var touchStart = false;
  var xStart = 0, yStart = 0;
  var swipeThreshold = 1;

  var handleSwipe = function(ev) {
    ev.preventDefault();

    switch (ev.type) {
      case 'touchstart':
        if (touchStart === false) {
          touchStart = true;
          xStart = ev.originalEvent.touches[0].pageX;
          yStart = ev.originalEvent.touches[0].pageY;
        }
      case 'mousedown':
        if(touchStart === false) {
          touchStart = true;
          xStart = ev.pageX;
          yStart = ev.pageY;
        }
      case 'mousemove':
      case 'touchmove':
        break;
      case 'mouseup':
      case 'touchend':
        touchStart = false;
        var pageX = (typeof ev.pageX == 'undefined') ? ev.originalEvent.changedTouches[0].pageX : ev.pageX;
        var pageY = (typeof ev.pageY == 'undefined') ? ev.originalEvent.changedTouches[0].pageY : ev.pageY;
        var deltaX = parseInt(pageX) - parseInt(xStart);
        var deltaY = parseInt(pageY) - parseInt(yStart);

        // posX = deltaX + lastPosX;
        // posY = deltaY + lastPosY;
        var opa = Math.abs((Math.abs(deltaX) / swipeThreshold) / 100 + 0.2);

        if (opa >= 1) {
          if (deltaX > 0) {
            // swiped right - move back
            // TODO: implement scroll
            stepBack();
          } else {
            // swiped left - move forward
            // TODO: implement scroll
            stepForward();
          }
        }
        break;
    }
  };


  var steps = $('.full-screen.steps .swipe-area');
  $(steps).bind('touchstart mousedown', handleSwipe);
  $(steps).bind('touchmove mousemove', handleSwipe);
  $(steps).bind('touchend mouseup', handleSwipe);

});