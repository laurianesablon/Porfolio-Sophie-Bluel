let gallery = document.querySelector(".gallery");
let token = localStorage.token;
let objets = document.querySelector(".objets");
let apparts = document.querySelector(".appart");
let hotel = document.querySelector(".hotel");
let tous = document.querySelector(".tous");
let select_category_options = document.getElementById("input_category");
let loader = document.querySelector(".loader");
let form_container = document.querySelector(".modale_form");
let valider = document.querySelector(".valider");
let image;
let titre;
let formData = new FormData();
let preview = document.createElement("img");
let format = document.getElementById("format");
let img_container_modale = document.getElementById("modale_form_img");
const maxSize = 4000000;
let modale = document.querySelector(".modale");
let modale_form = document.querySelector(".modale_form_container");
let modale_start = document.querySelector(".modale_start");
let modale_supprimer_gallerie = document.querySelector(".modale_supprimer");
let supprimer = document.querySelector(".supprimer");
let bouton_oui = document.querySelector("#oui");
let bouton_non = document.querySelector("#non");
let filtres = document.querySelector(".filtres");
let modifierP = document.querySelector(".modifier_portfolio");
let link_login = document.querySelector(".link_login");
let authentified = localStorage.token;
let ajout_photo = document.querySelector(".ajout_photo");
let real_form_btn = document.querySelector("#real_image_form");
let ajout_photo_btn = document.querySelector("#ajout_photo");
let remove_modal_icon = document.querySelector(".fa-xmark");
let message_erreur_formulaire = document.querySelector(".message_erreur_formulaire");

window.addEventListener("load", () => {
  // Récupère les catégories et ajoute des options au menu déroulant
  getCategories().then((data) => {
    data.forEach((categorie) => {
      let option = document.createElement("option");
      option.value = categorie.id;
      option.text = categorie.name;
      select_category_options.add(option);
    });
  });
});

// Affiche les images de la galerie
function afficherImages(filtre) {
  // Efface la galerie avant d'ajouter de nouvelles images
  gallery.innerHTML = "";
  for (let i = 0; i < filtre.length; i++) {
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let figcaption = document.createElement("figcaption");
    img.src = filtre[i].imageUrl;
    img.alt = filtre[i].title;
    figcaption.textContent = filtre[i].title;
    figure.id = "work-" + filtre[i].id;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  }
}

getWorks().then((works) => {
  // Affiche les images lors du chargement de la page
  afficherImages(works);
  Filtres(works);
});

// Gérer la page lorsqu'un utilisateur est connecté
if (authentified !== undefined) {
  modifierP.classList.remove("remove");

  // Supprimer les boutons de filtres
  filtres.remove();

  // Changer le lien "login" en "logout"
  link_login.textContent = "logout";
  link_login.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
  });

  function showModale() {
    modale.showModal();
    modale_form.remove();
    let modale_images = document.querySelector(".modale_images");
    getWorks().then((works) => {
      for (let i = 0; i < works.length; i++) {
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let trash = document.createElement("img");
        img.src = works[i].imageUrl;
        img.classList.add("modale_image");
        figure.appendChild(img);

        // Bouton poubelle (delete)
        trash.src = "./assets/icons/trash.svg";
        trash.classList.add("modale_image_trash");

        trash.addEventListener("click", () => {
          deleteProject(works[i].id);

          // Supprime l'œuvre du DOM
          modale_images.removeChild(figure);
        });
        modale_images.appendChild(figure);
        figure.appendChild(trash);
      }
      // Supprimer la galerie

      supprimer.addEventListener("click", () => {
        modale_supprimer_gallerie.showModal();
        bouton_non.addEventListener("click", () => {
          modale_supprimer_gallerie.close();
        });

        bouton_oui.addEventListener("click", () => {
          let numWorks = works.length;
          let i = 0;
          loader.classList.add("remove"); // Affiche le loader
          works.forEach((work) => {
            deleteProject(work.id, () => {
              i++;
              if (i === numWorks) {
                loader.remove(); // Supprime le loader
                modale.close();
                modale_supprimer_gallerie.close();
              }
            });
          });
        });
        window.location.reload();
      });

      // Icône de fermeture (croix)
      remove_modal_icon.addEventListener("click", () => {
        modale_start.remove();
        modale_form.remove();

        // Supprime les photos en sortant
        modale_images.innerHTML = "";
        window.location.reload();
      });

      ajout_photo.addEventListener("click", () => {
        modale_start.remove();
        modale.appendChild(modale_form);

        // Flèche de retour
        let fleche = document.querySelector(".fa-arrow-left");
        fleche.classList.remove("white");
        fleche.addEventListener("click", () => {
          modale_form.remove();
          modale.appendChild(modale_start);
        });

        remove_modal_icon.addEventListener("click", () => {
          modale.remove();
          window.location.reload();
        });
        ajout_photo_btn.addEventListener("click", () => {
          real_form_btn.click();
        });

        // Affiche un aperçu de l'image
        function showPreview(e) {
          let src = URL.createObjectURL(e.target.files[0]);
          preview.classList.add("preview");
          preview.src = src;
          format.remove();
          img_container_modale.remove();
          ajout_photo_btn.remove();
          form_container.appendChild(preview);
        }
        let erreur_taille = document.querySelector(".erreur_taille");

        real_form_btn.addEventListener("change", (e) => {
          if (e.target.files[0].size >= maxSize) {
            erreur_taille.classList.remove("remove");
            preview.remove();
          } else {
            showPreview(e);
          }
        });

        function createForm() {
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
            message_erreur_formulaire.classList.remove("remove");
          }
        }
        valider.addEventListener("click", () => {
          envoiRequete();
        });
      });
    });
  }
  modifierP.addEventListener("click", showModale);
}
