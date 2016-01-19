var ref = new Firebase('https://blog-post-data.firebaseio.com/');
var questionsRef = ref.child('questions');
var $question, $questions, $comment, $comments;
var answersRef;
$(document).ready(function() {
	$questions = $('#questions');
	$('#addQuestion').click(addQuestion);
	$('body').on('click', '.readMore', readMore);
	$('body').on('click', '.comments', comment);
});

function addQuestion() {
	var question = {};
	question.title = $('#title').val();
	question.description = $('#description').val();
	question.date = Date.now();
	questionsRef.push(question);
	$('form').trigger('reset');
}

questionsRef.on('value', function(snap) {
	$questions.empty();
	snap.forEach(function(child) {
		var $link = $('<a>').text(' Read More').addClass('readMore');
		var date = moment(child.val().date).format('LLL');
		var $title = $('<li>').text(child.val().title + ", " + date).attr('uid', child.key());
		$title.append($link);
		$questions.append($title);
	});
});

function readMore() {
	$('#full').empty();
	var $this = $(this);
	var uid = $this.parent().attr('uid');
	var descr;
	var title;
	var text = $this.parent().text()
	questionsRef.once('value', function(snap){
		descr = snap.child(uid).val().description;
		title = snap.child(uid).val().title;
	});
	var $h1 = $('<h1>').text(title);
	var $p = $('<p>').text("Description: " + descr);
	var $button = $('<button>').text('comment').addClass('comments').attr('uid', uid);
	var $input = $('<input>').attr('id', 'commenting');
	var $div = $('<div>').attr('id', 'divme');
	$('#full').append($h1).append($p).append($input).append($button).append($div);
	answersRef = questionsRef.child(uid).child('comments');
	comment();
}

function comment() {
	if ($('#commenting').val() !== "") {
		var answer = {};
		answer.text = $('#commenting').val();
		answer.date = moment(Date.now()).format('LLL');
		answersRef.push(answer);
	}
	$('#commenting').val("");
	var $divme = $('#divme');
	answersRef.on('value', function(snap) {
		$divme.empty();
		snap.forEach(function(com) {
			var $p = $('<p>').text(com.val().text);
			var $span = $('<span>').text(" " + com.val().date).addClass('small');
			$p.append($span);
			$divme.append($p);
		});
	});
}