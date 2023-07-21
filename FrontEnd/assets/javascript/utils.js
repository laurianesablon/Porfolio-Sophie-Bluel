function createWorkImg(work) {
  let img = document.createElement("img");
  img.src = work.imageUrl;
  img.alt = work.title;
  return img;
}

function createFilterButtonInGallery() {
  let filtreContainer = document.querySelector(".filtres");
  let button = document.createElement("button");
  button.innerHTML = categorie.name;
  filtreContainer.appendChild(button);
}
