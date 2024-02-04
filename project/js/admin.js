


let productList = [
    {
        name: "Yohen Shikou",
        price: "$5000",
        id: 6565651,
        src: "./image/ｓｐ１.webp",

    },
    {
        name: "Yuragi Kapu",
        price:"$3000",
        id: 6565652,
        src: "./image/ｓｐ２.webp",
    },
    {
        name: "Ryusei Sake",
        price: "$4000",
        id: 6565653,
        src: "./image/sake.webp",
    },
    {
        name: "Iroe Bin",
        price: "$10000",
        id: 6565654,
        src: "./image/binh.webp",
    },
    {
        name: "Tori Sake",
        price: "$2000",
        id: 6565655,
        src: "./image/chim.webp",
    },
    {
        name: "Sara Seito",
        price: "$1800",
        id: 6565656,
        src: "./image/sara.webp",
    },
    {
        name: "Hana Seito",
        price: "$8500",
        id: 6565657,
        src: "./image/binh2.webp",
    },
]
if (!localStorage.getItem("productList") || localStorage.getItem("productList").length == 0) {
    
    localStorage.setItem("productList", JSON.stringify(productList));
}
 

function showUser() {
    let users = JSON.parse(localStorage.getItem("users"));
    let text = '';
    for (let i = 0; i < users.length; i++) {
        text +=
            `
    <tr>
    <th>${users[i].id}</th>
    <th>${users[i].name}</th>
    <th>${users[i].email}</th>
    <th>${users[i].password}</th>
    <th>${users[i].role}</th>
    <th>${users[i].active}</th>
    <th><button type="button" class="btn btn-black me-1" onclick = "blockUser(${users[i].id})">${users[i].active ? 'block' : 'unlock'}</button>
    <button type="button" class="btn  btn-secondary" onclick = "deleteUser(${users[i].id})">Delete</button>
    </th>

</tr>
    `;

        document.getElementById('dataList').innerHTML = text;
    }
}
showUser();
function deleteUser(userId) {
    let users = JSON.parse(localStorage.getItem("users"));
    let loggedUser = JSON.parse(localStorage.getItem("userId"));
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == userId) {
            if (loggedUser == users[i].id) {
                localStorage.removeItem("userId");
            }
            users.splice(i, 1);
            localStorage.setItem("users", JSON.stringify(users));
            showUser();
        }

    }
}
function blockUser(userId) {
    let loggedUser = JSON.parse(localStorage.getItem("userId"));
    let users = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == userId) {
            users[i].active = !users[i].active;
            localStorage.setItem("users", JSON.stringify(users));
            if (loggedUser == users[i].id) {
                localStorage.removeItem("userId");
            }
            showUser();  
        }
   
    }
}
function addUser() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let fullName = document.getElementById("fullName");
    let typeEmail = document.getElementById("typeEmail");
    let typePassword = document.getElementById("typePassword");
    let role = document.getElementById("role");
    let obj = {
        email: typeEmail.value,
        name: fullName.value,
        password: typePassword.value,
        id: uuid(),
        cart: [],
        role: role.value,
        active: true,
    }
    let check = users.filter((item) => {
        return item.email == typeEmail.value;
    })
    if (check.length == 0) {
        users.push(obj);
        localStorage.setItem("users", JSON.stringify(users))
        showUser();
    } else {
        alert("tai khoan da ton tai")
    }
}
function uuid() {
    return Math.floor(Math.random() * 3234565566);
}
function showProduct() {
    let products = JSON.parse(localStorage.getItem("productList"));
    let text = '';
    for (let i = 0; i < products.length; i++) {
        text +=
            `
    <tr>
    <th>${products[i].id}</th>
    <th>${products[i].name}</th>
    <th>$${products[i].price} </th>
    <th><img src="../${products[i].src}" class="img-fluid" /></th>
    <th>
    <button type="button" class="btn  btn-secondary" onclick = "deleteProduct(${products[i].id})">Delete</button>
    </th>

</tr>
    `;

        document.getElementById('productDataList').innerHTML = text;
    }
}
showProduct();
 function addProduct() {
    let products = JSON.parse(localStorage.getItem("productList")) || [];
    let productName = document.getElementById("productName");
    let price = document.getElementById("price");
    // let id = document.getElementById("id");
    let src = document.getElementById("src");
    const selectedFile = document.getElementById("src").files[0].name;
    console.log(selectedFile);
    let product =
        {
            name: productName.value,
            price: price.value,
            id: uuid(),
            src: "../assets/images/"+ selectedFile,
        };
        let check = products.filter((item) => {
            return item.name == productName.value;
        })
        if (check.length == 0) {
            products.push(product);
            localStorage.setItem("productList", JSON.stringify(products))
            showProduct();
        } else {
            alert("san pham da co trong danh sach")
        }
} 
function deleteProduct(productsId){
    let products = JSON.parse(localStorage.getItem("productList"));
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == productsId) {
            products.splice(i, 1);
            localStorage.setItem("productList", JSON.stringify(products));
            showProduct();
        }
    } 
}
function uuid() {
    return Math.floor(Math.random()*3234565566);
}