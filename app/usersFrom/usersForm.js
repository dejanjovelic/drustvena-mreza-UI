"use strict";
function initializationFormUser() {
    let submitBtn = document.querySelector("#submitBtn")
    submitBtn.addEventListener('click', submit)

    let cancelBtn = document.querySelector("#cancelBtn")
    cancelBtn.addEventListener('click', function () {
        window.location.href = "../user/user.html"
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

const lastnameErrorMessage = document.querySelector('#lastname')
lastnameErrorMessage.textContent = "";

const birthdateErrorMessage = document.querySelector('#birthdate')
birthdateErrorMessage.textContent = "";

if(regBody.userName.trim() === ""){
    userNameErrorMessage.textContent = "Username field is requaired." 
}
if(regBody.name.trim() === ""){
    nameErrorMessage.textContent = "Name field is requaired." 
}
if(regBody.lastname.trim() === ""){
    lastnameErrorMessage.textContent = "Lastname field is requaired." 
}
if(regBody.birthdate === new Date()){
    birthdateErrorMessage.textContent = "Birthdate field is requaired." 
}

    fetch('http://localhost:33229/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(regBody)
    })
        .then(response => {
            if (!response.ok) {
                const erorr = new Error('Request failed. Status: ' + response.status)
                erorr.response = response
                throw erorr
            }
            return response.json()
        })
        .then(user => {
            window.location.href = "../user/user.html"
        })
        .catch(erorr => {
            console.log('Error: ' + erorr.message)
            if (erorr.response && erorr.response.status === 400) {
                alert('invalid data input.')
            } else {
                alert('An error occured while creating new user. Please try againg')
            }
        })
}
document.addEventListener('DOMContentLoaded', initializationFormUser)