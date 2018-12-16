document.addEventListener('DOMContentLoaded', () => {
  let duration = Number(document.querySelectorAll('#timerDuration')[0].value)
  let startingAt = Number(document.querySelectorAll('#timerStartingAt')[0].value)
  let currentTimestamp = Math.floor(Date.now() / 1000)
  var nbOfSeconds = duration + startingAt - currentTimestamp

  displayTimer()

  setInterval(() => {
    nbOfSeconds--
    if (nbOfSeconds < 0) {
      window.location.pathname = '/game-over'
    }
    displayTimer()
  }, 1000)

  function displayTimer() {
    let h = Math.floor(nbOfSeconds / (60 * 60))
    let m = Math.floor((nbOfSeconds - h * 60 * 60) / 60)
    let s = nbOfSeconds - (h * 60 * 60) - (m * 60)
    document.getElementById('timer').innerHTML = `${addExtraZero(h)}:${addExtraZero(m)}:${addExtraZero(s)}`
  }

  function addExtraZero(number) {
    if (number < 10) {
      return '0' + number
    }
    return '' + number
  }


  // ~~~~~~~~
  // CHAT
  // ~~~~~~~~
  function updateChat() {
    fetch('/chat') // FIXME: update based on hostname
      .then((response) => {
        return response.text();
      }).then((result) => {
        document.querySelectorAll('#chatArea')[0].innerHTML = result;
      });
  }

  updateChat()
  setInterval(updateChat, 5000)

  document.querySelectorAll('#chatInput')[0].addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      fetch('/chat',
        {
          method: "POST",
          body: new URLSearchParams(`input=${document.querySelectorAll('#chatInput')[0].value.trim()}`)
        }
      )
        .then(response => response.text())
        .then(result => {
          document.querySelectorAll('#chatArea')[0].innerHTML = result; // FIXME share between GET and POST
          document.querySelectorAll('#chatInput')[0].value = ''

          // For the first interaction, we go to the next page
          if (window.location.pathname === '/rooms/0') {
            window.location.pathname = '/rooms/1'
            // window.history.pushState('', '', '/rooms/1');
          }
        }); // FIXME: handle error 
    }
  });

}, false);