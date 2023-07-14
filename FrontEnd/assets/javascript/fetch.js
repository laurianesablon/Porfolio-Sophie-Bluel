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
    });
}

function getCategories() {
  return fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.error(error));
}

function getWorks() {
  return fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      let works = data;
      return works;
    })
    .catch((error) => console.error(error));
}

function postWorks(token, formData) {
  token = "";
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        window.location.reload();
      } else throw new Error(response.statusText);
    })
    .catch((error) => console.error(error));
}
