window.addEventListener("load", () => {
  getWorks();
  displayWorksInGallery();
  displayFiltersAboveGallery();
})
function displayWorksInGallery() {
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else throw new Error(response.statusText);
    })
    .then((data) => {
      data.forEach((element) => {
        let figure = document.createElement("figure");
        let img = createWorkImg(element);
        let figcaption = document.createElement("figcaption");
        figcaption.textContent = element.title;
        figure.id = "work-" + element.id;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
      });
    })
    .catch((error) => console.error(error));
}

function displayFiltersAboveGallery() {
  fetch("http://localhost:5678/api/categories")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((data) => {
      data.unshift({
        id: 0,
        name: "Tous",
      });
      let filtreContainer = document.querySelector(".filtres");
      data.forEach((categorie) => { 
        let button = document.createElement("button");
        button.innerHTML = categorie.name;
        button.className = categorie.name;
        filtreContainer.appendChild(button);
        if (categorie.id == 3){
          button.className = "Hotels";

        }
      });

      let objets = document.querySelector(".Objets");
      let apparts = document.querySelector(".Appartements");
      let hotel = document.querySelector(".Hotels");
      let tous = document.querySelector(".Tous");

      getWorks()
        .then((works) => {
          Filtres(works, objets, apparts, hotel, tous);
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
}
