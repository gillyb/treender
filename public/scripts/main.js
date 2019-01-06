// DOM elements shuffle plugin
(function($){

  $.fn.shuffle = function() {

    var allElems = this.get(),
      getRandom = function(max) {
        return Math.floor(Math.random() * max);
      },
      shuffled = $.map(allElems, function(){
        var random = getRandom(allElems.length),
          randEl = $(allElems[random]).clone(true)[0];
        allElems.splice(random, 1);
        return randEl;
      });

    this.each(function(i){
      $(this).replaceWith($(shuffled[i]));
    });

    return $(shuffled);

  };

})(jQuery);


$(function() {

  var viewportHeight = $(window).height();
  var headerHeight = $('.trees .header').outerHeight(true);

  function adjustSplashScreenLogo() {
    var logoHeight = parseInt($('.splash-screen .logo').height());
    var heartTop = (viewportHeight / 2) - (logoHeight / 2);
    var logo = $('.splash-screen .logo');
    logo.css('top', heartTop);
  }
  adjustSplashScreenLogo();

  function setTreesImagesHeight() {
    var treeActionsHeight = $('.trees .card-actions').outerHeight(true);
    var treeImagesPadding = parseInt($('#tree-cards ul').css('marginTop')) + parseInt($('#tree-cards ul').css('marginBottom'));
    var treeImagesHeight = viewportHeight - (headerHeight + treeActionsHeight + treeImagesPadding);
    $('#tree-cards li').css('height', treeImagesHeight);
  };



  function hideAllScreens() { $('.full-screen').addClass('hidden'); }
  function showSplashScreen() { hideAllScreens(); $('.full-screen.splash-screen').removeClass('hidden'); }
  function showAboutScreen() { hideAllScreens(); $('.full-screen.who-did-dis').removeClass('hidden'); }
  function showGender() { hideAllScreens(); $('.full-screen.match-with').removeClass('hidden'); }
  function showTrees() { hideAllScreens(); $('.full-screen.trees').removeClass('hidden'); setTreesImagesHeight(); }
  function showWalkthrough() { hideAllScreens(); $('.full-screen.steps').removeClass('hidden'); $('.steps .swipe-container').flickity({ contain: true, prevNextButtons: false }); }

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


  function animateSplashScreen() {
    var heart = $('.splash-screen .top-heart, .splash-screen .bottom-heart');

    var originalLogo = $('.splash-screen .logo');
    var originalPosition = originalLogo.position();

    originalLogo.css({
      'height': originalLogo.height(),
      'position': 'absolute',
      'top': originalPosition.top
    });

    heart.animate({
      'opacity': '0'
    }, 400, function() {
      heart.css({'display': 'none'});
      $('.splash-screen .fade-in').css({'display': 'block'});
      $('.splash-screen .fade-in.inline-block').css({'display': 'inline-block'});

      var logoWrapper = $('.splash-screen .logo-wrapper');

      var finalLogoPosition = parseInt(logoWrapper.css('marginTop')) + parseInt(logoWrapper.css('paddingTop')) + (logoWrapper.height() - originalLogo.height()) / 2;

      var scaleValue = 50 / originalLogo.width();
      originalLogo.animate({
        'transform': 'translateY(-' + (originalPosition.top - finalLogoPosition) + 'px) scale(' + scaleValue + ')'
      }, 1000, function() {
        $('.splash-screen .fade-in').css({'opacity': '1'});
      });
    });
  }

  setTimeout(function() {
    animateSplashScreen();
  }, 400);

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

  $('.button.start-over').click(function() {
    window.location.reload();
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
      doneCallback: function() {
        $('.full-screen.trees .cards-area-wrapper').addClass('hidden');
        $('.full-screen.trees .empty-message').css('opacity', 1);
      },
      animationRevertSpeed: 200,
      animationSpeed: 200,
      threshold: 1,
      likeSelector: '.like',
      dislikeSelector: '.dislike'
    });
    $('.card-actions .like, .card-actions .dislike').click(function(e){
      e.preventDefault();
      $("#tree-cards").jTinder($(this).attr('class'));
    });
  }

});