let modal;
let modalForm;
let addPictureBtn;
let realFormBtn;
let formContainer;
let removeGalleryModal;
let imgTitle;
let image;
const maxSize = 4000000;
let formData = new FormData();
let sizeError;
let preview = document.createElement("img");
let removeModalIcon;
let modalStart;

function displayModal() {
  modal = document.querySelector(".modale");
  modalStart = document.querySelector(".modaleStart");
  modalForm = document.querySelector(".modaleformContainer");
  let supprimer = document.querySelector(".supprimer");
  let ajoutphoto = document.querySelector(".ajoutphoto");
  removeModalIcon = document.querySelector(".fa-xmark");

  modal.showModal();
  modalForm.remove();
  removeModalIcon.addEventListener("click", closeModalIconClick);

  getWorks().then((works) => {
    showWorks(works);

    // Supprimer la galerie
    supprimer.addEventListener("click", deleteGallery);

    // Icône de fermeture (croix)

    ajoutphoto.addEventListener("click", ajoutPhotoClick);
  });
}
function createWorkFigure(work) {
  let modalImages = document.querySelector(".modale_images");
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
    modalImages.removeChild(figure);
  });
  modalImages.appendChild(figure);
  figure.appendChild(trash);
}

function showWorks(works) {
  for (let i = 0; i < works.length; i++) {
    createWorkFigure(works[i]);
  }
}

function deleteGallery() {
  removeGalleryModal = document.querySelector(".modale_supprimer");
  removeGalleryModal.showModal();
  let yesButton = document.querySelector("#oui");
  let noButton = document.querySelector("#non");

  noButton.addEventListener("click", deleteGalleryNoButton);
  yesButton.addEventListener("click", deleteGalleryYesButton);
}
function deleteGalleryNoButton() {
  removeGalleryModal.close();
}

function deleteGalleryYesButton() {
  getWorks().then((works) => {
    let loader = document.querySelector(".loader");
    loader.classList.add("remove"); // Affiche le loader
    works.forEach((work) => {
      deleteProject(work.id, () => {});
    });
    loader.remove(); // Supprime le loader
    modal.close();
    removeGalleryModal.close();
  });
}
function closeModalIconClick() {
  modalStart.remove();
  modalForm.remove();
  // Supprime les photos en sortant
  window.location.reload();
}

function ajoutPhotoClick() {
  modalStart.remove();
  modal.appendChild(modalForm);

  // Flèche de retour
  let arrow = document.querySelector(".fa-arrow-left");
  arrow.classList.remove("white");

  arrow.addEventListener("click", arrowClick);

  removeModalIcon.addEventListener("click", removeModalIconClick);
  addPictureBtn = document.querySelector("#ajoutphoto");

  addPictureBtn.addEventListener("click", addPictureBtnClick);
  realFormBtn = document.querySelector("#real_image_form");
  realFormBtn.addEventListener("change", realFormBtnChange);
  let valider = document.querySelector(".valider");

  valider.addEventListener("click", sendFormValuesToPost);
  removeModalIcon.addEventListener("click", closeModalIconClick);
}

function arrowClick() {
  modalForm.remove();
  modal.appendChild(modalStart);
}

function removeModalIconClick() {
  modal.remove();
  window.location.reload();
}

function addPictureBtnClick() {
  realFormBtn.click();
}

function showPreview(e) {
  let src = URL.createObjectURL(e.target.files[0]);
  preview.classList.add("preview");
  preview.src = src;
  let format = document.getElementById("format");

  format.remove();
  let imgContainerModal = document.getElementById("modaleForm_img");
  imgContainerModal.remove();
  addPictureBtn.remove();
  formContainer = document.querySelector(".modaleForm");
  formContainer.appendChild(preview);
}

function realFormBtnChange(e) {
  sizeError = document.querySelector(".erreur_taille");
  if (e.target.files[0].size >= maxSize) {
    sizeError.classList.remove("remove");
    preview.remove();
  } else {
    showPreview(e);
  }
}
function createForm() {
  sizeError = document.querySelector(".erreur_taille");
  if (image.size < maxSize) {
    sizeError.remove();

    // Crée le formulaire pour envoyer les données
    formData.append("image", image);
    formData.append("title", imgTitle);
    formData.append("category", imgOption);
  }

  // Envoie les données à l'API via une requête POST
  postWorks(token, formData);
}
function sendFormValuesToPost() {
  imgTitle = document.getElementById("input_title").value;
  image = document.getElementById("real_image_form").files[0];
  imgOption = document.getElementById("input_category").value;

  if (imgTitle && image !== undefined && imgOption !== "no-option") {
    createForm();
  } else {
    let FormErrorMessage = document.querySelector(".messageErreurFormulaire");

    FormErrorMessage.classList.remove("remove");
  }
}
