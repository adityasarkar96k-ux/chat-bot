const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");

let chatHistory = JSON.parse(localStorage.getItem("luxeChat")) || [];

chatHistory.forEach(msg => addMessage(msg.text, msg.type));

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  saveMessage(text, "user");

  userInput.value = "";

  setTimeout(() => {
    const reply = "This is a luxury AI demo response ✨";
    addMessage(reply, "bot");
    saveMessage(reply, "bot");
  }, 700);
}

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function saveMessage(text, type) {
  chatHistory.push({ text, type });
  localStorage.setItem("luxeChat", JSON.stringify(chatHistory));
}
