function myFunction() {
    var x = document.getElementById("navbar-nav");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
}

let usersList = document.querySelector('.users-list');
let userTemplate = document.querySelector('.user-template');
let userNameElement = userTemplate.content.querySelector('.user-name');
let userEmailElement = userTemplate.content.querySelector('.user-email');
let userAvatarElement = userTemplate.content.querySelector('.user-avatar');
let pagination = document.querySelector('#pagination');
let paginationBtn = document.querySelector('#pagination-btn');

function removeUsers() {
    usersList.innerHTML = "";
}

function getUsers(per_page = 6) {
    fetch(`https://reqres.in/api/users?per_page=${per_page}`).then(res => {
        res.json().then(data => {
            for(let info of data.data) {
                let userDiv = document.importNode(userTemplate.content, true);
                userDiv.querySelector('.user-name').innerText = info.first_name + " " + info.last_name;
                userDiv.querySelector('.user-email').innerText = info.email;
                userDiv.querySelector('.user-avatar').setAttribute('src', info.avatar);
                usersList.appendChild(userDiv);
            }
        })
    })
}

paginationBtn.onclick = () => {
    removeUsers();
    getUsers(pagination.value);
}

getUsers();
