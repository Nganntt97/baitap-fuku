let loggedUser = null;

function login() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password) {
            localStorage.setItem("loggedUser", users[i].name)
            window.location.href = "../index.html";
            updateMenu();
            return;
        } else {
            console.log("đăng nhập thất bại");
            alert("Your email or password is incorrect!")
        };
    }
}


function updateMenu() {
    const userName = document.getElementById("user-name");
    const logged = document.getElementById("logged");
    if(loggedUser) {
        userName.textContent = loggedUser;
        logged.style.display = "inline-block";
    } else {
        logged.style.display = "none";
    }
}
