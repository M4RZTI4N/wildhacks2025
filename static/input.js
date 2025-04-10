var socket = io();
socket.on('connect', function() {
    console.log("connected")
});
var socket = io();
socket.on('connect', function() {
    console.log("connected")
});



const typingForm = document.querySelector("#chat-form");
const chatContainer = document.querySelector(".chat-list");
const suggestions = document.querySelectorAll(".suggestion");
const toggleThemeButton = document.querySelector("#theme-toggle-button");
const deleteChatButton = document.querySelector("#delete-chat-button");
const deleteDialog = document.querySelector(".delete-storage");
const startNewConvo = document.querySelector(".new-convo");
const continueConvo = document.querySelector(".continue-convo")
const topicInput = document.getElementById("topic-container");
const topicForm = document.getElementById("topic-form");
const levelContainer = document.getElementById("level-container")
const buttonBoxes = document.querySelector(".button-boxes")
const createFlashcards = document.getElementById("create-flashcards")
const flashcardContainer = document.getElementById("flashcards-container")
const createQuiz = document.getElementById("create-quiz")
const quizContainer = document.getElementById("quiz-container")
// State variables
let userMessage = null;
let isResponseGenerating = false;

createQuiz.onclick = ()=>{
    socket.emit("user-quiz")
}
socket.on("quiz-response",(data)=>{
    let new_data = data.split('\n').slice(0,-1).filter((s)=>s!="");
    let processed_data = []
    for(let i =0; i < new_data.length; i += 3){
        let new_q = {
            "question":"",
            "options":[],
            "correct":0
        }
        new_q.question = new_data[i],
        new_q.options = new_data[i+1].replace("[","").replace("]","").split(",")
        new_q.correct = new_data[i+2].replace("(","").replace(")","").trim()
        processed_data.push(new_q)
    }
    console.log(processed_data)
    quizContainer.style.display = "block"
    do_quiz(processed_data)

})

createFlashcards.onclick = () =>{
    
    socket.emit("user-flashcards")
}
socket.on("flashcards-response",(data)=>{
    let new_data = data.split('\n').slice(0,-1).filter((s)=>s!="");
    let flashcards = []
    for(let i = 0; i < new_data.length; i+=2){
        let new_card = {
            "side1":"",
            "side2":""
        }
        new_card.front = new_data[i]
        new_card.back = new_data[i+1]
        flashcards.push(new_card)
    }
    console.log(new_data)
    console.log(flashcards)
    flashcardContainer.style.display = 'block';
    generate_flaschards(flashcards)
})
const promptSetup = ()=>{
    topicInput.style.display = "block";

}
const selectLevel = (e)=>{
    let selected_level = e.target.innerText;
    socket.emit("user-level",selected_level)
    levelContainer.style.display = "none";
}

const setupLevels = (text)=>{
    let split_prompts = text.split("\n").slice(1,-1)
    console.log(split_prompts)
    levelContainer.style.display = "block";
    //<button class="selectable-button" id="option1" onclick="showOutput('beginner')">Beginner</button>
    split_prompts.forEach(prompt=>{
        let new_button = document.createElement("button")
        new_button.className = "selectable-button";
        new_button.innerText = prompt;
        new_button.onclick = selectLevel;
        buttonBoxes.appendChild(new_button)
    })
}
topicForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("submitting topic")
    let topicMessage = topicForm.querySelector(".typing-input").value.trim()
    console.log(topicMessage)
    if(!topicMessage){return};
    topicForm.reset();
    socket.emit("user-topic",topicMessage);
    topicInput.style.display = "none"
});
socket.on("topic-response",data=>{
    console.log(data)
    setupLevels(data)
    
})
socket.on("init-response",data=>{
    console.log('init response:' + data)
    
    const incomingMessageDiv = createMessageElement(`<div class="message-content">
                  <img class="avatar" src="https://i.postimg.cc/hP2WrQTQ/Gemini-August-Release-SS-width-1300.jpg" alt="Gemini avatar">
                  <p class="text"></p>
                  <div class="loading-indicator">
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                  </div>
                </div>
                <span onClick="copyMessage(this)" class="icon material-symbols-rounded">content_copy</span>`, "incoming", "loading");
    chatContainer.appendChild(incomingMessageDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to the bottom
    const textElement = incomingMessageDiv.querySelector(".text");
    showTypingEffect(data, textElement, incomingMessageDiv);
    incomingMessageDiv.classList.remove("loading");
})


const loadDataFromLocalstorage = () => {
  const savedChats = localStorage.getItem("saved-chats");
  const isLightMode = (localStorage.getItem("themeColor") === "light_mode");
  // Apply the stored theme
  document.body.classList.toggle("light_mode", isLightMode);
  toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";
  // Restore saved chats or clear the chat container
  chatContainer.innerHTML = savedChats || '';
  document.body.classList.toggle("hide-header", savedChats);
  chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to the bottom

  if(!savedChats){
    promptSetup();

  }
}
// Create a new message element and return it
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
}
// Show typing effect by displaying words one by one
const showTypingEffect = (text, textElement, incomingMessageDiv) => {
  const words = text.split(' ');
  let currentWordIndex = 0;
  const typingInterval = setInterval(() => {
    // Append each word to the text element with a space
    textElement.innerHTML += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex++];
    incomingMessageDiv.querySelector(".icon").classList.add("hide");
    // If all words are displayed
    if (currentWordIndex === words.length) {
      clearInterval(typingInterval);
      isResponseGenerating = false;
      incomingMessageDiv.querySelector(".icon").classList.remove("hide");
      localStorage.setItem("saved-chats", chatContainer.innerHTML); // Save chats to local storage
    }
    chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to the bottom
  }, 75);
}
// Fetch response from the API based on user message
const generateAPIResponse = async (incomingMessageDiv) => {
  const textElement = incomingMessageDiv.querySelector(".text"); // Getting text element
  try {
    // Send a POST request to the API with the user's mes

    const socket_data =  ()=> new Promise(resolve => {
        socket.emit("user-input",{
            data:userMessage
        })
        socket.on("server-response",data=>{
            resolve(data)
        })
    })
    let server_return = await socket_data()
    console.log(server_return)
    showTypingEffect(server_return, textElement, incomingMessageDiv); // Show typing effect
  } catch (error) { // Handle error
    isResponseGenerating = false;
    textElement.innerText = error.message;
    textElement.parentElement.closest(".message").classList.add("error");
  } finally {
    incomingMessageDiv.classList.remove("loading");
  }
}
// Show a loading animation while waiting for the API response
const showLoadingAnimation = () => {
  const html = `<div class="message-content">
                  <img class="avatar" src="https://i.postimg.cc/hP2WrQTQ/Gemini-August-Release-SS-width-1300.jpg" alt="Gemini avatar">
                  <p class="text"></p>
                  <div class="loading-indicator">
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                  </div>
                </div>
                <span onClick="copyMessage(this)" class="icon material-symbols-rounded">content_copy</span>`;
  const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
  chatContainer.appendChild(incomingMessageDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to the bottom
  generateAPIResponse(incomingMessageDiv);
}
// Copy message text to the clipboard
const copyMessage = (copyButton) => {
  const messageText = copyButton.parentElement.querySelector(".text").innerText;
  navigator.clipboard.writeText(messageText);
  copyButton.innerText = "done"; // Show confirmation icon
  setTimeout(() => copyButton.innerText = "content_copy", 1000); // Revert icon after 1 second
}
// Handle sending outgoing chat messages
const handleOutgoingChat = () => {
  userMessage = typingForm.querySelector(".typing-input").value.trim() || userMessage;
  if(!userMessage || isResponseGenerating) return; // Exit if there is no message or response is generating
  isResponseGenerating = true;
  const html = `<div class="message-content">
                  <img class="avatar" src="https://i.postimg.cc/L8hd043C/images.png" alt="User avatar">
                  <p class="text"></p>
                </div>`;
  const outgoingMessageDiv = createMessageElement(html, "outgoing");
  outgoingMessageDiv.querySelector(".text").innerText = userMessage;
  chatContainer.appendChild(outgoingMessageDiv);
  
  typingForm.reset(); // Clear input field
  document.body.classList.add("hide-header");
  chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to the bottom
  setTimeout(showLoadingAnimation, 500); // Show loading animation after a delay
}
// Toggle between light and dark themes
toggleThemeButton.addEventListener("click", () => {
  const isLightMode = document.body.classList.toggle("light_mode");
  localStorage.setItem("themeColor", isLightMode ? "light_mode" : "dark_mode");
  toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";
});
// Delete all chats from local storage when button is clicked
deleteChatButton.addEventListener("click", () => {
    deleteDialog.style.display = "grid";
    document.getElementById("components-container").style.display="none"
    console.log("clicked delete")
});
startNewConvo.onclick = ()=>{
    //reset
    deleteDialog.style.display = "none";
    localStorage.removeItem("saved-chats");
    loadDataFromLocalstorage();
    console.log("new chat") 
    document.getElementById("components-container").style.display="flex"
};
continueConvo.addEventListener("click",()=>{
    deleteDialog.style.display = "none";
    console.log("continue chat")
    document.getElementById("components-container").style.display="flex"
});
// Set userMessage and handle outgoing chat when a suggestion is clicked
// suggestions.forEach(suggestion => {
//   suggestion.addEventListener("click", () => {
//     userMessage = suggestion.querySelector(".text").innerText;
//     handleOutgoingChat();
//   });
// });
// Prevent default form submission and handle outgoing chat
typingForm.addEventListener("submit", (e) => {
  e.preventDefault(); 
  handleOutgoingChat();
});
loadDataFromLocalstorage();


// Utility function to load external HTML into a container
async function loadComponent(containerId, scriptSrc) {
  try {
    // Fetch the HTML content
    // const res = await fetch(file);
    // const html = await res.text();
    // document.getElementById(containerId).innerHTML += html;

    // Dynamically load the JavaScript file
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.onload = () => {
      console.log(`${scriptSrc} has been loaded.`);
    };
    document.body.appendChild(script); // Append the script tag to the body
  } catch (err) {
    console.error(`Failed to load ${file}:`, err);
  }
}

// Load components including their scripts
window.addEventListener("DOMContentLoaded", () => {
  loadComponent("components-container", "../static/level.js");
  loadComponent("components-container", "../static/flashcards.js");
  loadComponent("components-container", "../static/quiz.js");
});

  