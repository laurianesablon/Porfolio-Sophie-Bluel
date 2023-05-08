gallery = document.querySelector(".gallery");
token = localStorage.token;
let objets = document.querySelector(".objets");
let apparts = document.querySelector(".appart");
let hotel = document.querySelector(".hotel");
let tous = document.querySelector(".tous");
let select_category_options = document.getElementById("input_category");

//TODO
//Revoir le nom des variables
// Separer mon code en petites fonctions/fichier (modale, filtre...)
//mettre fonctions et addeventlistener en racine
//creer un fichier dans lequel faire tout mes calls (creer 5 fonctions pour mes 5 calls api )

window.addEventListener("load", () => {
  getCategories().then((data) => {
    data.forEach((categorie) => {
      let option = document.createElement("option");
      option.value = categorie.id;
      option.text = categorie.name;
      select_category_options.add(option);
    });
  });
});

//Affiche les images de la galerie
function afficherImages(filtre) {
  // Clear the gallery before appending new images
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
  afficherImages(works);
  Filtres(works);
});

let authentified = localStorage.token;
console.log(authentified);
//gerer la page lorsque connecté
if (authentified !== undefined) {
  let filtres = document.querySelector(".filtres");
  let modifierP = document.querySelector(".modifier_portfolio");
  let modifierI = document.querySelector(".modifier_introduction");
  modifierI.addEventListener("click", () => {
    modifierP.click();
  });
  modifierP.classList.remove("remove");
  modifierI.classList.remove("remove");

  //retirer les bouttons filtres
  filtres.remove();

  // changer le lien login en logout
  let link_login = document.querySelector(".link_login");
  link_login.textContent = "logout";
  link_login.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
  });
  //afficher la modale lorsque je clique sur modifier
  modifierP.addEventListener("click", () => {
    let modale = document.querySelector(".modale");
    let modale_form = document.querySelector(".modale_form_container");
    let modale_start = document.querySelector(".modale_start");
    let modale_supprimer_gallerie = document.querySelector(".modale_supprimer"
    );
    //modale_supprimer_gallerie.close();
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
        //bouton poubelle (delete)
        trash.src = "./assets/icons/trash.svg";
        trash.classList.add("modale_image_trash");

        trash.addEventListener("click", () => {
          deleteProject(works[i].id);
          // Remove the work from the DOM
          modale_images.removeChild(figure);
          //reload the page

        });
        modale_images.appendChild(figure);
        figure.appendChild(trash);
      }
      //supprimer la galerie
      let supprimer = document.querySelector(".supprimer");
      let bouton_oui = document.querySelector("#oui");
      let bouton_non = document.querySelector("#non");

      supprimer.addEventListener("click", () => {
        modale_supprimer_gallerie.showModal();
        bouton_non.addEventListener('click', ()=> {
          modale_supprimer_gallerie.close()
        })


        bouton_oui.addEventListener("click", () => {
          works.forEach((work) => {
            deleteProject(work.id);
          });
        });
      });

      //icone croix
      remove_modal_icon = document.querySelector(".fa-xmark");
      remove_modal_icon.addEventListener("click", () => {
        modale_start.remove();
        modale_form.remove();

        //supprimer les photos en sortant
        modale_images.innerHTML = "";
        window.location.reload();
      });
      let modale = document.querySelector(".modale");
      let ajout_photo = document.querySelector(".ajout_photo");

      ajout_photo.addEventListener("click", () => {
        modale_start.remove();
        modale.appendChild(modale_form);
        //fleche retour
        let fleche = document.querySelector(".fa-arrow-left");
        fleche.classList.remove("white");
        fleche.addEventListener("click", () => {
          modale_form.remove();
          modale.appendChild(modale_start);
        });
        let real_form_btn = document.querySelector("#real_image_form");
        let ajout_photo_btn = document.querySelector("#ajout_photo");
        remove_modal_icon = document.querySelector(".fa-xmark");
        remove_modal_icon.addEventListener("click", () => {
          modale.remove();
          window.location.reload();
        });
        ajout_photo_btn.addEventListener("click", () => {
          real_form_btn.click();
        });
        // envoi du formulaire
        image_input = document.querySelector("#real_image_form");
        form_container = document.querySelector(".modale_form");
        let valider = document.querySelector(".valider");
        let image;
        let titre;
        let formData = new FormData();
        let preview = document.createElement("img");
        let format = document.getElementById("format");
        let img_container_modale = document.getElementById("modale_form_img");
        let maxSize = 4000000;

        //montrer la preview de l'image
        function showPreview(e) {
          let src = URL.createObjectURL(e.target.files[0]);
          preview.classList.add("preview");
          console.log(src);
          preview.src = src;

          format.remove();
          img_container_modale.remove();
          ajout_photo_btn.remove();
          form_container.appendChild(preview);
        }

        real_form_btn.addEventListener("change", (e) => {
          showPreview(e);
        });

        function createForm() {
          if (image.size < maxSize) {
            // Création du formulaire pour l'envoi des données
            formData.append("image", image);
            formData.append("title", titre);
            formData.append("category", option);
            console.log("creation du form");
          } else {
            // Affichage d'un message d'erreur si la taille de l'image est trop grande
            let erreur_taille = document.querySelector(".erreur_taille");
            console.log("erreur");
            erreur_taille.classList.remove("remove");
            image.value = null;
            preview.remove();
            form_container.appendChild(img_container_modale);
            form_container.appendChild(ajout_photo_btn);
            form_container.appendChild(format);
          }
          // Envoi des données à l'API via une requête POST
          postWorks(token, formData);

        }

        valider.addEventListener("click", () => {
          function envoiRequete() {
            titre = document.getElementById("input_title").value;
            image = document.getElementById("real_image_form").files[0];
            option = document.getElementById("input_category").value;

            if (
              titre !== undefined &&
              image !== undefined &&
              option !== undefined
            ) {
              createForm();
            } else {
              console.log("Veuillez remplir tout le formulaire");
            }
          }
          envoiRequete();
        });
      });
    });
  });
}
