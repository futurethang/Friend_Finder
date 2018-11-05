alert("js loaded");

var questions = {
  1 : "I see myself as extraverted, enthusiastic.",
  2 : "I see myself as critical, quarrelsome.",
  3 : "I see myself as dependable, self-disciplined.",
  4 : "I see myself as anxious, easily upset.",
  5 : "I see myself as open to new experiences, complex.",
  6 : "I see myself as reserved, quiet.",
  7 : "I see myself as sympathetic, warm."
}

var dom_question = document.getElementById('question_label');
var answer_selections = document.getElementsByName('radio');

$("#submit").on("click", function () {
  console.log(dom_question + answer_selections);
});