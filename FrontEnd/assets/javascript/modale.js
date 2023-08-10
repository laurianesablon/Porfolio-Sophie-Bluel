let modale;
let modaleForm;
let ajoutphotoBtn;
let realFormBtn;
let formContainer;
let modaleSupprimerGallerie;
let titre;
let image;
const maxSize = 4000000;
let formData = new FormData();
let erreur_taille;
let preview = document.createElement("img");
let removeModalIcon = document.querySelector(".fa-xmark");
console.log(removeModalIcon);

function afficherModale() {
  modale = document.querySelector(".modale");
  modaleForm = document.querySelector(".modaleformContainer");
  let supprimer = document.querySelector(".supprimer");
  let ajoutphoto = document.querySelector(".ajoutphoto");

  modale.showModal();
  modaleForm.remove();

  getWorks().then((works) => {
    showWorks(works);

    // Supprimer la galerie
    supprimer.addEventListener("click", SupprimerClick);

    // Icône de fermeture (croix)
    removeModalIcon.addEventListener("click", CloseModalIconClick);

    ajoutphoto.addEventListener("click", AjoutPhotoClick);
  });
}
function createWorkFigure(work) {
  let modale_images = document.querySelector(".modale_images");
  let figure = document.createElement("figure");
  let img = createWorkImg(work);
  let trash = document.createElement("img");
  img.classList.add("modale_image");
  figure.appendChild(img);

  // Bouton poubelle (delete)
  trash.src = "./assets/icons/trash.svg";
  trash.classList.add("modale_image_trash");

  trash.addEventListener("click", () => {
    deleteProject(work.id);

    // Supprime l'œuvre du DOM
    modale_images.removeChild(figure);
  });
  modale_images.appendChild(figure);
  figure.appendChild(trash);
}

function showWorks(works) {
  for (let i = 0; i < works.length; i++) {
    createWorkFigure(works[i]);
  }
}

function SupprimerClick() {
  modaleSupprimerGallerie = document.querySelector(".modale_supprimer");
  modaleSupprimerGallerie.showModal();
  let boutonOui = document.querySelector("#oui");
  let boutonNon = document.querySelector("#non");

  boutonNon.addEventListener("click", BoutonNonClick);
  boutonOui.addEventListener("click", BoutonOuiClick);
}
function BoutonNonClick() {
  modaleSupprimerGallerie.close();
}

function BoutonOuiClick() {
  getWorks().then((works) => {
    let loader = document.querySelector(".loader");
    loader.classList.add("remove"); // Affiche le loader
    works.forEach((work) => {
      deleteProject(work.id, () => {});
    });
    loader.remove(); // Supprime le loader
    modale.close();
    modaleSupprimerGallerie.close();
  });
}
function CloseModalIconClick() {
  modaleStart.remove();
  modaleForm.remove();

  let modale_images = document.querySelector(".modale_images");

  // Supprime les photos en sortant
  window.location.reload();
}

function AjoutPhotoClick() {
  let modaleStart = document.querySelector(".modaleStart");

  modaleStart.remove();
  modale.appendChild(modaleForm);

  // Flèche de retour
  let fleche = document.querySelector(".fa-arrow-left");
  fleche.classList.remove("white");

  fleche.addEventListener("click", FlecheClick);

  removeModalIcon.addEventListener("click", RemoveModalIconClick);
  ajoutphotoBtn = document.querySelector("#ajoutphoto");

  ajoutphotoBtn.addEventListener("click", AjoutPhotoBtnClick);
  realFormBtn = document.querySelector("#real_image_form");
  realFormBtn.addEventListener("change", RealFormBtnChange);
  let valider = document.querySelector(".valider");

  valider.addEventListener("click", ValiderClick);
}

function FlecheClick() {
  modaleForm.remove();
  modale.appendChild(modaleStart);
}

function RemoveModalIconClick() {
  modale.remove();
  window.location.reload();
}

function AjoutPhotoBtnClick() {
  realFormBtn.click();
}

function showPreview(e) {
  let src = URL.createObjectURL(e.target.files[0]);
  preview.classList.add("preview");
  preview.src = src;
  let format = document.getElementById("format");

  format.remove();
  let imgContainerModale = document.getElementById("modaleForm_img");
  imgContainerModale.remove();
  ajoutphotoBtn.remove();
  formContainer = document.querySelector(".modaleForm");
  formContainer.appendChild(preview);
}

function RealFormBtnChange(e) {
  erreur_taille = document.querySelector(".erreur_taille");
  if (e.target.files[0].size >= maxSize) {
    erreur_taille.classList.remove("remove");
    preview.remove();
  } else {
    showPreview(e);
  }
}
function createForm() {
  erreur_taille = document.querySelector(".erreur_taille");
  if (image.size < maxSize) {
    erreur_taille.remove();

    // Crée le formulaire pour envoyer les données
    formData.append("image", image);
    formData.append("title", titre);
    formData.append("category", option);
  }

  // Envoie les données à l'API via une requête POST
  postWorks(token, formData);
}
function envoiRequete() {

  titre = document.getElementById("input_title").value;
  image = document.getElementById("real_image_form").files[0];
  option = document.getElementById("input_category").value;

  if (titre && image !== undefined && option !== "no-option") {
    createForm();
  } else {
    let messageErreurFormulaire = document.querySelector(
      ".messageErreurFormulaire"
    );

    messageErreurFormulaire.classList.remove("remove");
  }
}

function ValiderClick() {
  envoiRequete();
}
