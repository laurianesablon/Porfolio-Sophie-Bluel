function postWorks(token,formData){
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
        body: formData,
      }).then(() => window.location.reload())
      .catch((error) => console.error(error));
}
