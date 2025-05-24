function Initialize(){
    let addGroupBtn = document.getElementById('add-group-btn')
    addGroupBtn.addEventListener('click', function(){
        window.location.href = '../groupForm/groupForm.html'
    })

    GetGroups()
}

function GetGroups() {
    fetch('http://localhost:33229/api/groups')
    .then(response => {
        if(!response.ok){
            throw new Error('Request failed. Status: ' + response.status)
        }
        return response.json()
    })
    .then(groups => renderData(groups))
    .catch(error =>{
        console.error('Error: ' + error.message)

        alert('An error occured while loading data. Please try again.')
    })
}

function renderData(data){
    let table = document.querySelector('table')
    let tableBody = document.querySelector('table tbody')
    tableBody.innerHTML = ''

    data.forEach(group => {
        let tr = document.createElement('tr')
        let tdName = document.createElement('td')
        tdName.textContent = group['name']

        let tdDate = document.createElement('td')
        tdDate.textContent = formatDate(new Date(group['dateCreated']))
        let tdDelete = document.createElement('td')
        let deleteBtn = document.createElement('button')
        deleteBtn.id = 'deleteBtn'
        deleteBtn.textContent = 'Delete'
        deleteBtn.addEventListener('click', function(){
            fetch('http://localhost:33229/api/groups/' + group['id'], { method: 'Delete'})
                .then(response => {
                    if(!response.ok){
                        throw new Error ('Request failed. Status: ' + response.status)
                    }
                    GetGroups()
                })
                .catch(error => {
                    console.error('Error: ' + error.message)
                    if (respone.status && response.status === 404){
                        alert('Group does not exist')
                    } else {
                        alert('An error occured while removing group. Please try again.')
                    }
                })
        })

        let tdDetails = document.createElement("td")
        let detailsBtn = document.createElement("button")
        detailsBtn.textContent = "Details"
        detailsBtn.id = 'deleteBtn'
        detailsBtn.addEventListener("click", function(){
            window.location.href = "../groups-users/groups-users.html?id=" + group['id']
        })
        tdDetails.appendChild(detailsBtn)

        
        tr.appendChild(tdName)
        tr.appendChild(tdDate)
        tdDelete.appendChild(deleteBtn)
        tr.appendChild(tdDelete)
        tr.appendChild(tdDetails)
        tableBody.appendChild(tr)

    });
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}.`;
}

document.addEventListener('DOMContentLoaded', Initialize)