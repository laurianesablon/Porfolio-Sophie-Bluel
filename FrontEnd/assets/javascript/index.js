gallery = document.querySelector(".gallery");
let objets = document.querySelector(".objets");
let apparts = document.querySelector(".appart");
let hotel = document.querySelector(".hotel");
let tous = document.querySelector(".tous");
token = localStorage.token;
let select = document.getElementById("input_category");

window.addEventListener("load", () => {
  fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((categorie) => {
        let option = document.createElement("option");
        option.value = categorie.id;
        option.text = categorie.name;
        select.add(option);
      });
    });
});

function deleteProject(id) {
  fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let figure_gallery = document.querySelector("#work-" + id);
      console.log(figure_gallery);
      if (figure_gallery) {
        figure_gallery.remove();
      }
    })
    .catch((err) => console.log("Il y a un problème : " + err));
}
//Affiche les images

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    let works = data;
    function afficherImage(filtre) {
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

    //Boutons filtres:  très mal écrit, à optimiser
    function filtres() {
      objets.addEventListener("click", () => {
        let objetFiltre = works.filter((work) => {
          objets.classList.add("buttonSelected");
          hotel.classList.remove("buttonSelected");
          apparts.classList.remove("buttonSelected");
          tous.classList.remove("buttonSelected");
          return work.category.name === "Objets";
        });
        afficherImage(objetFiltre);
      });

      apparts.addEventListener("click", () => {
        let appartFiltre = works.filter((work) => {
          apparts.classList.add("buttonSelected");
          hotel.classList.remove("buttonSelected");
          tous.classList.remove("buttonSelected");
          objets.classList.remove("buttonSelected");

          return work.category.name === "Appartements";
        });
        afficherImage(appartFiltre);
      });

      hotel.addEventListener("click", () => {
        let hotelFiltre = works.filter((work) => {
          hotel.classList.add("buttonSelected");
          tous.classList.remove("buttonSelected");
          apparts.classList.remove("buttonSelected");
          objets.classList.remove("buttonSelected");

          return work.category.name === "Hotels & restaurants";
        });
        afficherImage(hotelFiltre);
      });

      tous.addEventListener("click", () => {
        // Clear the gallery before showing all images
        tous.classList.add("buttonSelected");
        hotel.classList.remove("buttonSelected");
        apparts.classList.remove("buttonSelected");
        objets.classList.remove("buttonSelected");

        gallery.innerHTML = "";
        afficherImage(works);
      });
    }

    filtres();
    afficherImage(works); // display all images at the beginning
  })
  .catch((error) => console.error(error));

let authentified = localStorage.token;
console.log(authentified);

//gerer la page lorsque connecté
filtres = document.querySelector("#filtres");
if (authentified !== undefined) {
  let modifierP = document.querySelector(".modifier_portfolio");
  let modifierI = document.querySelector(".modifier_introduction");
  modifierI.addEventListener("click", () => {
    modifierP.click();
  });
  modifierP.classList.remove("remove");
  modifierI.classList.remove("remove");

  //retirer les bouttons filtres
  tous.remove();
  objets.remove();
  apparts.remove();
  hotel.remove();
  // changer le lien login en logout
  let link_login = document.querySelector(".link_login a");
  link_login.textContent = "logout";
  link_login.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.clear();
    window.location.reload();
  });
  //afficher la modale lorsque je clique sur modifier
  modifierP.addEventListener("click", () => {
    let modale = document.querySelector(".modale");
    modale.classList.remove("remove");
    let modale_images = document.querySelector(".modale_container_images");
    fetch("http://localhost:5678/api/works")
      .then((response) => response.json())
      .then((data) => {
        let works = data;
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
          });
          modale_images.appendChild(figure);
          figure.appendChild(trash);
        }
        //supprimer la galerie
        let supprimer = document.querySelector(".supprimer");
        supprimer.addEventListener("click", () => {
          let modale_supprimer = document.querySelector(".modale_supprimer");
          let message_supprimer = document.querySelector(".message_supprimer");
          message_supprimer.classList.remove("remove");
          supprimer.setAttribute("id", "oui");
          supprimer.textContent = "OUI JE SUIS SÛR(E)";

          supprimer.addEventListener("click", () => {
            works.forEach((work) => {
              deleteProject(work.id);
            });
          });
        });

        //icone croix retour
        icone_retour = document.querySelector(".fa-xmark");
        icone_retour.addEventListener("click", () => {
          let modale_form = document.querySelector(".modale_form");
          modale_form.classList.add("remove");
          //supprimer les photos en sortant
          modale_images.innerHTML = "";
          window.location.reload();
        });
        let ajout_photo = document.querySelector(".ajout_photo");
        ajout_photo.addEventListener("click", () => {
          let modale_start = document.querySelector(".modale_start");
          let modale_form = document.querySelector(".modale_form");
          modale_start.remove();
          modale_form.classList.remove("remove");
          //fleche retour
          let fleche = document.querySelector(".fa-arrow-left");
          fleche.classList.remove("white");
          fleche.addEventListener("click", () => {
            modale_form.remove();
            const modale_container =
              document.querySelector(".modale_container");
            modale_container.appendChild(modale_start);
          });
          let real_form_btn = document.querySelector("#real_image_form");
          let ajout_photo_btn = document.querySelector("#ajout_photo");
          icone_retour = document.querySelector(".fa-xmark");
          icone_retour.addEventListener("click", () => {
            modale.classList.add("remove");
          });
          ajout_photo_btn.addEventListener("click", () => {
            real_form_btn.click();
          });
          // envoi du formulaire
          image_input = document.querySelector("#real_image_form");
          form_container = document.querySelector(".modale_container_form");
          let photo = document.getElementById("ajout_photo");
          let category = document.getElementById("input_category");
          let title = document.getElementById("input_title");
          let valider = document.querySelector(".valider");
          let image;
          let titre;
          let formData = new FormData();
          let preview = document.createElement("img");
          let format = document.getElementById("format");
          let img_container_modale = document.getElementById(
            "modale_container_form_img"
          );
          let maxSize = 4000000;
          let category_inputed = 0;

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
            fetch("http://localhost:5678/api/works", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json",
              },
              body: formData,
            }).catch((error) => console.error(error));
          }

          valider.addEventListener("click", () => {
            function envoiRequete() {
              titre = document.getElementById("input_title").value;
              image = document.getElementById("real_image_form").files[0];
              console.log(image);
              option = document.getElementById("input_category").value;

              console.log(titre);
              console.log(image);
              console.log(option);

              if (
                titre !== undefined &&
                image !== undefined &&
                option !== undefined
              ) {
                createForm();
              } else {
                console.log("error");
              }
            }
            envoiRequete();
          });
        });
      });
  });
}
