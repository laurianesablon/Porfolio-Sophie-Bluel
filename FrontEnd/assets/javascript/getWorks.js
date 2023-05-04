function getWorks(){
    fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      let works = data;
      return works
    })
    .catch((error) => console.error(error));
}