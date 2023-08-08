// let modale = document.querySelector(".modale");
// let modaleForm = document.querySelector(".modaleformContainer");
// let supprimer = document.querySelector(".supprimer");
// let removeModalIcon = document.querySelector(".fa-xmark");
// let ajoutphoto = document.querySelector(".ajoutphoto");
// let modaleStart = document.querySelector(".modaleStart");
// let valider = document.querySelector(".valider");
// let ajoutphotoBtn = document.querySelector("#ajoutphoto");
//let formContainer = document.querySelector(".modaleForm");
// let realFormBtn = document.querySelector("#real_image_form");
//  let modaleSupprimerGallerie = document.querySelector(".modale_supprimer");
// let boutonOui = document.querySelector("#oui");
// let boutonNon = document.querySelector("#non");
// let imgContainerModale = document.getElementById("modaleForm_img");
// let loader = document.querySelector(".loader");
// let preview = document.createElement("img");
// let titre;
// let image;
// let gallery = document.querySelector(".gallery");
// let token = sessionStorage.token;
// let selectCategoryOptions = document.getElementById("input_category");
// let formData = new FormData();
// let format = document.getElementById("format");
// const maxSize = 4000000;
// let filtres = document.querySelector(".filtres");
// let modifierP = document.querySelector(".modifier_portfolio");
// let loginLogout = document.querySelector(".loginLogout");

// window.addEventListener("load", () => {
//   // Récupère les catégories et ajoute des options au menu déroulant
//   getCategories();
// });


// function displayWorksInGallery(filtre) {
//   gallery.innerHTML = "";
//       filtre.forEach((element) => {
//         let figure = document.createElement("figure");
//         let img = createWorkImg(element);
//         let figcaption = document.createElement("figcaption");
//         figcaption.textContent = element.title;
//         figure.id = "work-" + element.id;
//         figure.appendChild(img);
//         figure.appendChild(figcaption);
//         gallery.appendChild(figure);
//       });
//     }


// function displayFiltersAboveGallery() {
//   fetch("http://localhost:5678/api/categories")
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error(response.statusText);
//       }
//     })
//     .then((data) => {
//       data.unshift({
//         id: 0,
//         name: "Tous",
//       });
//       if (authentified == undefined) {
//         let filtreContainer = document.querySelector(".filtres");
//         data.forEach((categorie) => {
//           let button = document.createElement("button");
//           button.innerHTML = categorie.name;
//           button.className = categorie.name;
//           button.dataset.categoryId = categorie.id;
//           filtreContainer.appendChild(button);
//           button.addEventListener("click", function () {
//             //récupérer la catégorie id du bouton sur lequel tu as cliqué
//             let id = button.dataset.categoryId;
//             if (button.dataset.categorieId !==  id) {
//               button.classList.remove("buttonSelected");
//             }
//           });
//           if (categorie.id == 0){
//             button.classList.add("buttonSelected");
//           }
//           if (categorie.id == 3) {
//             button.className = "Hotels";
//           }
//         });

//         let objets = document.querySelector(".Objets");
//         let apparts = document.querySelector(".Appartements");
//         let hotel = document.querySelector(".Hotels");
//         let tous = document.querySelector(".Tous");

//         getWorks()
//           .then((works) => {
//             Filtres(works, objets, apparts, hotel, tous);
//           })
//           .catch((error) => console.error(error));
//       }
//     })
//     .catch((error) => console.error(error));
// }

