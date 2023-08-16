let authentified = sessionStorage.token;

window.addEventListener("load", () => {
  displayWorksInGallery();
  if (!authentified) {
    displayFiltersAboveGallery();
  } else {
    getCategories();
    let modifyBtn = document.querySelector(".modifier_portfolio");
    modifyBtn.classList.remove ("remove");
  // Supprimer les boutons de filtres
  let filters = document.querySelector(".filtres");
  filters.remove();
  ;

  // Changer le lien "login" en "logout"
  let loginLogout = document.querySelector(".loginLogout");
  loginLogout.textContent = "logout";
  loginLogout.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.reload();
  });

  modifyBtn.addEventListener("click", displayModal);
  }
});
window.addEventListener("load", () => {
  getWorks();
});



function displayWorksInGallery() {
  let gallery = document.querySelector(".gallery");
  fetchWorks().then((works) => {
    works.forEach((element) => {
      let figure = document.createElement("figure");
      let img = createWorkImg(element);
      let figcaption = document.createElement("figcaption");
      figcaption.textContent = element.title;
      figure.id = "work-" + element.id;
      figure.dataset.categoryId = element.categoryId;
      figure.classList.add("gallery_work");
      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    });
  });
}

function displayFiltersAboveGallery() {
  let filtreContainer = document.querySelector(".filtres");
  fetchCategories().then((categories) => {
    categories.unshift({
      id: 0,
      name: "Tous",
    });
    categories.forEach((categorie) => {
      let button = document.createElement("button");
      button.className = categorie.name;
      button.classList.add("filter_buttons");
      button.innerHTML = categorie.name;
      button.dataset.categoryId = categorie.id;
      filtreContainer.appendChild(button);

      button.addEventListener("click", displayWorksByCategoryId);
      button.addEventListener("click", displaySelectedButtons)
    });

  });
}

function displaySelectedButtons(e) {
  let buttons = document.querySelectorAll(".filter_buttons");
  let id = e.target.dataset.categoryId;

  Array.from(buttons).map((button) => {
    if (button.dataset.categoryId == id ) {
      button.classList.add("buttonSelected");
    } else {
      button.classList.remove("buttonSelected");

    }
  })
  
  
  }
function displayWorksByCategoryId(e) {
  //récupérer la catégorie id du bouton sur lequel tu as cliqué
  let id = e.target.dataset.categoryId;
  let figures = document.getElementsByClassName("gallery_work");
  Array.from(figures).map((figure) => {
    if (figure.dataset.categoryId == id || id == 0) {
      figure.style.display = "block";
    } else {
      figure.style.display = "none";
    }
  });
}
function fetchWorks() {
  return fetch("http://localhost:5678/api/works")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch((error) => console.error(error));
}

function fetchCategories() {
  return fetch("http://localhost:5678/api/categories")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch((error) => console.error(error));
}
