// Inicialize o EmailJS com sua chave pública

/* (function(){
    emailjs.init("daIs8VqMBW3L3JEv8");
})();

document.getElementById('btn-entrar').addEventListener('click', function(event) {
    event.preventDefault();

    const profile = document.getElementById('profile').value;
    const email = document.getElementById('email').value;

    const sendEmail = (e) => {

        emailjs.sendForm('service_udvhe35', 'template_8e5dze2', form.current, {
            publicKey: "daIs8VqMBW3L3JEv8",
        }).then(
            () => {
              console.log('SUCCESS!');
            },
            (error) => {
              console.log('FAILED...', error.text);
            },
          );
    }

    sendEmail();
});

*/

/*document.getElementById('btn-entrar').addEventListener('click', function(event) {
    event.preventDefault();

    emailjs.sendForm('service_udvhe35', 'template_8e5dze2', form.current, {
        publicKey: "daIs8VqMBW3L3JEv8",
    }).then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
}); */

/* function sendMail() {
    let parms = {
        name : document.getElementById("profile").value,
        email: document.getElementById("email").value
    }

    emailjs.send("service_udvhe35", "template_mjh2mi5", parms).then(alert("Email enviado!"))
} */


const btnEntar = document.getElementById("btn-entrar")
const container = document.querySelector(".container")

btnEntar.addEventListener("click", (e) => {
  e.preventDefault();

  container.classList.add("hidden")
})

let inputs = [...document.querySelectorAll('.inputs')]

inputs.forEach(e => {
  e.addEventListener("keyup", () => {
    if(inputs.indexOf(e) + 1 != inputs.length) {
      inputs[inputs.indexOf(e) + 1].focus()
    }
  })
})