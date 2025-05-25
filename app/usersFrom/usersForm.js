"use strict";
function initializationFormUser() {
    let submitBtn = document.querySelector("#submitBtn")
    submitBtn.addEventListener('click', submit)

    let cancelBtn = document.querySelector("#cancelBtn")
    cancelBtn.addEventListener('click', function () {
        window.location.href = "../user/user.html"
    })    

    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')

    if (id) {      
        let formTitle = document.querySelector('#edit-add-form')
        formTitle.textContent = "EDIT USER FORM"
        
    } else {
        let formTitle = document.querySelector('#edit-add-form')
        formTitle.textContent = "ADD USER FORM"
        
    }
    get()
}

function get() {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')

    if(!id){
        return
    }

    fetch('http://localhost:33229/api/users/' + id)
        .then(response => {
            if (!response.ok) {
                const error = new Error("Request failed. Status: " + response.status)
                error.response = response
                throw error
            }
            return response.json()
        })
        .then(user => {
            document.querySelector('#userName').value = user.userName;
            document.querySelector('#name').value = user.name;
            document.querySelector('#lastname').value = user.lastname;
            document.querySelector('#birthdate').value = user.birthdate.split('T')[0];

        })
        .catch(error => {
            console.log('Error: ' + error.message)
            if (error.response && error.response.status === 404) {
                alert("User does not exist!")
            } else {
                alert("An error occured while loading data. Please try again.")
            }
        })
}

function submit() {
    const form = document.querySelector("#form")
    const formData = new FormData(form)

    const regBody = {
        userName: formData.get('userName'),
        name: formData.get('name'),
        lastname: formData.get('lastname'),
        birthdate: formData.get('birthdate')
    }

    const userNameErrorMessage = document.querySelector('#userNameError')
    userNameErrorMessage.textContent = "";

    const nameErrorMessage = document.querySelector('#nameError')
    nameErrorMessage.textContent = "";

    const lastnameErrorMessage = document.querySelector('#lastnameError')
    lastnameErrorMessage.textContent = "";

    const birthdateErrorMessage = document.querySelector('#birthdateError')
    birthdateErrorMessage.textContent = "";

    if (regBody.userName.trim() === "") {
        userNameErrorMessage.textContent = "Username field is requaired."
        // return
    }
    if (regBody.name.trim() === "") {
        nameErrorMessage.textContent = "Name field is requaired."
        // return
    }
    if (regBody.lastname.trim() === "") {
        lastnameErrorMessage.textContent = "Lastname field is requaired."
        // return
    }
        
    if (regBody.birthdate === "") {
        birthdateErrorMessage.textContent = "Birthdate field is requaired."
        return
    }

    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')

    let method = "POST";
    let url = 'http://localhost:33229/api/users';

    if (id) {
        method = "PUT";
        url = 'http://localhost:33229/api/users/' + id;        
    }


    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(regBody)
    })
        .then(response => {
            if (!response.ok) {
                const error = new Error('Request failed. Status: ' + response.status)
                error.response = response
                throw error
            }
            return response.json()
        })
        .then(user => {
            window.location.href = "../user/user.html"
        })
        .catch(error => {
            console.log('Error: ' + error.message)
            if (error.response && error.response.status === 404) {
                alert("User does not exist!")
            } else if (error.response && error.response.status === 400) {
                alert('invalid data input.')
            } else {
                alert('An error occured while creating new user. Please try againg')
            }
        })
    }

document.addEventListener('DOMContentLoaded', initializationFormUser)