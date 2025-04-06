// Quiz Data Set 1
const quizData1 = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "Madrid", "Rome"],
      correct: 0
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correct: 1
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correct: 1
    },
    {
      question: "What is the boiling point of water?",
      options: ["90°C", "100°C", "80°C", "120°C"],
      correct: 1
    },
    {
      question: "Which language is primarily used for web development?",
      options: ["Python", "C++", "JavaScript", "Java"],
      correct: 2
    }
  ];

  // Quiz Data Set 2
  const quizData2 = [
    {
      question: "What is the largest ocean?",
      options: ["Atlantic", "Pacific", "Indian", "Arctic"],
      correct: 1
    },
    {
      question: "What is the tallest mountain in the world?",
      options: ["K2", "Kangchenjunga", "Everest", "Makalu"],
      correct: 2
    },
    {
      question: "Who wrote 'Hamlet'?",
      options: ["Shakespeare", "Dickens", "Tolstoy", "Hemingway"],
      correct: 0
    },
    {
      question: "What is the currency of Japan?",
      options: ["Yuan", "Dollar", "Yen", "Won"],
      correct: 2
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      options: ["Gold", "Oxygen", "Silver", "Iron"],
      correct: 1
    }
  ];

  let quizData = quizData1;
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
        if (index === questionObj.correct) {
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
                                  <p>Your answer: ${q.options[userAnswer]} ${userAnswer === q.correct ? '✅' : '❌'}</p>
                                  <p>Correct answer: ${q.options[q.correct]}</p>`;
      quizContainer.appendChild(questionResult);
    });
  }

  showQuestion();

  newQuizBtn.addEventListener('click', function() {
    quizData = (quizData === quizData1) ? quizData2 : quizData1;
    currentQuestion = 0;
    score = 0;
    selectedAnswers = [];
    showQuestion();
  });