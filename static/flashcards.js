// let flashcards = [];
// let currentCardIndex = 0;

// document.getElementById("create-btn").addEventListener("click", () => {
//   currentCardIndex = 0;
//   flashcards = [];

//   for (let i = 1; i <= 10; i++) {
//     const card = {
//       front: `Flashcard ${i} - Front`,
//       back: `Flashcard ${i} - Back`
//     };
//     flashcards.push(card);
//   }

//   renderCard();
//   document.querySelector(".navigation-buttons").style.display = "block";
// });

// document.getElementById("prev-btn").addEventListener("click", () => {
//   if (currentCardIndex > 0) {
//     currentCardIndex--;
//     renderCard();
//   }
// });

// document.getElementById("next-btn").addEventListener("click", () => {
//   if (currentCardIndex < flashcards.length - 1) {
//     currentCardIndex++;
//     renderCard();
//   }
// });

// document.getElementById("flip-btn").addEventListener("click", () => {
//   const flashcardElement = document.querySelector(".flashcard");
//   flashcardElement.classList.toggle("flipped");
// });

// function renderCard() {
//   const container = document.getElementById("flashcards-container");
//   container.innerHTML = "";

//   const cardData = flashcards[currentCardIndex];

//   const flashcard = document.createElement("div");
//   flashcard.className = "flashcard";

//   const inner = document.createElement("div");
//   inner.className = "flashcard-inner";

//   const front = document.createElement("div");
//   front.className = "flashcard-front";
//   front.textContent = cardData.front;

//   const back = document.createElement("div");
//   back.className = "flashcard-back";
//   back.textContent = cardData.back;

//   inner.appendChild(front);
//   inner.appendChild(back);
//   flashcard.appendChild(inner);
//   container.appendChild(flashcard);
// }
