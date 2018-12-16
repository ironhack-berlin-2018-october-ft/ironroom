document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

  function updateChat() {
    fetch('//localhost:3000/chat') // FIXME: update based on hostname
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
      fetch('//localhost:3000/chat',
        {
          method: "POST",
          body: new URLSearchParams(`input=${document.querySelectorAll('#chatInput')[0].value.trim()}`)
        }
      ).then((response) => {
        return response.text();
      }).then((result) => {
        document.querySelectorAll('#chatArea')[0].innerHTML = result; // FIXME share between GET and POST
        document.querySelectorAll('#chatInput')[0].value = ''
      }); // FIXME: handle error 
    }
  });


}, false);
