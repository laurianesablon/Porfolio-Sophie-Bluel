function afficherModale() {
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
  modaleSupprimerGallerie.showModal();

  boutonNon.addEventListener("click", BoutonNonClick);
}
function BoutonNonClick() {
  modaleSupprimerGallerie.close();
}

function BoutonOuiClick(works) {
  let numWorks = works.length;
  let i = 0;
  loader.classList.add("remove"); // Affiche le loader
  works.forEach((work) => {
    deleteProject(work.id, () => {
      i++;
      if (i === numWorks) {
        loader.remove(); // Supprime le loader
        modale.close();
        modaleSupprimerGallerie.close();
      }
    });
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
  modaleStart.remove();
  modale.appendChild(modaleForm);

  // Flèche de retour
  let fleche = document.querySelector(".fa-arrow-left");
  fleche.classList.remove("white");

  fleche.addEventListener("click", FlecheClick);
  removeModalIcon.addEventListener("click", RemoveModalIconClick);
  ajoutphotoBtn.addEventListener("click", AjoutPhotoBtnClick);
  realFormBtn.addEventListener("change", RealFormBtnChange);
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
  format.remove();
  imgContainerModale.remove();
  ajoutphotoBtn.remove();
  formContainer.appendChild(preview);
}

function RealFormBtnChange(e) {
  if (e.target.files[0].size >= maxSize) {
    erreur_taille.classList.remove("remove");
    preview.remove();
  } else {
    showPreview(e);
  }
}
function createForm() {
  let erreur_taille = document.querySelector(".erreur_taille");
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
    messageErreurFormulaire.classList.remove("remove");
  }
}

function ValiderClick() {
  envoiRequete();
}
