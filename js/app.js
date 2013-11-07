function BookQuiz () {

  /* private vars */

  var at_last     = { title: "At Last", author: "Edward St. Aubyn", img: "at_last.jpg" };
  var bloodland   = { title: "Bloodland", author: "Alan Glynn", img: "bloodland.jpg" };
  var wind_up     = { title: "The Wind Up Bird Chronicle", author: "Haruki Murakami", img: "wind_up.jpg" };
  var by_blood    = { title: "By Blood", author: "Ellen Ullman", img: "by_blood.jpg" };
  var infinite    = { title: "Infinite Jest", author: "David Foster Wallace", img: "infinite.jpg" };
  var cascade     = { title: "Cascade", author: "Maryanne O'Hara", img: "cascade.jpg" };
  var girl_land   = { title: "Girl Land", author: "Caitlin Flanagan", img: "girl_land.jpg" };
  var hemlock     = { title: "Hemlock Grove", author: "Brian McGreevy", img: "hemlock_grove.jpg" };
  var hope        = { title: "Hope: A Tragedy", author: "Shalom Auslander", img: "hope.jpg" };
  var m_before_u  = { title: "Me Before You", author: "Jojo Moyes", img: "me_before_you.jpg" };
  var life_of_pi  = { title: "Life of Pi", author: "Yann Martel", img: "pi.png" };
  var oblivion    = { title: "Oblivion: A Memoir", author: "Hector Abad", img: "oblivion.jpg" };
  var accident    = { title: "The Teleportation Accident", author: "Ned Beauman", img: "accident.jpg" };
  var investigate = { title: "The Investigation", author: "Philippe Claudel", img: "the_investigation.jpg" };
  var the_bug     = { title: "The Bug", author: "Ellen Ullman", img: "the_bug.jpg" };

  var books = [at_last,infinite,bloodland,wind_up,by_blood,cascade,girl_land,hemlock,hope,m_before_u,life_of_pi,oblivion,accident,the_bug,investigate];

  var question1 = { answer: m_before_u, review: "<i>A Love Story</i> for this generation, this book brings to life two people who couldn't have less in common - a heartbreakingly romantic novel that asks, What do you do when making the person you love happy also means breaking your own heart?"};
  var question2 = { answer: life_of_pi, review: "A Hindu, a Muslim and a Christian are trapped on a lifeboat for 227 days with a 450-pound Bengal tiger. It sounds suspiciously like the setup of a joke, something you might hear at a tavern from the guy who's been downing gimlets all night. But this extraordinary novel based on this very premise, is hardly your average barroom gag."};
  var question3 = { answer: infinite, review: "A gargantuan, mind-altering comedy about the pursuit of happiness in America. Set in an addicts' halfway house and a tennis academy, and featuring the most endearingly screwed-up family to come along in recent fiction, this book explores essential questions about what entertainment is and why it has come to so dominate our lives; about how our desire for entertainment affects our need to connect with other people; and about what the pleasures we choose say about who we are."};
  var question4 = { answer: cascade, review: "Fans of Richard Russo, Amor Towles, Sebastian Barry, and Paula McLain will devour this transporting novel about the eternal tug between our duties and our desires, set within the context of the Depression, NYC during Roosevelt's New Deal era, and the approaching World War."};
  var question5 = { answer: the_bug, review: "This book breaks new ground in literary fiction, offering us a deep look into the internal lives of people in the technical world. Set in a start-up company in 1984, this highly acclaimed novel explores what happens when a baffling software flaw so teasing it is named The Jester, threatens the survival of the humans beings who created it."};

  var questions = [question1,question2,question3,question4,question5];
  
  var index = 0;
  var curr_question = questions[this.index];
  var curr_book = null;

  var correct = 0; 

  /* private methods */ 

  var fill_book_choices = function () {

    for ( var ii = 0; ii < books.length; ii++ ) {
      var book = books[ii];
      var html = '<label><input type="radio" name="books"><img src="img/' + book.img + '""></label>';
      $('#choices').append(html);
    }
  }

  /* public methods */ 

  this.init = function () {
    fill_book_choices();
    $('#book-selector').hide();
    this.start_quiz();
  }  


  this.start_quiz = function () {
    index = 0; 
    correct = 0; 
    this.next_question();

    $("button#next").html("Next Question");
  }

  this.render_question = function (num) {
    curr_question = questions[num];

    $('#cover').attr('src','img/book.png');
    $('#title').html('<span class="highlight">Title</span>');
    $('#author').html('<span class="highlight">Author</span>');
    $('#review').html(curr_question.review);

    // show the right buttons
    $('#next, #again').hide();
    $('#submit').show();

    // uncheck last selection 
    $('input[type="radio"]:checked').prop('checked', false);

    // update the count
    $('#count').html( ( num + 1 ) + ' / ' + questions.length);

    // clear any message 
    this.clear_message();
  }

  this.next_question = function () {
    curr_book = null;
    this.render_question(index);

    index++; 

    if ( this.last_question() ) {
      $("#next").html("See My Score");
    }
  }

  this.last_question = function () {
    return ( index === questions.length );
  }

  this.select_book = function ( num ) {
    curr_book = books[num];

    $('#cover').attr('src','img/' + curr_book.img);
    $('#title').html(curr_book.title);
    $('#author').html(curr_book.author);
  }

  this.test_answer = function () {

    if ( curr_book === curr_question.answer ) {
      this.show_message("That is the correct book","success checkmark")
      $('button#again').hide(); 
      correct++; 
    } else {
      this.show_message("That is the not the right book","warning xmark")
      $('#cover').effect( "shake" );
      $('button#again').show(); 
    }

    $('button#submit').hide();
    $('button#next').show();

  }

  this.answered_correctly = function () {
    return $('button#again').is(':hidden') && $('button#submit').is(':hidden');
  }

  this.selected_a_book = function () {
    return curr_book != null;
  }

  this.show_message = function (text, text_class) {
    $('#message').html("<p class='" + text_class + "''>" + text + "</p>")
  }

  this.clear_message = function () {
    $('#message p').remove();
  }

  this.show_results = function () {
    $("#results p").html("You matched " + correct + " of " + questions.length + " books correctly");
  }

  this.init();

}

$(document).ready(function(){

  var quiz = new BookQuiz();

  $('#book-selector').click(function(){
    $(this).fadeOut('fast');
    quiz.clear_message();
  })

  $('#cover, #title, #author').click(function(){
    if ( ! quiz.answered_correctly() ) {
      $('#book-selector').fadeIn('fast');
    }
  })

  $('input[type=radio]').click(function(){
    var selection = $('input[type=radio]').index(this);
    quiz.select_book(selection);
  })

  $('#submit, #again').click(function() {
    if ( quiz.selected_a_book() ) {
      quiz.test_answer();
    } else {
      quiz.show_message('Please select a book for this review','warning');
    }
  })

  $('#next').click(function(){
    if ( quiz.last_question() ) {
      quiz.show_results();
      $("#results").fadeIn('fast');
    } else {
      quiz.next_question();
    }
  })

  $("#restart").click(function(){
    $('#results').fadeOut('fast');
    quiz.start_quiz();     
  });


})