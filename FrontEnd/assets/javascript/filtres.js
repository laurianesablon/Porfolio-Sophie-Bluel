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
    
function filtres(works) {
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