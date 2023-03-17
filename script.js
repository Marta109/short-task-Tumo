const favoritUsersItems = document.querySelector(".favoritUsers");
const tbodyContainer = document.querySelector(".tbody");
const favoriteBtn = document.querySelector(".favorites");
const favoritUsers = {};
const userData = {};

// get users data
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((json) => {
    json.forEach((el, i) => {
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
      userData[el.id] != el.id ? (userData[el.id] = el) : "";
    });
  })
  .catch((error) => {
    throw new error();
  });

tbodyContainer.addEventListener("click", (e) => {
  let userId = e.target.parentElement.innerText.split("\t")[0];
  const myModal = document.getElementById("exampleModal");
  const modalTitle = myModal.querySelector("#exampleModalLabel");
  const modalBody = myModal.querySelector(".list-group ");
  modalBody.innerHTML = "";

  if (typeof userData[userId] !== undefined) {
    for (const key in userData[userId]) {
      key == "name"
        ? (modalTitle.innerHTML = `name ${userData[userId][key]}`)
        : "";
      if (typeof userData[userId][key] != "object") {
        modalBody.innerHTML += `
            <li class="list-group-item">${key} - ${userData[userId][key]}</li>
            `;
      } else {
        for (const j in userData[userId][key]) {
          if (key == "company") {
            modalBody.innerHTML += `
                        <li class="list-group-item"> ${key}_${j} - ${userData[userId][key][j]}</li>
                        `;
          } else {
            favoriteBtn;
            if (j != "geo") {
              modalBody.innerHTML += `
                      <li class="list-group-item">${j} - ${userData[userId][key][j]}</li>
                      `;
            }
          }
        }
      }
    }
  }
});

favoriteBtn.addEventListener("click", (e) => {
  let element = e.target.parentElement.parentElement
    .querySelector(".list-group-item")
    .innerText.split("-");
  let elementiD = Number(element[element.length - 1]);
  if (!favoritUsers[elementiD]) {
    favoritUsers[elementiD] = userData[elementiD];
  }
  updateFavoriteList();
});

function updateFavoriteList(obj = favoritUsers) {
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

favoritUsersItems.addEventListener("click", (e) => {
  let elemid = Number(
    e.target.parentElement.parentElement.innerText.split("\t")[0]
  );
  if (e.target.classList.contains("delete")) {
    showModal(favoritUsers[elemid], "Remote user data <br>");
    delete favoritUsers[elemid];
    updateFavoriteList();
  } else {
    elemid = Number(e.target.parentElement.querySelector("th").innerText);
    showModal(favoritUsers[elemid]);
  }
});

function showModal(obj, username = "") {
  const myModal = document.getElementById("exampleModal2");
  const modalTitle = myModal.querySelector("#exampleModalLabel");
  const modalBody = myModal.querySelector(".list-group ");

  modalBody.innerHTML = "";

  for (const key in obj) {
    key == "name"
      ? (modalTitle.innerHTML = `${username}name ${obj[key]}`)
      : "";
    if (typeof obj[key] != "object") {
      modalBody.innerHTML += `
          <li class="list-group-item">${key} - ${obj[key]}</li>
          `;
    } else {
      for (const j in obj[key]) {
        if (key == "company") {
          modalBody.innerHTML += `
                      <li class="list-group-item"> ${key}_${j} - ${obj[key][j]}</li>
                      `;
        } else {
          favoriteBtn;
          if (j != "geo") {
            modalBody.innerHTML += `
                    <li class="list-group-item">${j} - ${obj[key][j]}</li>
                    `;
          }
        }
      }
    }
  }
}
