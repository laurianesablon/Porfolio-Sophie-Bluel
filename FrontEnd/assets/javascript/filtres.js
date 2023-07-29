let authentified = localStorage.token;
if (authentified == undefined) {

function Filtres(works, objets, apparts, hotel, tous) {
  TousClick(works, objets, apparts, hotel, tous);
  objets.addEventListener("click", function () {
    ObjetsClick(works, objets, apparts, hotel, tous);
  });

  apparts.addEventListener("click", function () {
    AppartsClick(works, objets, apparts, hotel, tous);
  });

  hotel.addEventListener("click", function () {
    HotelClick(works, objets, apparts, hotel, tous);
  });

  tous.addEventListener("click", function () {
    TousClick(works, objets, apparts, hotel, tous);
  });
}

function ObjetsClick(works, objets, apparts, hotel, tous) {
  let objetFiltre = works.filter((work) => {
    objets.classList.add("buttonSelected");
    hotel.classList.remove("buttonSelected");
    apparts.classList.remove("buttonSelected");
    tous.classList.remove("buttonSelected");
    return work.category.name === "Objets";
  });
  displayWorksInGallery(objetFiltre);
}

function AppartsClick(works, objets, apparts, hotel, tous) {
  let appartFiltre = works.filter((work) => {
    apparts.classList.add("buttonSelected");
    hotel.classList.remove("buttonSelected");
    tous.classList.remove("buttonSelected");
    objets.classList.remove("buttonSelected");

    return work.category.name === "Appartements";
  });

  displayWorksInGallery(appartFiltre);
}

function HotelClick(works, objets, apparts, hotel, tous) {
  let hotelFiltre = works.filter((work) => {
    hotel.classList.add("buttonSelected");
    tous.classList.remove("buttonSelected");
    apparts.classList.remove("buttonSelected");
    objets.classList.remove("buttonSelected");

    return work.category.name === "Hotels & restaurants";
  });
  displayWorksInGallery(hotelFiltre);
}

function TousClick(works, objets, apparts, hotel, tous) {
  // Clear the gallery before showing all images
  tous.classList.add("buttonSelected");
  hotel.classList.remove("buttonSelected");
  apparts.classList.remove("buttonSelected");
  objets.classList.remove("buttonSelected");

  gallery.innerHTML = "";
  displayWorksInGallery(works);
}
}
