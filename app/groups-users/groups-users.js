"use strict";
function intializationGrupsUsers() {
  getUsersOfAGroup();
}

function getUsersOfAGroup() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const name = urlParams.get("name");

  let header = document.querySelector("#in-h2");
  header.textContent = name + " Group users:";

  let header2 = document.querySelector("#out-h2");
  header2.textContent = "Users not in " + name + " group";

  let usersInGroup = [];
  let allUsers = [];

  fetch("http://localhost:33229/api/groups/" + id + "/users")
    .then((response) => {
      if (!response.ok) {
        let error = new Error("Request failed. Status: " + response.status);
        error.response = response;
        throw error;
      }
      return response.json();
    })
    .then((users) => {
      for (let i = 0; i < users.length; i++) {
        usersInGroup.push(users[i]);
      }
      rednderUsers("#in-group", users);

      fetch("http://localhost:33229/api/users")
        .then((response) => {
          if (!response.ok) {
            let error = new Error("Request failed. Status: " + response.status);
            error.response = response;
            throw error;
          }
          return response.json();
        })
        .then((users) => {
          for (let i = 0; i < users.length; i++) {
            allUsers.push(users[i]);
          }
        })
        .then((user) => {
          for (let y = 0; y < allUsers.length; y++) {
            for (let j = 0; j < usersInGroup.length; j++) {
              if (allUsers[y].id == usersInGroup[j].id) {
                allUsers.splice(y, 1);
              }
            }
          }
          rednderUsers("#out-group", allUsers);
        });
    })
    .catch((error) => {
      console.log("Error: " + error.message);
      if (error.response && error.response.status === 404) {
        alert("Group does not exist!");
      } else {
        alert("An error occured while loading data. Please try again.");
      }
    });
}

function removeUserOfAGroup(user) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  fetch("http://localhost:33229/api/groups/" + id + "/users/" + user["id"], {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        let error = new Error("Request failed. Status: " + response.status);
        error = response;
        throw error;
      }
      getUsersOfAGroup();
    })
    .catch((error) => {
      console.error("Error: " + error.message);
      if (response && response.status === 404) {
        alert("Group or user not found");
      } else {
        alert("An error occured while removing user. Please try again.");
      }
    });
}

function addUserToGroup(user) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  fetch("http://localhost:33229/api/groups/" + id + "/users/" + user["id"], {
    method: "PUT",
  })
    .then((response) => {
      if (!response.ok) {
        let error = new Error("Request failed. Status: " + response.status);
        error = response;
        throw error;
      }
      getUsersOfAGroup();
    })
    .catch((error) => {
      console.error("Error: " + error.message);
      if (response && response.status === 404) {
        alert("Group or user not found");
      } else {
        alert("An error occured while removing user. Please try again.");
      }
    });
}

function rednderUsers(table, users) {
  let tableBody = document.querySelector(table);
  tableBody.innerHTML = "";

  let tableHeader = document.querySelector("table thead");

  if (users.length === 0) {
    tableHeader.classList.add("hidden");

    let noDatamessage = document.querySelector("#no-data-message");
    noDatamessage.classList.remove("hidden");
  } else {
    tableHeader.classList.remove("hidden");

    let noDatamessage = document.querySelector("#no-data-message");
    noDatamessage.classList.add("hidden");
  }

  users.forEach((user) => {
    let newRow = document.createElement("tr");

    let cell1 = document.createElement("td");
    cell1.textContent = user["id"];
    newRow.appendChild(cell1);

    let cell2 = document.createElement("td");
    cell2.textContent = user["userName"];
    newRow.appendChild(cell2);

    let cell3 = document.createElement("td");
    cell3.textContent = user["name"];
    newRow.appendChild(cell3);

    let cell4 = document.createElement("td");
    cell4.textContent = user["lastname"];
    newRow.appendChild(cell4);

    let cell5 = document.createElement("td");
    cell5.textContent = formatDate(new Date(user["birthdate"]));
    newRow.appendChild(cell5);

    let cell6 = document.createElement("td");
    let tableBtn = document.createElement("button");
    tableBtn.id = "deleteBtn";
    if (table === "#out-group") {
      tableBtn.textContent = "Insert";
      tableBtn.addEventListener("click", function () {
        addUserToGroup(user);
      });
    } else {
      tableBtn.textContent = "Remove";
      tableBtn.addEventListener("click", function () {
        removeUserOfAGroup(user);
      });
    }
    cell6.appendChild(tableBtn);
    newRow.appendChild(cell6);

    tableBody.appendChild(newRow);
  });
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}.`;
}

document.addEventListener("DOMContentLoaded", intializationGrupsUsers);
