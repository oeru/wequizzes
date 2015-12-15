// Widget:Quiz Multiple Choice
var $ = jQuery;
$(function() {
  var i;
  
  function livenQuizzes(n) {
    var i, $q,
        qn = 'mcq' + n,
        rand = [[],[]];
    if ($(this).hasClass('WEquizLive')) return;

    $(this).addClass('WEquizLive');
    $q = $(this).find('ul:first');
    $q.addClass('weQquestion').wrap('<form></form>')
      .children('li').addClass('weQquestion')
      .children('ul').addClass('weQoption')
      .children('li').addClass('weQoption')
      .children('ul').addClass('weQresponse')
      .children('li').addClass('weQresponse');
    $qs = $('li.weQquestion', $q);
    // for each of the questions
    if ($(this).hasClass('WEquizMix')){
      for (i=0; i<$qs.length; ++i) {
        rand.push([]);
        $('li.weQoption', $qs[i]).each(function(ix) {
          var nqn = qn + '_' + i;
          rand[i][ix]='<li class="weQoption"><input type="radio" name="' + nqn + '" id="' + nqn + '_' + ix + '"><label for="' + nqn + '_' + ix + '">' + $(this).html() + '</label></li>';
        });
      }
      for (i=0; i<$qs.length; ++i) {
        rand[i].sort(function(){return Math.random() - 0.5});
        $('li.weQoption', $qs[i]).each(function(iy) {
          $(this).replaceWith(rand[i][iy]);
        });
      }
    } else {
      for (i=0; i<$qs.length; ++i) {
        $('li.weQoption', $qs[i]).each(function(ix) {
          var nqn = qn + '_' + i;
          $(this).replaceWith('<li class="weQoption"><input type="radio" name="' + nqn + '" id="' + nqn + '_' + ix + '"><label for="' + nqn + '_' + ix + '">' + $(this).html() + '</label></li>');
        });
      }
    }
    $('li.weQoption', $q).click(function() {
      $(this).find('ul').show('fast');
    });
  }

  if ($('#WEquizWidgetStyle').length === 0) {
    $('head').append('<style id="WEquizWidgetStyle">'
      + 'ul.weQquestion { margin-left: 1em;}'
      + 'ul.weQquestion li { list-style-type: decimal; list-style-image: none; }'
      + 'ul li.weQoption { list-style-type: none; list-style-image: none;}'
      + 'ul.weQresponse { display: none; }'
      + 'ul li.weQresponse { list-style-type: none; list-style-image: none; }'
      + '</style>');
  }

  $('.WEquizMultipleChoice').each(livenQuizzes);
});

// Widget:Quiz Cloze
$(function() {
  function livenCloze(n) {
    var $us, $q,
        qn = 'cq' + n;
    if ($(this).hasClass('WEquizLive')) return;
    $(this).addClass('WEquizLive');

    if ($('#WEquizWidgetStyle').length === 0) {
      $('head').append('<style id="WEquizWidgetStyle">'
        + 'ul.weQquestion { margin-left: 1em;}'
        + 'ul.weQquestion li { list-style-type: decimal; list-style-image: none; }'
        + 'ul li.weQoption { list-style-type: none; list-style-image: none;}'
        + 'ul.weQresponse { display: none; }'
        + 'ul li.weQresponse { list-style-type: none; list-style-image: none; }'
        + '</style>');
    }
    
    $(this).find('ul:first').addClass('weQquestion').wrap('<form></form>');
    $us = $(this).find('u').each(function(i) {
        var j,
            s = $(this).text().replace(/^\s*/, '').replace(/\s*$/, '').split(/\s+/),
            r = '',
            id = qn + '_' + i;
        for (j=0; j<s.length; ++j) {
          r += '<input type="text" size=10 class="WEquizClozeWord" data-qword="' + s[j].toLowerCase() + '"> ';
        }
        $(this).replaceWith(r);
      }
    );
    $('.WEquizClozeWord').on('blur', function() {
      var all = true,
          caution = $(this).parents('ul').hasClass('WEquizCaution');
      // filled in all the blanks for this question?
      $(this).parents('li').find('input').each(function() {
        if ($.trim($(this).val()) === '') {
          all = false;
        }
      });
      if (all) {
        $(this).parents('li').find('input').each(function() {
          if (caution && ($.trim($(this).val().toLowerCase()).length < $(this).attr("data-qword").length)) {
           $(this).css('background', '#FFCC00'); 
          } else {
            if ($.trim($(this).val().toLowerCase()) == $(this).attr("data-qword")) {
              $(this).css('background', 'LightGreen');
              $(this).attr('disabled', true).unbind('blur'); 
            } else {
              $(this).css('background', 'LightPink');
           }
          } 
        });
      }
    });
  }

  $('.WEquizCloze').each(livenCloze);
});

