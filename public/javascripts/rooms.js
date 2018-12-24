document.addEventListener(
  "DOMContentLoaded",
  () => {
    let duration = Number(document.querySelector("#timerGameDuration").value);
    let startingAt = Number(document.querySelector("#timerStartingAt").value);
    let currentTimestamp = Number(
      document.querySelector("#timerCurrentTimestamp").value
    );
    // let currentTimestamp = Math.floor(Date.now() / 1000)
    var nbOfSeconds = duration + startingAt - currentTimestamp;

    displayTimer();

    setInterval(() => {
      nbOfSeconds--;
      if (nbOfSeconds < 0) {
        window.location.pathname = "/game-over";
      }
      displayTimer();
    }, 1000);

    function displayTimer() {
      let h = Math.floor(nbOfSeconds / (60 * 60));
      let m = Math.floor((nbOfSeconds - h * 60 * 60) / 60);
      let s = nbOfSeconds - h * 60 * 60 - m * 60;
      document.getElementById("timer").innerHTML = `${addExtraZero(
        h
      )}:${addExtraZero(m)}:${addExtraZero(s)}`;
    }

    function addExtraZero(number) {
      if (number < 10 && number >= 0) {
        return "0" + number;
      }
      return "" + number;
    }

    // ~~~~~~~~
    // CHAT
    // ~~~~~~~~
    function renderChat(html) {
      let chatArea = document.querySelector("#chatArea");
      chatArea.innerHTML = html;
      // scroll to bottom always
      chatArea.scrollTop = chatArea.scrollHeight;
    }

    function updateChat() {
      fetch("/chat") // FIXME: update based on hostname
        .then(response => {
          return response.text();
        })
        .then(result => {
          renderChat(result);
        });
    }

    function sendMessage() {
      let content = document.querySelector("#chatInput").value.trim()
      if (!content) {
        document.querySelector("#chatInput").value = ""
        return;
      }
      fetch("/chat", {
        method: "POST",
        body: new URLSearchParams(
          `input=${content}`
        )
      })
        .then(response => response.text())
        .then(result => {
          renderChat(result);
          document.querySelector("#chatInput").value = "";

          // For the first interaction, we go to the next page
          if (window.location.pathname === "/rooms/0") {
            window.location.pathname = "/rooms/1";
            // window.history.pushState('', '', '/rooms/1');
          }
        }); // FIXME: handle error
    }

    updateChat();
    setInterval(updateChat, 5000);

    document
      .querySelector("#chatInput")
      .addEventListener("keyup", event => {
        if (event.key === "Enter") {
          sendMessage()
        }
      });

    document
      .querySelector(".chat-input .send")
      .addEventListener("click", event => {
        sendMessage()
      });
  },
  false
);




// $("#draggable").draggable();
