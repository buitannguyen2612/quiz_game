const componentQuestions = (number) => `
    <div class="questions">
                        <p class="question_no">${number}.</p>
                        <div class="question_input">
                            <div class="name_question">
                                <input type="text" placeholder="Enter your question ..">
                            </div>
                            <div class="answer_list">
                                <div class="answer">
                                    <p class="answer_no">a</p>
                                    <div class="answer_content">
                                        <div class="contnt_answer">
                                            <input type="text">
                                        </div>
                                        <label for="checkbox" class="answer_check">
                                            <input type="checkbox" id="checkbox">
                                        </label>
                                    </div>
                                </div>
                                 <div class="answer">
                                    <p class="answer_no">b</p>
                                    <div class="answer_content">
                                        <div class="contnt_answer">
                                            <input type="text">
                                        </div>
                                        <label for="checkbox" class="answer_check">
                                            <input type="checkbox" id="checkbox">
                                        </label>
                                    </div>
                                </div>
                                 <div class="answer">
                                    <p class="answer_no">c</p>
                                    <div class="answer_content">
                                        <div class="contnt_answer">
                                            <input type="text">
                                        </div>
                                        <label for="checkbox" class="answer_check">
                                            <input type="checkbox" id="checkbox">
                                        </label>
                                    </div>
                                </div>
                                <div class="answer">
                                    <p class="answer_no">d</p>
                                    <div class="answer_content">
                                        <div class="contnt_answer">
                                            <input type="text">
                                        </div>
                                        <label for="checkbox" class="answer_check">
                                            <input type="checkbox" id="checkbox">
                                        </label>
                                    </div>
                                </div>
                                <div class="answer">
                                    <p class="answer_no">e</p>
                                    <div class="answer_content">
                                        <div class="contnt_answer">
                                            <input type="text">
                                        </div>
                                        <label for="checkbox" class="answer_check">
                                            <input type="checkbox" id="checkbox">
                                        </label>
                                    </div>
                                </div>
                                <div class="answer">
                                    <p class="answer_no">f</p>
                                    <div class="answer_content">
                                        <div class="contnt_answer">
                                            <input type="text">
                                        </div>
                                        <label for="checkbox" class="answer_check">
                                            <input type="checkbox" id="checkbox">
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    `;
// adding more field questions
const addField = () => {
  const question = document.querySelectorAll(".questions");
  const containerQuestion = document.querySelectorAll(
    ".container_questions"
  )[0];
  const button = document.querySelectorAll(".adding_question")[0];
  const lenghOfQuestion = question.length;
  const newQuestions = lenghOfQuestion + 1;
  const newQuestionHTML = componentQuestions(newQuestions);
  const newQuestionElement = document.createElement("div");
  newQuestionElement.innerHTML = newQuestionHTML;
  containerQuestion.insertBefore(newQuestionElement, button);
};

function initializeScore() {
  const initialScore = { score: 0 };
  localStorage.setItem("playerScore", JSON.stringify(initialScore));
  return initialScore;
}

//Cancel the checkbox if the answer is null
document.addEventListener("change", (event) => {
  if (event.target.type === "checkbox") {
    const checkbox = event.target;
    const answerInput = checkbox
      .closest(".answer")
      .querySelector(".contnt_answer input");
    if (!answerInput.value.trim() && checkbox.checked) {
      alert("Cannot check an empty answer. Please fill in the answer text.");
      checkbox.checked = false;
    }
  }
});

// submit the json data after typing and save in localstorage
const submitQuestions = () => {
  const questions = document.querySelectorAll(".questions");
  if (questions.length === 0) {
    alert("Please enter your question");
    return;
  }
  const questionData = [];
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionText = question.querySelector(".name_question input").value;
    if (questionText.trim() === "") {
      alert(`Question ${i + 1} is empty. Please fill in the question.`);
      return;
    }

    const answers = question.querySelectorAll(".answer");
    const answerData = [];
    let hasChecked = false;
    let checkedCount = 0;

    for (let j = 0; j < answers.length; j++) {
      const answer = answers[j];
      const answerText = answer.querySelector(".contnt_answer input").value;
      const isChecked = answer.querySelector(".answer_check input").checked;

      if (answerText.trim() !== "") {
        answerData.push({
          answer: answerText,
          isCorrect: isChecked,
        });
      }

      if (isChecked) {
        hasChecked = true;
        checkedCount++;
      }
    }

    if (answerData.length === 0) {
      alert(
        `Question ${i + 1} has no answers. Please provide at least one answer.`
      );
      return;
    }

    if (checkedCount > 2) {
      alert(
        `Question ${
          i + 1
        } has more than 2 correct answers marked. Please check only up to 2 answers.`
      );
      return;
    }

    if (!hasChecked) {
      alert(
        `Question ${
          i + 1
        } has no correct answer marked. Please check at least one answer.`
      );
      return;
    }

    questionData.push({
      question: questionText,
      wrong: false,
      answers: answerData,
    });
  }
  localStorage.setItem("questionData", JSON.stringify(questionData));
  initializeScore();
  window.location.pathname = "../../page/game.html";
};
