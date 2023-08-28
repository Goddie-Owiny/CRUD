const feedDisplay = document.querySelector("#feed")

fetch('http://localhost:8585/')
.then(response => { return response.json()})
.then(data => {
    data.forEach()
})
.catch(err => console.log(err))