// Combine all syllabus generators
const Syllabus = {
  form1: typeof Form1Topics !== 'undefined' ? Form1Topics : {},
  form2: typeof Form2Topics !== 'undefined' ? Form2Topics : {},
  form3: typeof Form3Topics !== 'undefined' ? Form3Topics : {},
  form4: Form4Topics,
  form5: typeof Form5Topics !== 'undefined' ? Form5Topics : {}
};

let currentQuestion = null;

function updateTopicDropdown() {
  const formKey = document.getElementById('formSelect').value;
  const topicSelect = document.getElementById('topicSelect');
  topicSelect.innerHTML = '';

  const topics = Syllabus[formKey];
  for (let key in topics) {
    const opt = document.createElement('option');
    opt.value = key;
    opt.innerText = topics[key].title;
    topicSelect.appendChild(opt);
  }

  generateQuestion();
}

function generateQuestion() {
  const formKey = document.getElementById('formSelect').value;
  const topicKey = document.getElementById('topicSelect').value;
  const topic = Syllabus[formKey]?.[topicKey];

  if (!topic) return;

  currentQuestion = topic.generate();

  const questionBox = document.getElementById('questionBox');
  const numericArea = document.getElementById('numericInputArea');
  const mcqArea = document.getElementById('mcqArea');
  const feedback = document.getElementById('feedback');

  feedback.innerText = '';
  document.getElementById('userAnswer').value = '';

  katex.render(currentQuestion.latex, questionBox);

  if (topic.type === 'mcq') {
    numericArea.style.display = 'none';
    mcqArea.style.display = 'grid';
    mcqArea.innerHTML = '';

    const shuffled = [...currentQuestion.options].sort(() => Math.random() - 0.5);
    shuffled.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'mcq-btn';
      btn.innerText = opt;
      btn.onclick = () => checkAnswer(opt);
      mcqArea.appendChild(btn);
    });
  } else {
    numericArea.style.display = 'block';
    mcqArea.style.display = 'none';
  }
}

function checkAnswer(userAns) {
  const feedback = document.getElementById('feedback');
  if (userAns === null || userAns === undefined || String(userAns).trim() === '') {
    feedback.innerText = "Please enter an answer.";
    feedback.style.color = "orange";
    return;
  }

  if (String(userAns) === String(currentQuestion.answer)) {
    feedback.innerText = "Correct! Great job! 🎉";
    feedback.style.color = "green";
  } else {
    feedback.innerText = `Incorrect. The answer is ${currentQuestion.answer}.`;
    feedback.style.color = "red";
  }
}

window.onload = updateTopicDropdown;