const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const resultContainer = document.getElementById('result-container')
const scoreElement = document.getElementById('score')
const summaryElement = document.getElementById('summary')

let shuffledQuestions, currentQuestionIndex
let score = 0
let summary = []

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  resultContainer.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  score = 0
  summary = []
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct === "true"

  if (correct) {
    score++
    summary.push(`✔️ ${shuffledQuestions[currentQuestionIndex].question}`)
  } else {
    summary.push(`❌ ${shuffledQuestions[currentQuestionIndex].question}`)
  }

  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct === "true")
  })

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    showResults()
  }
}

function showResults() {
  questionContainerElement.classList.add('hide')
  nextButton.classList.add('hide')
  startButton.innerText = 'Restart'
  startButton.classList.remove('hide')

  resultContainer.classList.remove('hide')
  scoreElement.innerText = `Your score: ${score}/${shuffledQuestions.length}`

  summaryElement.innerHTML = ""
  summary.forEach(item => {
    const li = document.createElement('li')
    li.innerText = item
    summaryElement.appendChild(li)
  })
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

// ✅ Your original questions
const questions = [
  {
    question: 'What does CSS stand for?',
    answers: [
      { text: 'Cascading Style Sheets', correct: true },
      { text: 'Creative Style System', correct: false },
      { text: 'Computer Style Syntax', correct: false },
      { text: 'Colorful Style Setup', correct: false }
    ]
  },
  {
    question: 'Who is known as the inventor of the World Wide Web?',
    answers: [
      { text: 'Tim Berners-Lee', correct: true },
      { text: 'Bill Gates', correct: false },
      { text: 'Steve Jobs', correct: false },
      { text: 'Mark Zuckerberg', correct: false }
    ]
  },
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'In which year was JavaScript created?',
    answers: [
      { text: '1995', correct: true },
      { text: '2000', correct: false },
      { text: '1990', correct: false },
      { text: '1985', correct: false }
    ]
  }
]
