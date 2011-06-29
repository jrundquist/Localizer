
<section id="answer-form" ping="<?php echo filter_input(INPUT_GET, 'i')?>" mark="<?php echo filter_input(INPUT_GET, 'm')?>"> 
	<h1>Respond to Ping</h1>
	<label>Question</label>
	<h2 id="question-to-answer"><?php echo filter_input(INPUT_GET, 't')?></h2>
	<label for="answer">Answer</label>
	<textarea id="resp-answer" name="answer" onFocus="actionManager.onAnswerType()" onBlur="actionManager.onAnswerBlur()" /></textarea>
	
	<button type="button" id="submit-answer" class="clean-gray" onClick="submitAnswer()">Submit Answer</button>
</section>