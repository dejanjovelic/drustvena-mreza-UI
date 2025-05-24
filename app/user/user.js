"use strict";
function intializationUsers() {
    getAll()
}

function getAll() {
    fetch('http://localhost:33229/api/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Request failed. Status: ' + response.status)
            }
            return response.json()
        })
        .then(users => rednderUsers(users))
        .catch(error => {
            console.log('Error: ' + error.message)

            let table = document.querySelector('table')

            if (table) {
                table.style.display = 'none'
            }

            alert("An error occured while loadin data. Please try again.")
        })
}

function rednderUsers(users) {
    let table = document.querySelector('table tbody')
    table.innerHTML = "";

    let tableHeader = document.querySelector('table thead')

    if (users.length === 0) {
        tableHeader.classList.add('hidden')

        const noDatamessage = document.querySelector("#no-data-message")
        noDatamessage.classList.remove('hidden')
    } else {
        tableHeader.classList.remove('hidden')

        const noDatamessage = document.querySelector("#no-data-message")
        noDatamessage.classList.add('hidden')
    }

    users.forEach(users => {
        let newRow = document.createElement("tr")

        let cell1 = document.createElement("td")
        cell1.textContent = users.id
        newRow.appendChild(cell1)

        let cell2 = document.createElement("td")
        cell2.textContent = users['userName']
        newRow.appendChild(cell2)

        let cell3 = document.createElement("td")
        cell3.textContent = users['name']
        newRow.appendChild(cell3)

        let cell4 = document.createElement("td")
        cell4.textContent = users['lastname']
        newRow.appendChild(cell4)

        let cell5 = document.createElement("td")
        cell5.textContent = formatDate(new Date(users['birthdate']))
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

document.addEventListener('DOMContentLoaded', intializationUsers)