const playScreen = document.querySelectorAll(".play_screen")[0];
const containerScroll = document.querySelectorAll(".store_scroll")[0];
const playIcon = document.querySelectorAll(".icon_play")[0];
const barIcon = document.querySelectorAll(".show_score i")[0];
const menu = document.querySelectorAll(".bg-menu")[0];
const score = document.querySelectorAll(".score")[0];

// Function to initialize or retrieve player score from localStorage
function initializeScore() {
  const initialScore = { score: 0 };
  localStorage.setItem("playerScore", JSON.stringify(initialScore));
  return initialScore;
}

barIcon.addEventListener("click", (e) => {
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
    score.style.display = "none";
  }
});

// Function to update player score in localStorage
function updateScore(increment) {
  let playerScore =
    JSON.parse(localStorage.getItem("playerScore")) || initializeScore();
  playerScore.score += increment;
  localStorage.setItem("playerScore", JSON.stringify(playerScore));
}

playIcon.addEventListener("click", () => {
  playScreen.style.display = "none"; // Hide play screen
  containerScroll.style.display = "block"; // Show list play
  barIcon.style.display = "block"; // Show list play
});

function closePop() {
  menu.style.display = "none";
}

function showScore() {
  const scoreCount = JSON.parse(localStorage.getItem("playerScore")).score;
  score.querySelectorAll("p")[0].textContent = scoreCount;
  score.style.display = "block";
}

function backMenu() {
  score.style.display = "none";
}

function restartGame() {
  const storedQuestions =
    JSON.parse(localStorage.getItem("questionData")) || [];
  storedQuestions.forEach((question) => {
    question.wrong = false;
  });
  localStorage.setItem("questionData", JSON.stringify(storedQuestions));
  initializeScore();
  containerScroll.style.display = "none"; // Show list play
  barIcon.style.display = "none"; // Show list play
  menu.style.display = "none";
  playScreen.style.display = "flex";
  location.reload();
}

function backHome() {
  menu.style.display = "none";
  playScreen.style.display = "none";
  containerScroll.style.display = "block"; // Show list play
}

document.addEventListener("DOMContentLoaded", () => {
  const listPlay = document.querySelector(".list_play");
  const boxJoinGame = document.querySelector(".box_join_game");
  const questionQuiz = boxJoinGame.querySelector(".box_question_quiz p");
  const answerQuiz = boxJoinGame.querySelector(".answer_quiz");

  // Retrieve data from localStorage
  const storedQuestions =
    JSON.parse(localStorage.getItem("questionData")) || [];

  // Loop through storedQuestions array and create box_question elements
  storedQuestions.forEach((questionData, index) => {
    const boxQuestion = document.createElement("div");
    boxQuestion.classList.add("box_question");
    boxQuestion.textContent = `${index + 1}`;
    // Disable the question if it has been attempted and answered incorrectly
    if (questionData.wrong) {
      boxQuestion.classList.add("attempted");
      boxQuestion.style.pointerEvents = "none";
    }
    // Append box_question to listPlay
    listPlay.appendChild(boxQuestion);

    // Add click event listener to each box_question
    boxQuestion.addEventListener("click", () => {
      if (questionData.wrong) {
        return; // Return early if the question is marked as wrong
      }
      // Hide the listPlay div
      containerScroll.style.display = "none";

      // Show the box_join_game div
      boxJoinGame.classList.remove("hidden");

      // Populate the question
      questionQuiz.textContent = questionData.question;

      // Clear previous answers
      answerQuiz.innerHTML = "";

      // Populate the answers
      questionData.answers.forEach((answerData) => {
        const answerDiv = document.createElement("div");
        answerDiv.classList.add("box_choosen");
        answerDiv.textContent = answerData.answer;
        answerQuiz.appendChild(answerDiv);

        // Add click event listener to each answer
        answerDiv.addEventListener("click", () => {
          // Reset borders for all answers
          answerQuiz.querySelectorAll(".box_choosen").forEach((div) => {
            div.style.border = "solid black 1px";
          });

          // Highlight the selected answer
          if (answerData.isCorrect) {
            updateScore(1);
            answerDiv.style.border = "2px solid green";
            // Mark the question as attempted and wrong
            storedQuestions[index].wrong = false;
            localStorage.setItem(
              "questionData",
              JSON.stringify(storedQuestions)
            );

            // Hide the box_join_game div and show the listPlay div
            setTimeout(() => {
              boxJoinGame.classList.add("hidden");
              containerScroll.style.display = "block";
              // Disable the attempted question
              boxQuestion.classList.add("attempted");
              boxQuestion.style.pointerEvents = "none";
            }, 1000); // Adjust the timeout duration as needed
          } else {
            answerDiv.style.border = "2px solid red";
            // Mark the question as attempted and wrong
            storedQuestions[index].wrong = true;
            localStorage.setItem(
              "questionData",
              JSON.stringify(storedQuestions)
            );

            // Hide the box_join_game div and show the listPlay div
            setTimeout(() => {
              boxJoinGame.classList.add("hidden");
              containerScroll.style.display = "block";
              // Disable the attempted question
              boxQuestion.classList.add("attempted");
              boxQuestion.style.pointerEvents = "none";
            }, 1000); // Adjust the timeout duration as needed
          }
        });
      });
    });
  });
});
