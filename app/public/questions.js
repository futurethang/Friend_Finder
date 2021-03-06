$(document).ready(function () {

  var questions = [
    "I see myself as extraverted, enthusiastic.",
    // "I see myself as critical, quarrelsome.",
    "I got nipples, can you milk me?",
    "I see myself as dependable, self-disciplined.",
    // "I see myself as anxious, easily upset.",
    "I see myself as open to new experiences, complex.",
    "I'm the sort who's never been up North",
    "I see myself as reserved, quiet.",
    // "I see myself as sympathetic, warm.",
    "I ain't afraid of no ghost."
  ];

  var dom_question = document.getElementById('question_label');
  var answer_selections = document.getElementsByName('radio');
  var user_name = document.getElementById('user_name');
  var imgURL = document.getElementById('imgInp');

  function Friend(name, image) {
    this.name = name;
    this.image = image;
    this.scores = []
  }

  var questionCounter = 0; // global counter to track question progress
  var newFriend = new Friend(); // new Frind created ready for inputs on page load

  $("#submit").one("click", function (e) {
    e.preventDefault();
    var name = user_name.value;
    var image = imgURL.value;
    newFriend.name = name;
    newFriend.image = image;

    hideNameImg();
    unHideRadios();
    friendsQuestions();
  });

  $("#modalClose").on('click', function (e) {
    $("#resultsModal").removeClass("show");
  })

  function unHideRadios() {
    document.getElementById('radio_selections').classList.remove('collapse');
  }

  function hideNameImg() {
    document.getElementById('name_img').classList.add('collapse');
  }

  function friendsQuestions() { // This function cycles through the questions to push all to the score array
    if (questionCounter < questions.length) {
      loadNewQuestion();
      $("#submit").one("click", function (e) {
        e.preventDefault();
        var userSelection = $("input[name=radios]:checked").val();
        newFriend.scores.push(parseInt(userSelection))
        questionCounter++;
        friendsQuestions();
      })
    } else {
      surveyComplete();
    }
  }

  function loadNewQuestion() {
    dom_question.textContent = questions[questionCounter];
  }

  function surveyComplete() { // Here is where I need to send the New Friend data to the apiRoutes to modify friends.json
    // Show the modal with the best match 
    // $("#resultsModal").modal('toggle');
    alert(JSON.stringify(newFriend));
    /// DONE WITH AJAX
    // $.ajax({
    //   type: "POST",
    //   url: "http://localhost:8080/api/friends",
    //   dataType: "json",
    //   data: {"newFriend": "test"},
    //   // success: function (response) {
    //   //   console.log(response);  
    //   // }
    // });
    // / DONE WITH FETCH
    fetch('http://localhost:8080/api/friends', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newFriend),
    }).then(function (promise) {
      }).then(function (result) {
        loadFriendMatchModal();
        console.log(JSON.parse(result));
    })
  };

  function loadFriendMatchModal() {
    $("#resultsModal").addClass("show");
    // get the name of the friend who is a match, currently inside apiRoutes
    // reference the info in that friend's object within friends.json
    // write to a modal container on surveyComplete.html
  }
});