document.addEventListener("DOMContentLoaded", function() {
    const flashcards = [
        { front: "Question1", back: "Answer1" },
        { front: "Question2", back: "Answer2" },
        { front: "Question3", back: "Answer3" },
        { front: "Question4", back: "Answer4" },
        { front: "Question5", back: "Answer5" }
    ];

    let currentIndex = 0;
    let isFlipped = false;

    const frontElement = document.getElementById("front");
    const backElement = document.getElementById("back");
    const flashcardElement = document.getElementById("flashcard");
    const generateBtn = document.getElementById("create-btn");
    const previousBtn = document.getElementById("prev-btn");
    const flipBtn = document.getElementById("flip-btn");
    const nextBtn = document.getElementById("next-btn");

    function renderCard() {
        const card = flashcards[currentIndex];
        frontElement.textContent = card.front;
        backElement.textContent = card.back;
        flashcardElement.classList.remove("flip");
        isFlipped = false;
    }

    function flipCard() {
        flashcardElement.classList.toggle("flip");
        isFlipped = !isFlipped;
    }

    flashcardElement.addEventListener("click", flipCard);
    const cardElements = document.getElementsByClassName("card");
    Array.from(cardElements).forEach(card => {
        card.addEventListener("click", flipCard);
    });

    generateBtn.addEventListener("click", function() {
        currentIndex = 0;
        renderCard();
        previousBtn.disabled = false;
        nextBtn.disabled = false;
    });

    previousBtn.addEventListener("click", function() {
        if (currentIndex > 0) {
            currentIndex--;
            renderCard();
        }
        if (currentIndex === 0) {
            previousBtn.disabled = true;
        }
    });

    nextBtn.addEventListener("click", function() {
        if (currentIndex < flashcards.length - 1) {
            currentIndex++;
            renderCard();
        }
        if (currentIndex === flashcards.length - 1) {
               nextBtn.disabled = true;
        }
    });

    if (flipBtn) {
        flipBtn.addEventListener("click", flipCard);
    }
    const outputElement = document.getElementById('output');
    if (outputElement) {
        outputElement.innerHTML = "Flashcards loaded. Click 'Generate' to start!";
    }

});
