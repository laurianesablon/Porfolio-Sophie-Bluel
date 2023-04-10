gallery = document.querySelector(".gallery");
const objets = document.querySelector(".objets");
const apparts = document.querySelector(".appart");
const hotel = document.querySelector(".hotel");
const tous = document.querySelector(".tous");
//Affiche les images

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    const works = data;
    function afficherImage(filtre) {
      // Clear the gallery before appending new images
      gallery.innerHTML = "";
      for (let i = 0; i < filtre.length; i++) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
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
        const objetFiltre = works.filter((work) => {
          objets.classList.add("buttonSelected");
          hotel.classList.remove("buttonSelected");
          apparts.classList.remove("buttonSelected");
          tous.classList.remove("buttonSelected");
          return work.category.name === "Objets";
        });
        afficherImage(objetFiltre);
      });

      apparts.addEventListener("click", () => {
        const appartFiltre = works.filter((work) => {
          apparts.classList.add("buttonSelected");
          hotel.classList.remove("buttonSelected");
          tous.classList.remove("buttonSelected");
          objets.classList.remove("buttonSelected");

          return work.category.name === "Appartements";
        });
        afficherImage(appartFiltre);
      });

      hotel.addEventListener("click", () => {
        const hotelFiltre = works.filter((work) => {
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
const authentified = localStorage.token;
//gerer la page lorsque connecté
filtres = document.querySelector("#filtres");
if (authentified !== undefined) {
  const modifierP = document.querySelector(".modifier_portfolio");
  const modifierI = document.querySelector(".modifier_introduction");

  modifierP.classList.remove("remove");
  modifierI.classList.remove("remove");

  //retirer les bouttons filtres
  tous.remove();
  objets.remove();
  apparts.remove();
  hotel.remove();
  // changer le lien login en logout
  const link_login = document.querySelector(".link_login a");
  link_login.textContent = "logout";
  link_login.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.clear();
    window.location.reload();
  });
  //afficher la modale lorsque je clique sur modifier
  modifierP.addEventListener("click", () => {
    const modale = document.querySelector(".modale");
    modale.classList.remove("remove");
    const modale_images = document.querySelector(".modale_container_images");
    fetch("http://localhost:5678/api/works")
      .then((response) => response.json())
      .then((data) => {
        const works = data;
        for (let i = 0; i < works.length; i++) {
          const figure = document.createElement("figure");
          const img = document.createElement("img");
          const trash = document.createElement("img");
          img.src = works[i].imageUrl;
          img.classList.add("modale_image");
          figure.appendChild(img);
          //bouton poubelle (delete)
          trash.src = "./assets/icons/trash.svg";
          trash.classList.add("modale_image_trash");
          trash.addEventListener("click", () => {
            console.log(works[i].id);
            deleteProject(works[i].id);
            // Remove the work from the DOM
            modale_images.removeChild(figure);
          });
          modale_images.appendChild(figure);
          figure.appendChild(trash);
        }
        //icone croix retour
        icone_retour = document.querySelector(".fa-xmark");
        icone_retour.addEventListener("click", () => {
          modale.classList.add("remove");
          //supprimer les photos en sortant
          modale_images.innerHTML = "";
          window.location.reload();
        });
        const ajout_photo = document.querySelector(".ajout_photo");
        ajout_photo.addEventListener("click", () => {
          const modale_start = document.querySelector(".modale_start");
          const modale_form = document.querySelector(".modale_form");
          modale_start.remove();
          modale_form.classList.remove("remove");
          const real_form_btn = document.querySelector("#real_image_form");
          const ajout_photo_btn = document.querySelector("#ajout_photo");
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
          const photo = document.getElementById("ajout_photo");
          const category = document.getElementById("input_category");
          const title = document.getElementById("input_title");
          image_input.addEventListener("change", () => {
            fetch("http://localhost:5678/api-docs/#/default/get_categories")
              .then((response) => response.json())
              .then((data) => {
                const categories = data;
                console.log(categories)
                // Parcours de la liste des catégories pour récupérer l'id correspondant à la catégorie sélectionnée
                for (let i = 0; i < categories.length; i++) {
                  if (category.value === categories[i].name) {
                    categories[i].name = categories[i].id;
                  }
                }
                // Récupération de l'image et du titre
                const image = document.getElementById("real_image_form").files[0];
                const titre = document.getElementById("input_title").value;
                console.log(image);
                // Vérification de la taille de l'image
                if (image.size < maxSize) {
                  // Création du formulaire pour l'envoi des données
                  const formData = new FormData();
                  formData.append("image", image);
                  formData.append("title", titre);
                  formData.append("category", categories[i].id);

                  // Envoi des données à l'API via une requête POST
                  fetch("http://localhost:5678/api/works", {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${token}`,
                      accept: "application/json",
                    },
                    body: formData,
                  })
                    .then((response) => {
                      if (response.ok) {
                        console.log("Work successfully created");
                        // Redirect to the works page
                        window.location.href = "/works.html";
                      } else {
                        throw new Error("Error creating work");
                      }
                    })
                    .catch((error) => console.error(error));
                } else {
                  // Affichage d'un message d'erreur si la taille de l'image est trop grande
                  erreur_taille = document.querySelector("#erreur_taille")
                  erreur_taille.classList.remove("remove")
                }
              })

            });
        });
      })
      .catch((error) => console.error(error));
  });

  function deleteProject(id) {
    fetch("http://localhost:5678/api/works/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const figure_gallery = document.querySelector("#work-" + id);
        console.log(figure_gallery);
        if (figure_gallery) {
          figure_gallery.remove();
        }
      })
      .catch((err) => console.log("Il y a un problème : " + err));
  }
}
