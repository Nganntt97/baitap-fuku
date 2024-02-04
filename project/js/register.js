// function id
function uuid() {
    return Math.floor(Math.random() * 555555);
}

// function đăng ký
let users = JSON.parse(localStorage.getItem("users")) || [];

function register() {
    let name = document.getElementById("name").value;
    let mail = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    let obj = {
        name: name,
        email: mail,
        password: password,
        id: uuid(),
        cart: [],
    };

    let check = users.filter((item) => {
        return item.email == mail;
    });
    if (check.length > 0) {
        alert("Account already exists");
        return;
    }

    let isError = false;
    let error = {
        isError: false,
        msgEmail: "",
        msgPassword: "",
        msgName: "",
        msgConfirmPassword:""
    };


    if (name == "") {
        error.isError = true;
        error.msgName = "Please enter your name!";
    }
    if (mail == "") {
        error.isError = true;
        error.msgEmail = "Please enter your email!";
    } else if (!emailIsValid(mail)) {
        error.isError = true;
        error.msgEmail = "Please enter the correct email!";
    
    }
    if (password=="") {
        error.isError = true;
        error.msgPassword = "Please enter password!";
    }

    if (confirmPassword != password) {
        error.isError = true;
        error.msgConfirmPassword = "Please enter the correct password!";
    }
    renderError(error);
    if (!error.isError) {
        users.push(obj);
        localStorage.setItem("users", JSON.stringify(users));
        window.location.href = "../pages/login.html";
    }
}

// gọi hàm hiển thị lỗi
function renderError(error) {
    const emailErrorElement = document.getElementById("email-error");
    const nameErrorElement = document.getElementById("name-error");
    const passwordErrorElement = document.getElementById("password-error");
    const confirmPasswordErrorElement = document.getElementById("confirmpassword-error");
    emailErrorElement.innerHTML = error.msgEmail;
    nameErrorElement.innerHTML = error.msgName;
    passwordErrorElement.innerHTML = error.msgPassword;
    confirmPasswordErrorElement.innerHTML = error.msgConfirmPassword;
}


function checkValidator(data) {

    let error = {
        isError: false,
        msgEmail: "",
        msgPassword: "",
        msgName: "",
    };

    return error
}
// gpoij hàm kiẻme tra giá trị mail
function emailIsValid(mail) {
    var regex = /\S+@\S+.\S+/;
    return regex.test(mail);

}


// function register() {
//     const dataForm = getDataForm(); // getDataForm sẽ return về object chứa dữ liệu
  
//     const checkError = checkValidator(dataForm); // Kiểm tra validator
//     const isEmailExist = checkEmailExist(dataForm.emal); // Kiểm tra email
  
//     if (isEmailExist) {
//       checkError.isError = true;
//       checkError.msgEmail = "Email đã tồn tại";
//     }
//     renderError(checkError);
//     if(!checkError.isError) {
  
//       navigate("/login") // tạo function điều hướng
//     }
//   }