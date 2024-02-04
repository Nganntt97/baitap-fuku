

let loggedUser = null;
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

const storeCart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts() {
    const productTableBody = document.getElementById('productTableBody');

    // Xóa nội dung cũ của bảng
    productTableBody.innerHTML = '';

    // Duyệt qua mỗi sản phẩm và thêm vào bảng
    storeCart.forEach(product => {
        const row = productTableBody.insertRow();
        const cellId = row.insertCell(0);
        const cellImage = row.insertCell(1);
        const cellName = row.insertCell(2);
        const cellPrice = row.insertCell(3);
        const cellQty = row.insertCell(4);
        const cellTotal = row.insertCell(5);
        const cellActions = row.insertCell(6);
        const price = parseFloat(product.price.replace('$', ''));

        const img = document.createElement('img');
        img.src = "../" + product.src;
        img.alt = product.name;
        img.className = 'img-thumbnail';


        cellId.textContent = product.id;
        cellImage.appendChild(img);
        cellName.textContent = product.name;
        cellPrice.textContent = product.price;
        cellQty.textContent = product.qty;

        cellTotal.textContent = "$" + price * product.qty;


        // theem button tang 
        // const increaseButton = document.createElement('button');
        // increaseButton.textContent = '+';
        // increaseButton.className = 'btn btn-danger btn-sm mr-2';
        // increaseButton.addEventListener('click', function () {
        //     increaseQty(product.qty);
        // });
        // cellActions.appendChild(increaseButton);

        // // theem button　giam 
        // const decreaseeButton = document.createElement('button');
        // decreaseButton.textContent = '-';
        // decreaseeButton.className = 'btn btn-danger btn-sm mr-2';
        // decreaseButton.addEventListener('click', function () {
        //     decreaseQty(product.qty);
        // });
        // cellActions.appendChild(decreaseButton);



        // Thêm nút xoá
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm mr-2';
        deleteButton.addEventListener('click', function () {
            deleteProduct(product.id);
        });
        cellActions.appendChild(deleteButton);
    });
}

// function updateQuantity(button, change) {
//     let quantityInput = button.parentNode.querySelector('input');
//     let currentValue = parseInt(quantityInput.value);
//     quantityInput.value = currentValue + change > 0 ? currentValue + change : 1;
// }



function deleteProduct(productId) {

    // Tìm vị trí của sản phẩm trong mảng storedProducts
    const index = storeCart.findIndex(product => product.id === productId);

    // Kiểm tra nếu sản phẩm tồn tại trong mảng
    if (index !== -1) {
        // Xoá sản phẩm khỏi mảng
        storeCart.splice(index, 1);

        // Cập nhật localStorage với mảng mới
        localStorage.setItem('cart', JSON.stringify(storeCart));

        // Gọi lại hàm hiển thị sản phẩm để cập nhật bảng
        displayProducts();
    } else {
        console.error('Sản phẩm không tồn tại.');
    }
}


// Tính tổng giá của tất cả sản phẩm
function calculateTotalPrice() {
    let totalPrice = 0;

    storeCart.forEach(product => {

        const price = parseFloat(product.price.replace('$', ''));
        const qty = product.qty;
        console.log(price);

        totalPrice += price * qty;
    });

    return totalPrice;
}

// Hiển thị tổng giá trong thẻ div
function displayTotalPrice() {
    const totalPriceDiv = document.getElementById('totalPriceDiv');
    const total = calculateTotalPrice();

    totalPriceDiv.textContent = `$${total}`;
}

// Gọi hàm để hiển thị tổng giá khi trang được tải
window.onload = function () {
    displayTotalPrice();
    displayProducts();
    updateMenu();
};



function updateMenu() {
    const loggedUser = localStorage.getItem("loggedUser");
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