function deleteProject(id, callback) {
  fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
    })
    .then(() => {
      let figure_gallery = document.querySelector("#work-" + id);
      if (figure_gallery) {
        figure_gallery.remove();
      }
      callback(); // call the callback function when deletion is done
    })
    .catch((err) => console.log("Il y a un problème : " + err));
}
