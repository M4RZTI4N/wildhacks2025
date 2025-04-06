var generate_flaschards = function(cards) {


    const flashcards = cards
    console.log(flashcards)
    flashcardContainer.style.display = "block"
    let currentIndex = 0;
    let isFlipped = false;

    const frontElement = document.getElementById("front");
    const backElement = document.getElementById("back");
    const flashcardElement = document.getElementById("flashcard");
    const generateBtn = document.getElementById("create-btn");
    const previousBtn = document.getElementById("prev-btn");
    const flipBtn = document.getElementById("flip-btn");
    const nextBtn = document.getElementById("next-btn");
    generateBtn.onclick=()=>{
        socket.emit("user-flashcards")
    }
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
    currentIndex = 0;
    renderCard();
    // socket.emit("debug","TEST")
    previousBtn.disabled = false;
    nextBtn.disabled = false;
    flashcardElement.addEventListener("click", flipCard);
    const cardElements = document.getElementsByClassName("card");
    Array.from(cardElements).forEach(card => {
        card.addEventListener("click", flipCard);
    });

    

    previousBtn.addEventListener("click", function() {
        if (currentIndex > 0) {
            currentIndex--;
            renderCard();
            previousBtn.disabled = false;
        }
        if (currentIndex === 0) {
            previousBtn.disabled = true;
        }
    });

    nextBtn.addEventListener("click", function() {
        if (currentIndex < flashcards.length - 1) {
            currentIndex++;
            renderCard();
            nextBtn.disabled = false;
        }
        if (currentIndex === flashcards.length - 1) {
               nextBtn.disabled = true;
        }
    });

    if (flipBtn) {
        flipBtn.addEventListener("click", flipCard);
    }
    // // const outputElement = document.getElementById('output');
    // if (outputElement) {
    //     outputElement.innerHTML = "Flashcards loaded. Click 'Generate' to start!";
    // }

};
