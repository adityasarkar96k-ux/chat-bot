const chatArea = document.getElementById("chatArea");
const userInput = document.getElementById("userInput");

let history = JSON.parse(localStorage.getItem("luxe-history")) || [];

history.forEach(m => addMessage(m.text, m.type));

function handleEnter(e) {
  if (e.key === "Enter") sendMessage();
}

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  save(text, "user");
  userInput.value = "";

  showTyping();

  setTimeout(() => {
    removeTyping();
    const reply = "This is a premium AI demo response.";
    addMessage(reply, "bot");
    save(reply, "bot");
  }, 900);
}

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.textContent = text;
  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function save(text, type) {
  history.push({ text, type });
  localStorage.setItem("luxe-history", JSON.stringify(history));
}

function clearChat() {
  localStorage.removeItem("luxe-history");
  chatArea.innerHTML = "";
}

function showTyping() {
  const div = document.createElement("div");
  div.className = "message bot";
  div.id = "typing";
  div.textContent = "AI is thinking…";
  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById("typing");
  if (t) t.remove();
}

