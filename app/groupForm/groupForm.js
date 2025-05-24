function Initialize() {
    let addBtn = document.getElementById('add-btn')
    addBtn.addEventListener('click', function(){
        CreateGroup()
    })

    let cancelBtn = document.getElementById('cancel-btn')
    cancelBtn.addEventListener('click', function(){
        window.location.href = '../group/group.html'
    })
}

function CreateGroup() {
    let reqField = document.querySelector('.required-field')
    let form = document.getElementById('group-form')
    const formData = new FormData(form)

    let formName = formData.get('name')
    if (formName.trim() === ''){
        reqField.classList.remove('hidden')
        return
    }

    const reqBody = {
        name: formName,
        dateCreated: new Date()
    }

    fetch('http://localhost:33229/api/groups', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json' 
         },
         body: JSON.stringify(reqBody)
        })
        .then(response => {
            if(!response.ok){
                const error = new Error('Request failed. Status: ' + response.status)
                error = response
                throw error
            }
            return response.json()
        })
        .then(data => {
            window.location.href = '../group/group.html'
        })
        .catch(error => {
            console.error('Error: ' + error.message)

            if(error.response && error.response === 400){
                alert('Data is invalid')
            } else {
                alert('An error occured while creating group. Please try again')
            }
        })
}

document.addEventListener('DomContentLoaded', Initialize())