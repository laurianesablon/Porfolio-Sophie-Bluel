function createWorkImg(work) {
  let img = document.createElement("img");
  img.src = work.imageUrl;
  img.alt = work.title;
  return img;
}

function createFilterButtonInGallery() {
  let filterContainer = document.querySelector(".filtres");
  let button = document.createElement("button");
  button.innerHTML = categorie.name;
  filterContainer.appendChild(button);
}
