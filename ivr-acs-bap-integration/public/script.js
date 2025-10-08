document.addEventListener("DOMContentLoaded", () => {
  const screens = {
    call: document.getElementById("call-screen"),
    keypad: document.getElementById("keypad-screen"),
  };

  const callScreen = screens.call;
  const keypadScreen = screens.keypad;

  const keypadToggleButton = document.getElementById("keypad-toggle-btn");
  const transcript = document.getElementById("transcript");
  const keypadButtons = document.querySelectorAll(".key");
  const talkBtnMain = document.getElementById("talk-btn-main");
  const talkBtnKeypad = document.getElementById("talk-btn-keypad");
  const timerDisplay = document.getElementById("timer");
  const hangupBtns = document.querySelectorAll(".hangup-btn");

  const sessionId = `session-${Date.now()}`;
  let recognition;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      addToTranscript(speechResult, "user");
      sendRequest("/api/ivr/conversation", { sessionId, query: speechResult });
    };
  }

  const initialGreeting =
    "Hello, what can I help you with? Please choose from the following options. Say 'Balance' for account balance, 'Pay' for bill payment, or 'Speak to an agent'.";

  let greeted = false;

  keypadToggleButton.addEventListener("click", () => {
    callScreen.style.display = "none";
    keypadScreen.style.display = "flex";

    if (!greeted) {
      displayResponse(initialGreeting);
      greeted = true;
    }
  });

  talkBtnMain.addEventListener("click", handleSpeechInput);
  talkBtnKeypad.addEventListener("click", handleSpeechInput);

  function handleSpeechInput() {
    if (recognition) {
      speechSynthesis.cancel();
      recognition.start();
    }
  }

  keypadButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const digit = button.textContent.charAt(0);
      if (!isNaN(digit) || digit === "*" || digit === "#") {
        handleDtmfInput(digit);
      }
    });
  });

  let seconds = 0;
  setInterval(() => {
    seconds++;
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    timerDisplay.textContent = `${mins}:${secs}`;
  }, 1000);

  function handleDtmfInput(digit) {
    addToTranscript(`Pressed: ${digit}`, "user");
    const payload = { sessionId, inputType: "DTMF", inputValue: digit };
    sendRequest("/api/ivr/handle-input", payload);
  }

  async function sendRequest(endpoint, payload) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const responseText =
        data.message || data.error || "No response text found.";
      displayResponse(responseText);
    } catch (error) {
      console.error("API Error:", error);
      displayResponse("Sorry, there was a connection error.");
    }
  }

  function displayResponse(text) {
    addToTranscript(text, "bot");
    speakText(text);
  }

  function speakText(text) {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }

  function addToTranscript(text, type) {
    const p = document.createElement("p");
    p.textContent = text;
    p.className = type === "user" ? "user-message" : "bot-message";
    transcript.appendChild(p);
    transcript.scrollTop = transcript.scrollHeight;
  }
});
