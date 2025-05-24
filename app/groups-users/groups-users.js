"use strict";
function intializationGrupsUsers() {
    getUsersOfAGroup()

}

function getUsersOfAGroup() {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')


    fetch('http://localhost:33229/api/groups/' + id + '/users')
        .then(response => {
            if (!response.ok) {
                let error = new Error("Request failed. Status: " + response.status)
                error.response = response
                throw error
            }
            return response.json()
        })
        .then(users => rednderUsers(users))
        .catch(error => {
            console.log("Error: " + error.message)
            if (error.response && error.response.status === 404) {
                alert("Group does not exist!")
            } else {
                alert("An error occured while loading data. Please try again.")
            }
        });

}

function rednderUsers(users) {
    let table = document.querySelector("table tbody");
    table.innerHTML = "";

    let tableHeader = document.querySelector("table thead");

    if (users.length === 0) {
        tableHeader.classList.add('hidden');

        let noDatamessage = document.querySelector("#no-data-message");
        noDatamessage.classList.remove('hidden');
    } else {
        tableHeader.classList.remove('hidden');

        let noDatamessage = document.querySelector("#no-data-message");
        noDatamessage.classList.add('hidden');
    }

    users.forEach(user => {
        let newRow = document.createElement("tr")

        let cell1 = document.createElement('td')
        cell1.textContent = user['id']
        newRow.appendChild(cell1)

        let cell2 = document.createElement('td')
        cell2.textContent = user['userName']
        newRow.appendChild(cell2)

        let cell3 = document.createElement('td')
        cell3.textContent = user['name']
        newRow.appendChild(cell3)

        let cell4 = document.createElement('td')
        cell4.textContent = user['lastname']
        newRow.appendChild(cell4)

        let cell5 = document.createElement('td')
        cell5.textContent = formatDate(new Date(user['birthdate']));

        newRow.appendChild(cell5)

        table.appendChild(newRow)

    });
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}.`;
}

document.addEventListener('DOMContentLoaded', intializationGrupsUsers)