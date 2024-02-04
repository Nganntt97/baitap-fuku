
// định dạng tiền tệ
const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})
// function hiện thị sản phẩm
let productList = [
    {
        name: "Yohen Shikou",
        price: "$5000",
        id: 6565651,
        src: "./image/ｓｐ１.webp",

    },
    {
        name: "Yuragi Kapu",
        price: "$3000",
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

let loggedUser = null;
let cart = [];


window.onload = function() {
     loggedUser = localStorage.getItem("loggedUser");
     const storeCart = JSON.parse(localStorage.getItem("cart")) || [];
    if(loggedUser) {
        cart = storeCart;
        updateMenu();
        showCount();
    }
}

function login() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password) {
            loggedUser = users[i].name;
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

function logout() {
    event.preventDefault();
    window.location.href = "./pages/login.html"

  localStorage.removeItem("loggedUser");
}


function updateMenu() {
    const userName = document.getElementById("user-name");
    const logged = document.getElementById("logged");
    const loginSignup = document.getElementById("login-signup");
    if(loggedUser) {
        userName.textContent = loggedUser;
        logged.style.display = "flex";
        loginSignup.style.display = "none";
    } else {
        logged.style.display = "none";
    }
}


// save product trên local
// localStorage.setItem("productList", JSON.stringify(productList));

let products = JSON.parse(localStorage.getItem("productList"));
// gọi hàm render sản phẩm

function renderProduct(productList) {
    if (productList == undefined) {
        productList = [];
    }
    let text = "";
    for (let i = 0; i < productList.length; i++) {
        text +=
            `
         <div class="col mb-5" id="product-item">
                        <div class="card h-100">
                            <!-- Product image-->
                            <img class="card-img-top" src="${productList[i].src}" alt="...">
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">${productList[i].name}</h5>
                                    <!-- Product reviews-->
                                
                                    <!-- Product price-->
                                    <span class="text-muted text-decoration">$${productList[i].price}</span>
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                                <button onclick="addToCart(${productList[i].id})" class="btn btn-outline-dark mt-auto">Add to cart</button>
                            </div>
                        </div>
                    </div>
    `
    }
    document.getElementById("producItem").innerHTML = text;
}
renderProduct(products);
// localStorage.setItem("productList",JSON.stringify(productList))

// function đi mua hàng
function addToCart(productId) {
    // tạo biến checklogin có giá trị là id users
    let checkLogin = localStorage.getItem("loggedUser");
    const product = productList.find(item => item.id === productId);
    if (checkLogin) {
        const exitProduct = cart.find(item => item.id === productId);
        if (exitProduct) {
            exitProduct.qty += 1;
        } else {
            product.qty = 1;
            cart.push(product);
        }

        // luu gio hang vao strorage
        localStorage.setItem("cart", JSON.stringify(cart));
        showCount();
    } else {
        // chưa đăng nhập không thể mua hàng
        alert("You must have to login to shop!")
    }
}


function showCount(){
    const totalQty = cart.reduce((sum, product) => sum + product.qty, 0);
    document.getElementsByClassName("count")[0].innerHTML = totalQty;
}