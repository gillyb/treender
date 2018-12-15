$(function() {

  // splash screen
  setTimeout(function() {
    $('.splash-screen').addClass('hidden');
    $('.login-screen').removeClass('hidden');
  }, 2000);

  function moveToNextPage(fullScreenPage) {
    var f = fullScreenPage;
    if (!f.hasClass('full-screen'))
      f = f.parents('.full-screen');
    f.addClass('hidden');
    f.next('.full-screen').removeClass('hidden');
  }

  // homepage
  $('.how-does-it-work.button').click(function() {
    alert('not ready yet...');
  });
  $('.lets-start.button').click(function() {
    $('.login-screen').addClass('hidden');
    $('.trees').removeClass('hidden');
    setupTreeCards();
  });

  // Match options
  $('.button.radio.male, .button.radio.female').click(function() {
    if ($(this).hasClass('selected'))
      $(this).removeClass('selected');
    else
      $(this).addClass('selected');
  });
  $('.match-with .button.continue').click(function() {
    moveToNextPage($(this));
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

});