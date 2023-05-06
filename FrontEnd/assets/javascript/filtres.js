function Filtres(works) {
  objets.addEventListener("click", () => {
    let objetFiltre = works.filter((work) => {
      objets.classList.add("buttonSelected");
      hotel.classList.remove("buttonSelected");
      apparts.classList.remove("buttonSelected");
      tous.classList.remove("buttonSelected");
      return work.category.name === "Objets";
    });
    afficherImages(objetFiltre);
  });

  apparts.addEventListener("click", () => {
    let appartFiltre = works.filter((work) => {
      apparts.classList.add("buttonSelected");
      hotel.classList.remove("buttonSelected");
      tous.classList.remove("buttonSelected");
      objets.classList.remove("buttonSelected");

      return work.category.name === "Appartements";
    });
    afficherImages(appartFiltre);
  });

  hotel.addEventListener("click", () => {
    let hotelFiltre = works.filter((work) => {
      hotel.classList.add("buttonSelected");
      tous.classList.remove("buttonSelected");
      apparts.classList.remove("buttonSelected");
      objets.classList.remove("buttonSelected");

      return work.category.name === "Hotels & restaurants";
    });
    afficherImages(hotelFiltre);
  });

  tous.addEventListener("click", () => {
    // Clear the gallery before showing all images
    tous.classList.add("buttonSelected");
    hotel.classList.remove("buttonSelected");
    apparts.classList.remove("buttonSelected");
    objets.classList.remove("buttonSelected");

    gallery.innerHTML = "";
    afficherImages(works);
  });
}
