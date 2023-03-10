const tbodyContainer = document.querySelector(".tbody");
const favoritUsers = {};

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((json) => {
    json.forEach((el) => {
      tbodyContainer.innerHTML += `<tr data-bs-toggle="modal" data-bs-target="#exampleModal"> 
        <th scope="row" class="id"> 
        ${el.id}
        </th>
        <td>${el.name}</td>
        <td>${el.username}</td>
        <td>${el.email}</td>
        <td>${el.phone}</td>
        <td>${el.website}</td>
        </tr>
        `;
    });
  })
  .catch((error) => {
    throw new error();
  });

tbodyContainer.addEventListener("click", (e) => {
  const myModal = document.getElementById("exampleModal");
  const modalTitle = myModal.querySelector("#exampleModalLabel");
  const modalBody = myModal.querySelector(".list-group ");
  const btnFavorite = document.querySelector(".favorites");
  modalBody.innerHTML = "";
  let item = {};
  for (const prop of Object.getOwnPropertyNames(items)) {
    delete item[prop];
  }

  fetch(
    `https://jsonplaceholder.typicode.com/users/${e.target.parentElement.innerText[0]}`
  )
    .then((response) => response.json())
    .then((json) => {
      for (const key in json) {
        if (key == "name") {
          item[key] = json[key];
          modalTitle.innerHTML = `name ${json.name}`;
        } else if (key == "address" || key == "company") {
          for (const i in json[key]) {
            if (typeof json[key][i] !== "object") {
              modalBody.innerHTML += `
                    <li class="list-group-item">${i} - ${json[key][i]}</li>
                    `;
            }
          }
        } else {
          item[key] = json[key];
          modalBody.innerHTML += `
        <li class="list-group-item">${key} - ${json[key]}</li>
        `;
        }
      }
    })
    .catch((error) => {
      throw new Error(error);
    });

  btnFavorite.addEventListener("click", (e) => {
    console.log("item");
    console.log(item);
    favoritUsers[item.id] = item;

    updateFavoriteList();
  });
});

function updateFavoriteList(obj=favoritUsers) {
  console.log(favoritUsers);
  const favorites = document.querySelector(".favoritUsers");
  favorites.innerHTML = "";

  for (const key in obj) {
    favorites.innerHTML += `<tr data-bs-toggle="modal" data-bs-target="#exampleModal2">
      <th scope="row">${obj[key].id}</th>
      <td>${obj[key].name}</td>
      <td>${obj[key].username} </td>
      <td><div class="delete"></div></td>  
    </tr>`;
  }
}

const favoritUsersItems = document.querySelector(".favoritUsers");

favoritUsersItems.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    showModal(
      favoritUsers[e.target.parentElement.parentElement.innerText[0]],
      "Remote user data <br>"
    );
    delete favoritUsers[e.target.parentElement.parentElement.innerText[0]];
    updateFavoriteList();
  } else {
    showModal(favoritUsers[e.target.parentElement.innerText[0]]);
  }
});

function showModal(obj, username = "") {
  const myModal = document.getElementById("exampleModal2");
  const modalTitle = myModal.querySelector("#exampleModalLabel");
  const modalBody = myModal.querySelector(".list-group ");

  modalBody.innerHTML = "";

  for (const key in obj) {
    if (key == "name") {
      modalTitle.innerHTML = `${username}name - ${obj.name}`;
    } else if (key == "address" || key == "company") {
      for (const i in obj[key]) {
        if (typeof obj[key][i] !== "object") {
          modalBody.innerHTML += `
                      <li class="list-group-item">${i} - ${obj[key][i]}</li>
                      `;
        }
      }
    } else {
      modalBody.innerHTML += `
          <li class="list-group-item">${key} - ${obj[key]}</li>
          `;
    }
  }
}
