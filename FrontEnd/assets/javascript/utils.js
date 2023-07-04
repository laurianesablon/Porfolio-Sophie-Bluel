function createWorkImg(work) {
  let img = document.createElement("img");
  img.src = work.imageUrl;
  img.alt = work.title;
  return img;
}
