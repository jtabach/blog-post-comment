

var ref = new Firebase('https://blog-post-data.firebaseio.com/');
var questionsRef = ref.child('questions');
var $question, $questions, $comment, $comments;

$(document).ready(function() {
	$questions = $('#questions');
	$('#addQuestion').click(addQuestion);
	$('body').on('click', '.readMore', readMore);
	$('body').on('click', '.comment', comment);
});

function addQuestion() {
	var question = {};
	question.title = $('#title').val();
	question.description = $('#description').val();
	question.date = Date.now();
	questionsRef.push(question);
}

questionsRef.on('value', function(snap) {
	$questions.empty();
	snap.forEach(function(child) {
		// console.log(child.val().title);
		// console.log(child.val().date);
		var $link = $('<a>').text(' Read More').addClass('readMore');
		var date = moment(child.val().date).format('LL');
		var $title = $('<li>').text(child.val().title + ", " + date).attr('uid', child.key());
		$title.append($link);
		$questions.append($title);
	});
});

function readMore() {
	$('#full').empty();

	for (var key in questionsRef) {
		// console.log(key);
	}
	var $this = $(this);
	var uid = $this.parent().attr('uid');
	
	var $descr;
	var text = $this.parent().text()
	questionsRef.once('value', function(snap){
		snap.forEach(function(yy) {
			$descr =  yy.val().description;
		});
	});
	console.log($descr);
	var $h1 = $('<h1>').text(text);
	var $p = $('<p>').text($descr);
	var $button = $('<button>').text('comment').addClass('comment').attr('uid', uid);
	var $input = $('<input>').attr('id', 'commenting');
	$('#full').append($h1).append($p).append($input).append($button);
}

function comment() {
	var answer = {};
	var uid = $(this).attr('uid');
	// console.log($(this).attr('uid'));
	var answersRef = questionsRef.child(uid).child('comments');
	answer.text = $('#commenting').val();

	answersRef.push(answer);
	$comments = $('.comments');
	answersRef.on('value', function(snap) {
		// snap.forEach(function(com) {
			$comments.empty();
			var $p = $('<p>').text(answer.text);
			$comments.append($p);
		// });
		


	});
}












