function deleteProject(id) {
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
    });
}

function getCategories() {
  fetch("http://localhost:5678/api/categories")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else throw new Error(response.statusText);
    })
    .then((data) => {
      data.forEach((categorie) => {
        let option = document.createElement("option");
        option.value = categorie.id;
        option.text = categorie.name;
        selectCategoryOptions.add(option);
      });
      //window.location.reload();
    })
    .catch((error) => console.error(error));
}

function getWorks() {
  return fetch("http://localhost:5678/api/works")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch((error) => console.error(error));
}


function postWorks(token, formData) {
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
