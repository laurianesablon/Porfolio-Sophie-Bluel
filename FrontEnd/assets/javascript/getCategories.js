function getCategories() {
  return fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => {
        return data;
    })
    .catch((error) => console.error(error));
}
