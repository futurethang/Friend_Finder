
var questions = [
  "I see myself as extraverted, enthusiastic.",
  "I see myself as critical, quarrelsome.",
  "I see myself as dependable, self-disciplined.",
  "I see myself as anxious, easily upset.",
  "I see myself as open to new experiences, complex.",
  "I see myself as reserved, quiet.",
  "I see myself as sympathetic, warm."
];

var dom_question = document.getElementById('question_label');
var answer_selections = document.getElementsByName('radio');
var user_name = document.getElementById('user_name');
var imgURL = document.getElementById('imgInp');

function Friend(name, image) {
  this.name = name;
  this.image = image;
  this.score = []
}

var newFriend = new Friend(); // this might need to be created more globally on page load

$("#submit").one("click", function (e) {
  e.preventDefault();
  var question = dom_question.textContent;
  var userSelection = $("input[name=radios]:checked").val(); // this belongs in a Qs taking function
  var name = user_name.value;
  var image = imgURL.value;
  newFriend.name = name;
  newFriend.image = image;

  console.log(newFriend);
  
  hideNameImg();
  unHideRadios();
  friendsQuestions();
});


// page loads only show ask for name and img url
// on submit create newFriend object
// on submit, unhide the question and selection boxes
function unHideRadios() {
  document.getElementById('radio_selections').classList.remove('collapse');
}

function hideNameImg() {
  document.getElementById('name_img').classList.add('collapse');
}

var counter = 0;
function friendsQuestions() {   
  while (counter < questions.length) {
    dom_question.textContent = questions[counter];
    $("#submit").one("click", function (e) {
      e.preventDefault();
      var userSelection = $("input[name=radios]:checked").val();
      newFriend.score.push(userSelection)
      console.log(newFriend);
      // $("#submit").removeEventListener("click");
      counter++;
      friendsQuestions();
    })
    break;
  }
  
} // This function cycles through the questions to push all to the score array

// load question and 'submit' listener
function loadNewQuestion() { }
// submit pushes selection to Freind.score arr

// reload DOM with new question
// reset listener