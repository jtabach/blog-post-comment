

var ref = new Firebase('https://blog-post-data.firebaseio.com/');

var questionsRef = ref.child('questions');
var $question, $questions;

$(document).ready(function() {
	$questions = $('#questions');
	$('#addQuestion').click(addQuestion);
	// $('body').on('click', '.delete', deleteContact);
});

function addQuestion() {
	var question = {};
	question.title = $('#title').val();
	question.date = Date.now() + "";
	questionsRef.push(question);
}

questionsRef.on('value', function(snap) {
	$questions.empty();
	snap.forEach(function(child) {
		console.log(child.val().title);
		var $title = $('<li>').text(child.val().title);
		var $date = $('<li>').text(child.val().date);
		$questions.append($title).append($date);
	});
});
