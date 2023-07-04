function afficherModale() {
    modale.showModal();
    modaleForm.remove();
    let modale_images = document.querySelector(".modale_images");
    getWorks().then((works) => {
      for (let i = 0; i < works.length; i++) {
        let figure = document.createElement("figure");
        let img = createWorkImg(works[i]);
        let trash = document.createElement("img");
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
        modaleSupprimerGallerie.showModal();
        boutonNon.addEventListener("click", () => {
          modaleSupprimerGallerie.close();
        });

        boutonOui.addEventListener("click", () => {
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
        });
        window.location.reload();
      });

      // Icône de fermeture (croix)
      removeModalIcon.addEventListener("click", () => {
        modaleStart.remove();
        modaleForm.remove();

        // Supprime les photos en sortant
        modale_images.innerHTML = "";
        window.location.reload();
      });

      ajoutphoto.addEventListener("click", () => {
        modaleStart.remove();
        modale.appendChild(modaleForm);

        // Flèche de retour
        let fleche = document.querySelector(".fa-arrow-left");
        fleche.classList.remove("white");
        fleche.addEventListener("click", () => {
          modaleForm.remove();
          modale.appendChild(modaleStart);
        });

        removeModalIcon.addEventListener("click", () => {
          modale.remove();
          window.location.reload();
        });
        ajoutphotoBtn.addEventListener("click", () => {
          realFormBtn.click();
        });

        // Affiche un aperçu de l'image
        function showPreview(e) {
          
          let src = URL.createObjectURL(e.target.files[0]);
          preview.classList.add("preview");
          preview.src = src;
          format.remove();
          imgContainerModale.remove();
          ajoutphotoBtn.remove();
          formContainer.appendChild(preview);
        }
        let erreur_taille = document.querySelector(".erreur_taille");

        realFormBtn.addEventListener("change", (e) => {

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
            messageErreurFormulaire.classList.remove("remove");
          }
        }
        valider.addEventListener("click", () => {
          envoiRequete();
        });
      });
    });
  }