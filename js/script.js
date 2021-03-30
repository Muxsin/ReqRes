function myFunction() {
    var x = document.getElementById("navbar-nav");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
}

let userElement = document.querySelector(".user-box");
let userTemplate = document.querySelector(".user-template");
let findUserBtn = document.querySelector("#find-user-btn");
let findUserField = document.querySelector("#find-user-field");
let errorContent = document.querySelector(".error-content");

function addError(error) {
    errorContent.innerHTML = `<p><i class="fa fa-exclamation-circle" aria-hidden="true"></i> ${error}</p>`;
}

function removeError() {
    errorContent.innerHTML = '';
}

function createUser(name, email, avatar) {
    let element = document.importNode(userTemplate.content, true);
    element.querySelector('.user-name').innerText = name;
    element.querySelector('.user-email').innerText = email;
    element.querySelector('.user-avatar').setAttribute('src', avatar);

    return element;
}

function addUser(element) {
    let user = userElement.querySelector('.user');
    
    if(user !== null) {
        userElement.removeChild(user);
    }

    userElement.appendChild(element);
}

findUserBtn.onclick = () => {
    let findUserFieldValue = (findUserField.value).trim();
    if(findUserFieldValue !== "") {
        if(/^[0-9]/.test(findUserFieldValue)) {
            fetch(`https://reqres.in/api/users/${findUserFieldValue}`).then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        let userData = data.data;
                        let name = userData.first_name + ' ' + userData.last_name;
                        let email = userData.email;
                        let avatar = userData.avatar;
                        findUserBtn.style.backgroundColor = "#ff0066da";
    
                        addUser(createUser(name, email, avatar));
                        removeError();
                    })
                } else {
                    addError("User not exist!");
                }
            })
        } else {
            addError("User ID can\'t be latter!");
        }
    } else {
        addError("Field can\'t be empty!");
    }
}



