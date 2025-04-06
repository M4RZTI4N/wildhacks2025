// Quiz Data Set 1
let do_quiz = function(quiz_json){

  let quizData = quiz_json;
  let currentQuestion = 0;
  let score = 0;
  let selectedAnswers = [];

  const quizContainer = document.getElementById('quiz');
  const newQuizBtn = document.getElementById('newQuizBtn');

  function showQuestion() {
    if (currentQuestion >= quizData.length) {
      showResult();
      return;
    }
    quizContainer.innerHTML = "";
    const questionObj = quizData[currentQuestion];
    const questionEl = document.createElement('h2');
    questionEl.innerText = questionObj.question;
    quizContainer.appendChild(questionEl);
    
    const optionsContainer = document.createElement('div');
    optionsContainer.className = "options-container";
    quizContainer.appendChild(optionsContainer);
    
    questionObj.options.forEach((option, index) => {
      const btn = document.createElement('button');
      btn.innerText = option;
      btn.className = "option-button";
      btn.addEventListener('click', function() {
        selectedAnswers.push(index);
        if (index == questionObj.correct) {
          score++;
        }
        currentQuestion++;
        showQuestion();
      });
      optionsContainer.appendChild(btn);
    });
  }

  function showResult() {
    quizContainer.innerHTML = "<h2>Quiz Completed!</h2>";
    const scoreEl = document.createElement('p');
    scoreEl.innerText = "Your Score: " + score + " / " + quizData.length;
    quizContainer.appendChild(scoreEl);
    
    quizData.forEach((q, i) => {
      const questionResult = document.createElement('div');
      questionResult.className = "result-question";
      const userAnswer = selectedAnswers[i];
      questionResult.innerHTML = `<p><strong>Q${i+1}:</strong> ${q.question}</p>
                                  <p>Your answer: ${q.options[userAnswer]} ${userAnswer == q.correct ? '✅' : '❌'}</p>
                                  <p>Correct answer: ${q.options[q.correct]}</p>`;
      quizContainer.appendChild(questionResult);
    });
  }

  showQuestion();

  newQuizBtn.addEventListener('click', function() {
    socket.emit("user-quiz")
    currentQuestion = 0;
    score = 0;
    selectedAnswers = [];
  });
}