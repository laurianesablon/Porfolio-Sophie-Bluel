gallery = document.querySelector(".gallery");

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
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
      }
    }

    const objets = document.querySelector(".objets");
    const apparts = document.querySelector(".appart");
    const hotel = document.querySelector(".hotel");
    const tous = document.querySelector(".tous");
    
    //Boutons filtres
    function filtres() {
      objets.addEventListener("click", () => {
        const objetFiltre = works.filter((work) => {
          objets.classList.add("buttonSelected")
          hotel.classList.remove("buttonSelected")
          apparts.classList.remove("buttonSelected")
          tous.classList.remove("buttonSelected")
          return work.category.name === "Objets";
        });
        afficherImage(objetFiltre);
      });

      apparts.addEventListener("click", () => {
        const appartFiltre = works.filter((work) => {
          apparts.classList.add("buttonSelected")
          hotel.classList.remove("buttonSelected")
          tous.classList.remove("buttonSelected")
          objets.classList.remove("buttonSelected")

          return work.category.name === "Appartements";
        });
        afficherImage(appartFiltre);
      });
      
      hotel.addEventListener("click", () => {
        const hotelFiltre = works.filter((work) => {
          hotel.classList.add("buttonSelected")
          tous.classList.remove("buttonSelected")
          apparts.classList.remove("buttonSelected")
          objets.classList.remove("buttonSelected")

          return work.category.name === "Hotels & restaurants";
        });
        afficherImage(hotelFiltre);
      });

      tous.addEventListener("click", () => {
        // Clear the gallery before showing all images
        tous.classList.add("buttonSelected")
        hotel.classList.remove("buttonSelected")
        apparts.classList.remove("buttonSelected")
        objets.classList.remove("buttonSelected")




        gallery.innerHTML = "";
        afficherImage(works);
      });
    }

    filtres();
    afficherImage(works); // display all images at the beginning

  })
  .catch((error) => console.error(error));