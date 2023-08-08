const form = document.querySelector("#loginForm");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const login = {
    email: email.value,
    password: password.value,
  };

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(login),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.userId === 1) {
        window.location.href = "index.html";
        window.sessionStorage.setItem("token", `${data.token}`);
      } else {
        email.style.border = "1px solid red";
        email.classList.add("shake");
        password.style.border = "1px solid red";
        password.classList.add("shake");
        let message_erreur = document.querySelector(".message_erreur_login");
        message_erreur.classList.remove("remove");

        form.addEventListener("animationend", () => {
          email.classList.remove("shake");
          password.classList.remove("shake");
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
});


