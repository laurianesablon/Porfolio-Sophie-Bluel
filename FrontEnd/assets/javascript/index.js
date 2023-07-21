let gallery = document.querySelector(".gallery");
let token = localStorage.token;

let selectCategoryOptions = document.getElementById("input_category");
let loader = document.querySelector(".loader");
let formContainer = document.querySelector(".modaleForm");
let valider = document.querySelector(".valider");
let image;
let titre;
let formData = new FormData();
let preview = document.createElement("img");
let format = document.getElementById("format");
let imgContainerModale = document.getElementById("modaleForm_img");
const maxSize = 4000000;
let modale = document.querySelector(".modale");
let modaleForm = document.querySelector(".modaleformContainer");
let modaleStart = document.querySelector(".modaleStart");
let modaleSupprimerGallerie = document.querySelector(".modale_supprimer");
let supprimer = document.querySelector(".supprimer");
let boutonOui = document.querySelector("#oui");
let boutonNon = document.querySelector("#non");
let filtres = document.querySelector(".filtres");
let modifierP = document.querySelector(".modifier_portfolio");
let loginLogout = document.querySelector(".loginLogout");
let authentified = localStorage.token;
let ajoutphoto = document.querySelector(".ajoutphoto");
let realFormBtn = document.querySelector("#real_image_form");
let ajoutphotoBtn = document.querySelector("#ajoutphoto");
let removeModalIcon = document.querySelector(".fa-xmark");
let messageErreurFormulaire = document.querySelector(
  ".messageErreurFormulaire"
);
window.addEventListener("load", () => {
  // Récupère les catégories et ajoute des options au menu déroulant
  getCategories();
  
});

// Affiche les images de la galerie
function afficherImages(filtre) {
  // Efface la galerie avant d'ajouter de nouvelles images
  gallery.innerHTML = "";
  for (let i = 0; i < filtre.length; i++) {
   
  }
}

// Gérer la page lorsqu'un utilisateur est connecté
if (authentified !== undefined) {
  modifierP.classList.remove("remove");

  // Supprimer les boutons de filtres
  filtres.remove();

  // Changer le lien "login" en "logout"
  loginLogout.textContent = "logout";
  loginLogout.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
  });

  modifierP.addEventListener("click", afficherModale);
}
