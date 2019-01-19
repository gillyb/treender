window.treeImages = [
  "images/trees/dekel1.jpg",
  "images/trees/hadar1.jpg",
  "images/trees/hadar2.jpg",
  "images/trees/hadas1.jpg",
  "images/trees/arava1.jpg",
  "images/trees/ella1.jpg",
  "images/trees/klilhachoresh01.jpg",
  "images/trees/moran1.jpg",
  "images/trees/shaked1.jpg",
  "images/trees/shikma1.jpg",
  "images/trees/shaked1.jpg",
  "images/trees/shaked2.jpg",
  "images/trees/tooti1.jpg",
  "images/trees/tamar1.jpg",
  "images/trees/tamar3.jpg",
  "images/trees/oren1.jpg",
  "images/trees/alon1.jpg",
  "images/trees/ilan1.jpg",
  "images/trees/ilan-the-doll.jpg",
  "images/trees/erez1.jpg",
  "images/trees/eshel1.jpg",
  "images/trees/dolev1.jpg",
  "images/trees/ashor1.jpg",
  "images/trees/bonsai.jpg"];

function showAllTrees() {
  console.log('Displaying trees');
  var treeImages = document.querySelectorAll('#tree-cards .card-wrapper .img');
  for (var j = treeImages.length-1; j>=0; j--) {
    treeImages[j].parentElement.parentElement.classList.remove('invisible');
  }
}

function preloadImages() {
  var loadedCounter = 0;
  for (var i=0; i<window.treeImages.length; i++) {
    var a = document.createElement('img');
    a.onload = function() {
      if (++loadedCounter === window.treeImages.length) {
        showAllTrees();
      }
    };
    a.onerror = function() {
      if (++loadedCounter === window.treeImages.length) {
        showAllTrees();
      }
    };
    a.setAttribute('src', window.treeImages[i]);
  }
}
preloadImages();



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

  $('.hacks').addClass('hidden');

  savePageState({ home: true }, 'home', '/');

  var treeImagesHeight;
  var headerHeight = $('.trees .header').outerHeight(true);

  // function preloadImages() {
  //   var loadedCounter = 0;
  //   var treeImages = [
  //   "images/trees/dekel1.jpg",
  //   "images/trees/hadar1.jpg",
  //   "images/trees/hadar2.jpg",
  //   "images/trees/hadas1.jpg",
  //   "images/trees/arava1.jpg",
  //   "images/trees/ella1.jpg",
  //   "images/trees/klilhachoresh01.jpg",
  //   "images/trees/moran1.jpg",
  //   "images/trees/shaked1.jpg",
  //   "images/trees/shikma1.jpg",
  //   "images/trees/shaked1.jpg",
  //   "images/trees/shaked2.jpg",
  //   "images/trees/tooti1.jpg",
  //   "images/trees/tamar1.jpg",
  //   "images/trees/tamar3.jpg",
  //   "images/trees/oren1.jpg",
  //   "images/trees/alon1.jpg",
  //   "images/trees/ilan1.jpg",
  //   "images/trees/ilan-the-doll.jpg",
  //   "images/trees/erez1.jpg",
  //   "images/trees/eshel1.jpg",
  //   "images/trees/dolev1.jpg",
  //   "images/trees/ashor1.jpg",
  //   "images/trees/bonsai.jpg"];
  //   for (var i=0; i<treeImages.length; i++) {
  //     var a = $('<img />');
  //     a.one('load', function() {
  //       if (++loadedCounter === treeImages.length) {
  //         console.log('Displaying trees');
  //         var treeImages = $('#tree-cards .card-wrapper .img');
  //         treeImages.reverse().forEach(function() {
  //           $(this).parents('.invisible').removeClass('invisible');
  //         });
  //       }
  //     });
  //     a.attr('src', treeImages[i]);
  //   }
  // }
  // preloadImages();

  function openInfoButton(treeCard) {
    var wrapper = treeCard.parents('.card-wrapper');
    var surround = treeCard.parents('li');
    var treeDetails = wrapper.find('.tree-details');
    var treeName = treeDetails.find('.name');
    var infoButton = treeDetails.find('.info');
    var closeInfoButton = treeDetails.find('.close');
    var treeDescription = treeDetails.find('.description');

    wrapper.css({
      'background-color': '#fff',
      'overflow-y': 'scroll'
    });
    treeDescription.css({
      'position': 'relative',
      'color': '#444',
      'opacity': 1
    }).removeClass('invisible');
    surround.css('top', 0);
    surround.css('height', treeImagesHeight + 20);

    infoButton.addClass('hidden');

    $('.card-actions').addClass('bordered');
    treeName.css('color', '#444');
    treeDetails.addClass('full');

    requestAnimationFrame(function() {
      var treeDetailsHeight = treeDetails.outerHeight(true);
      wrapper.find('.img').animate({
        'top': -1 * treeDetailsHeight,
        'scrollTop': wrapper.height()
      }, 300, function() {
        closeInfoButton.addClass('active');
        closeInfoButton.one('click', function(ev) {
          ev.stopPropagation();
          ev.preventDefault();

          treeCard.removeClass('active');
          closeInfoButton.removeClass('active');
          $('.card-actions').removeClass('bordered');
          infoButton.removeClass('hidden');
          treeName.css('color', '#fff');
          treeDescription.css({
            'position': 'absolute',
            'color': 'transparent',
            'opacity': 0
          });
          surround.css({
            'height': treeImagesHeight,
            'top': 8
          });
          wrapper.find('.img').animate({
            'top': 0
          }, 300, function() { });
          setTimeout(function() {
            treeDetails.removeClass('full');
          }, 300);
        });
      });
    });
  }

  function bindInfoButton() {
    $('.tree-details .name, .tree-details .age, .tree-details .info').on('click', function() {
      pageEvent('open info', 'trees', 'info');  // TODO: maybe we can send the specific tree?
      openInfoButton($(this));
    });
  }

  function setTreesImagesHeight() {
    var treesViewportHeight = $('.trees.full-screen').height();
    var treeActionsHeight = $('.trees .card-actions').outerHeight(true);
    var treeImagesPadding = parseInt($('#tree-cards ul').css('marginTop')) + parseInt($('#tree-cards ul').css('marginBottom'));
    treeImagesHeight = treesViewportHeight - (headerHeight + treeActionsHeight + treeImagesPadding);
    $('#tree-cards li').css('height', treeImagesHeight);
  }


  function hideAllScreens() { $('.full-screen').addClass('hidden'); }
  function showSplashScreen() { hideAllScreens(); $('.full-screen.splash-screen').removeClass('hidden'); }
  function showAboutScreen() {
    hideAllScreens();
    $('.full-screen.who-did-dis').removeClass('hidden');
    savePageState({ about: true }, 'about', '/about');
    pageView('about', '/about');
  }
  function showGender() {
    hideAllScreens();
    $('.full-screen.match-with').removeClass('hidden');
    pageView('choose gender', '/choose-gender');
  }
  function showChat() {
    hideAllScreens();
    $('.full-screen.chat').removeClass('hidden');
    savePageState({ chat: true }, 'chat', '/chat');
    pageView('chat', '/chat');
    $('.full-screen.chat .header .logo').one('click', function() {
      hideAllScreens();
      $('.full-screen.trees').removeClass('hidden');
    });
  }
  function showTrees() {
    hideAllScreens();
    savePageState({ trees: true }, 'trees', '/trees');
    $('#tree-cards ul li').shuffle();
    var treesScreen = $('.full-screen.trees');
    treesScreen.removeClass('hidden');
    if (!$('.match-with .button.radio.male').hasClass('selected'))
      treesScreen.find('.male').addClass('hidden');
    if (!$('.match-with .button.radio.female').hasClass('selected'))
      treesScreen.find('.female').addClass('hidden');
    setTreesImagesHeight();
    bindInfoButton();

    // show tutorial for first time around
    $('#tree-cards ul li:not(.hidden):last').addClass('tutorial no-swipe');
    $('#tree-cards li.tutorial').one('click', function() {
      openInfoButton($(this).find('.info-button'));
      $(this).removeClass('tutorial no-swipe');
    });

    pageView('trees', '/trees');
  }
  function showWalkthrough() {
    hideAllScreens();
    savePageState({ walkthrough: true }, 'walkthrough', '/walkthrough');
    $('.full-screen.steps').removeClass('hidden');
    var carousel = $('.steps .swipe-container').flickity({ contain: true, prevNextButtons: false });
    carousel.on( 'change.flickity', function( event, index ) {
      if (index === 1) {
        setTimeout(function () {
          $('.full-screen.steps .step-3 .tree-image .tree-heart, .full-screen.steps .step-3 .like').addClass('swiped');
        }, 600);
      }
    });
    pageView('walkthrough', '/walkthrough');
  }


  function animateSplashScreen() {
    var originalLogo = $('.splash-screen .logo');

    originalLogo.addClass('scale-out-center');

      $('.splash-screen .fade-in').css({'display': 'flex'});
      $('.splash-screen .fade-in.inline-block').css({'display': 'inline-block'});

      setTimeout(function() {
        $('.splash-screen .logo').css('display', 'none');
        $('.splash-screen .fade-in').css({'opacity': '1'});
      }, 800);
  }

  setTimeout(function() {
    animateSplashScreen();
  }, 1200);


  // homepage
  $('.how-does-it-work.button').click(function() {
    showWalkthrough();
  });
  $('.lets-start.button').click(function() {
    showGender();
  });
  $('.who-did-dis.link, .who-did-dis.button').click(function() {
    showAboutScreen();
  });

  // choosing gender match
  $('.match-with .continue').click(function() {
    if (!$('.match-with .button.radio.male').hasClass('selected') && !$('.match-with .button.radio.female').hasClass('selected'))
      return;
    showTrees();
    setupTreeCards();

    // make the trees visible now (small delay so rendering isn't messed up)
    // setTimeout(function() {
    //   $('#tree-cards ul li').removeClass('invisible');
    // }, 200);
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

  $('.button.start-over, .empty-message .start-over').click(function() {
    window.location.reload();
  });

  // header buttons
  $('.full-screen .header .chat-icon').click(function() {
    showChat();
  });

  // treender cards
  function setupTreeCards() {
    $("#tree-cards").jTinder({
      // dislike callback
      onDislike: function (item) {
        pageEvent('like', 'swipe', 'like');
      },
      // like callback
      onLike: function (item) {
        pageEvent('like', 'swipe', 'like');
      },
      doneCallback: function() {
        pageEvent('swiped all', 'trees', 'done');

        $('.full-screen.trees .cards-area-wrapper').addClass('hidden');
        $('.full-screen.trees .empty-message').removeClass('hidden');
        requestAnimationFrame(function() {
          $('.full-screen.trees .empty-message').css('opacity', 1);
        });
      },
      startDragEvent: function(card) {
        $('.card-actions').removeClass('bordered');
        card.find('.card-wrapper').css('background-color', 'transparent');
        card.css('top', '8px');
        card.css('height', treeImagesHeight);
        card.find('.tree-details .name').css('color', '#fff');
        card.find('.img').css('top', '0');
        card.find('.tree-details .description')
          .css({
            'opacity': 0,
            'position': 'absolute'
          }).addClass('invisible');
        card.find('.tree-details .info-button .close').removeClass('active');
        card.find('.tree-details .info-button .info').removeClass('hidden');
        setTimeout(function() {
          card.find('.tree-details').removeClass('full');
        }, 300);

      },
      endDragEvent: function(card) {
        // debugger;
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


  // NAVIGATION //
  function savePageState(obj, pageName, pageUrl) {
    try {
      window.history.pushState(obj, pageName, pageUrl);
      window.onpopstate = function(event) {
        var state = event.state;
        if (state.home) {
          showSplashScreen();
          return;
        }
        if (state.trees) {
          hideAllScreens();
          $('.full-screen.trees').removeClass('hidden');
          return;
        }
        if (state.walkthrough) {
          showWalkthrough();
          return;
        }
        if (state.chat) {
          showChat();
          return;
        }
        if (state.about) {
          showAboutScreen();
          return;
        }
      };
    }
    catch (e) {
      // do nothing...
    }
  }


  // ANALYTICS //
  function pageView(title, url) {
    try {
      gtag('config', 'UA-132268378-1', {
        'page_title': title,
        'page_path': url
      });
    }
    catch (e) {
      // do nothing...
    }
  }
  function pageEvent(action, category, label) {
    try {
      gtag('event', action, {
        'event_category': category,
        'event_label': label
      });
    }
    catch (e) {
      // do nothing...
    }
  }


  // Desktop size calculations //

  var imgWidth = 4000;
  var imgHeight = 2592;
  var imgRatio = imgWidth / imgHeight;  // 1.543
  var phoneWidthPercent = 0.227;        // Percent of width of phone out of the image
  var phoneHeightPercent = 0.619;       // Percent of height of phone out of full height of image
  var originalPhoneFromTop = 130;       // distance of phone from top of the screen
  var originalMarginLeft = -141;

  var windowWidth = $(window).width();
  var isDesktop = windowWidth > 768;

  function calculatePhoneSize() {
    // Desktop image calculations

    var viewportHeight = $(window).height();
    var viewportWidth = $(window).width();
    var viewportRatio = viewportWidth / viewportHeight;

    var targetWidth, targetHeight;
    var targetPhoneTop, targetPhoneLeft;

    if (viewportRatio > imgRatio) {
      targetWidth = viewportWidth;
      targetHeight = targetWidth / imgRatio;

      targetPhoneTop = originalPhoneFromTop - ((targetHeight - viewportHeight) / 2.775);
      targetPhoneLeft = (originalMarginLeft - (((targetHeight - viewportHeight) / imgRatio)) / 4);
    }
    else {
      targetHeight = viewportHeight;
      targetWidth = targetHeight * imgRatio;

      targetPhoneTop = originalPhoneFromTop;
      targetPhoneLeft = originalMarginLeft;
    }

    // use targetWidth and targetHeight to get position of phone
    var targetPhoneWidth = targetWidth * phoneWidthPercent;
    var targetPhoneHeight = targetHeight * phoneHeightPercent;

    $('.full-screen').css({
      'width': targetPhoneWidth,
      'height': targetPhoneHeight,
      'top': targetPhoneTop,
      'margin-left': targetPhoneLeft
    });
  }

  if (isDesktop) {
    calculatePhoneSize();

    var sleeper = false;
    $(window).on('resize', function() {
      if (sleeper) {
        return;
      }
      sleeper = true;
      setTimeout(function() {
        calculatePhoneSize();
        sleeper = false;
      }, 100);
    });
  }

});