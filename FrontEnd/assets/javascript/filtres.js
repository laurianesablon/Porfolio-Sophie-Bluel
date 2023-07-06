function Filtres(works) {
  function ObjetsClick() {
    let objetFiltre = works.filter((work) => {
      objets.classList.add("buttonSelected");
      hotel.classList.remove("buttonSelected");
      apparts.classList.remove("buttonSelected");
      tous.classList.remove("buttonSelected");
      return work.category.name === "Objets";
    });
    afficherImages(objetFiltre);
  }

  function AppartsClick() {
    let appartFiltre = works.filter((work) => {
      apparts.classList.add("buttonSelected");
      hotel.classList.remove("buttonSelected");
      tous.classList.remove("buttonSelected");
      objets.classList.remove("buttonSelected");

      return work.category.name === "Appartements";
    });
    afficherImages(appartFiltre);
  }

  function HotelClick() {
    let hotelFiltre = works.filter((work) => {
      hotel.classList.add("buttonSelected");
      tous.classList.remove("buttonSelected");
      apparts.classList.remove("buttonSelected");
      objets.classList.remove("buttonSelected");

      return work.category.name === "Hotels & restaurants";
    });
    afficherImages(hotelFiltre);
  }

  function TousClick() {
    // Clear the gallery before showing all images
    tous.classList.add("buttonSelected");
    hotel.classList.remove("buttonSelected");
    apparts.classList.remove("buttonSelected");
    objets.classList.remove("buttonSelected");

    gallery.innerHTML = "";
    afficherImages(works);
  }

  objets.addEventListener("click", ObjetsClick);
  apparts.addEventListener("click", AppartsClick);
  hotel.addEventListener("click", HotelClick);
  tous.addEventListener("click", TousClick);
}
