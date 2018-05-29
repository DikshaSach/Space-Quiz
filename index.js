// prevent form from being submitted
$('#quiz-form').on("click", function(e) {
    e.preventDefault();
});
// setting up variables
correctChoice = 0;
var currentQuestionNum = 0; // set to first question
var points = 0;
var totalQuestions = quizQuestions.length;
var forceChoice = null;
var results = null;
var houstonRight = null;
var houstonWrong = null;
var reset = null;

function onQuizStarted() {
  $('#startdiv').hide();
  $('#quiz-form').show();
}

function onQuestionSubmitted() {
  answervalue = $("input[type='radio']:checked").val();
  if (answervalue === undefined) {
      forceChoice.show();
      $('#forcechoicecloser').on('click', function(){
        forceChoice.hide();
      });
  } else {
      if (answervalue === quizQuestions[currentQuestionNum].correctChoice) {
          points++;

          displayScore();
          feedbackgiver();

          nextQuestion();
      } else {
          points === points;
          feedbackgiver();
          nextQuestion();
      }
  }
}

function nextQuestion() {
  if (currentQuestionNum + 1 < quizQuestions.length) {
      currentQuestionNum += 1;
      $('#submit').show();
  } else {
      quizover();
  }
}


function feedbackgiver() {
  var checkedRadio = $("input[type='radio']:checked")
  $('#submit').hide();
  answervalue = checkedRadio.val();
  var correct = quizQuestions[currentQuestionNum].correctChoice;
  var x = document.getElementsByTagName("label")
  if (answervalue === quizQuestions[currentQuestionNum].correctChoice) {
    console.log();
    houstonRight.show();
      checkedRadio.css("color", "green");
      console.log('Question:' + (currentQuestionNum + 1) + ' was Correct.');
      $('#choiceAnsRight').html('CORRECT');
      $('#houstontext1').html('Congrats you got it right!');
      $('#closer1').on('click', function(){
       displayQuestion();
       houstonRight.hide();
      });

  } else {
      
      checkedRadio.css("color", "red");
      console.log('Question:' + (currentQuestionNum + 1) + ' was incorrect.')
      houstonWrong.show();
      $('#choiceAnsWrong').html('WRONG');
      $('#houstontext').html('The correct choice was ' +quizQuestions[currentQuestionNum].answers[correct]);
      $('#closer').on('click', function(){
       displayQuestion();
        houstonWrong.hide();
      });
  }
}

function displayQuestion() {
  var question = quizQuestions[currentQuestionNum].question;
  var choiceAmt = quizQuestions[currentQuestionNum].answers.length;
  $('#quizstat').html(`Question ` + (currentQuestionNum + 1) + ` `);
  $('.quizquestion').text(question);

  $('.answerList').empty();
  var choice;
  for (var i = 0; i < choiceAmt; i++) {
      choice = quizQuestions[currentQuestionNum].answers[i];
      $(` <input type='radio' id="no${i}" name="ansbttns" value=` + i + ` class="option-input"><label for="no${i}" class="testing">` + choice +
          `</label><br/>`).appendTo('.answerList');
  }
}

function resetQuiz() {
  currentQuestionNum = 0;
  correctChoice = 0;
  points = 0;
  hideScore();
  $('#startdiv').show();
  $('#quiz-form').hide();
  displayQuestion();
  reset.hide();
  $("#submit").show();
  quizOver = false;
  displayScore();
}

function displayScore() {
  $('.headerscore').html(`Score: ` + points + `/10`);
}

function displayFinalScore() {
  results.html(`<p>Total Score:  <br>` + (points * 10) + `%</p>`);
  results.show();
  $('#quizquestion').hide();
  $('#answerList').hide()
}

function hideScore() {
   results.hide();
}

function quizover() {
  displayFinalScore();
  $("#submit").hide()
  reset.show().addClass('resetpos');
}
    
$(document).ready(function() {
    forceChoice = $('#force-choice');
    results =  $('#results');
    houstonRight = $('#houstonRight');
    houstonWrong = $('#houstonWrong');
    reset = $('#reset');
    
    results.hide();
    $('#force-choice').hide();
    $('#quiz-form').hide();
    displayQuestion();
    displayScore();
    reset.hide();
    resetQuiz();
    houstonWrong.hide(); 
    houstonRight.hide();
    
    $('#submit').on("click", onQuestionSubmitted);
    $('#startquiz').on('click', onQuizStarted);
    reset.on('click', resetQuiz);
});