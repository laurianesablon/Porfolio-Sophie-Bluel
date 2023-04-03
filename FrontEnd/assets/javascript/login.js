const form = document.querySelector("#loginForm");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const login = {
    email: email.value,
    password: password.value
  };

  console.log(login)

  fetch("http://localhost:5678/api/users/login", {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(login)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.token);
    //pas parfait car et si la personne change de mot de passe
    if(email.value === "sophie.bluel@test.tld" && password.value === "S0phie" ){
        window.location.href = "http://127.0.0.1:5500/FrontEnd/index.html"

    } else {
      email.style.border = "1px solid red"
      email.classList.add("shake");
      password.style.border = "1px solid red"
      password.classList.add("shake");
      form.addEventListener("animationend", () => {
        email.classList.remove("shake");
        form.classList.remove("shake");

      });
    }
    window.localStorage.setItem("token",`${data.token}`);
  })
  .catch(error => {
    console.error(error);
  });
});
