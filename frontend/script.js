let cart = [];
let cartCount = 0;

// CART COUNT
const cartDisplay = document.getElementById("cart-count");

const buttons = document.querySelectorAll(".add-cart");

buttons.forEach((button, index) => {

    button.addEventListener("click", () => {

        const products = [
            "iPhone 15",
            "Samsung S24",
            "OnePlus 13"
        ];

        cart.push(products[index]);

        cartCount++;

        if (cartDisplay) {
            cartDisplay.textContent = cartCount;
        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        alert(
            products[index] +
            " Added To Cart"
        );

    });

});


// REGISTER USER
async function registerUser() {

    const name =
        document.getElementById(
            "name"
        ).value;

    const email =
        document.getElementById(
            "email"
        ).value;

    const password =
        document.getElementById(
            "password"
        ).value;

    const response =
        await fetch(
            "http://localhost:5000/api/users/register",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            }
        );

    const data =
        await response.json();

    localStorage.setItem(
        "username",
        name
    );

    alert(
        data.message
    );

}


// LOGIN USER
async function loginUser() {

    const email =
        document.getElementById(
            "loginEmail"
        ).value;

    const password =
        document.getElementById(
            "loginPassword"
        ).value;

    const response =
        await fetch(
            "http://localhost:5000/api/users/login",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

    const data =
        await response.json();

    alert(
        data.message
    );

    if (
        data.message ===
        "Login Successful"
    ) {

        window.location.href =
            "index.html";
    }

}


// PLACE ORDER
async function placeOrder() {

    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;

    const orders =
        JSON.parse(
            localStorage.getItem(
                "orders"
            )
        ) || [];

    orders.push(
        "Mobile Phone Order | Payment: " +
        payment
    );

    localStorage.setItem(
        "orders",
        JSON.stringify(
            orders
        )
    );

    const response =
        await fetch(
            "http://localhost:5000/api/orders/place",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    product:
                        "Mobile Phone",

                    payment:
                        payment,

                    price:
                        70000
                })
            }
        );

    const data =
        await response.json();

    alert(
        data.message +
        "\nPayment: " +
        payment
    );
    window.location.href =
        "success.html";
}



// CLEAR CART
function clearCart() {

    localStorage.removeItem(
        "cart"
    );

    alert(
        "Cart Cleared Successfully"
    );

    location.reload();

}


// LOGOUT
function logout() {

    localStorage.clear();

    alert(
        "Logged Out Successfully"
    );

    window.location.href =
        "login.html";

}


// WELCOME USER
const username =
    localStorage.getItem(
        "username"
    );

const welcome =
    document.getElementById(
        "welcome"
    );

if (
    welcome &&
    username
) {

    welcome.innerHTML =
        "Welcome, " +
        username +
        " 👋";

}


// SEARCH PRODUCT
function searchProduct() {

    const input =
        document.getElementById(
            "searchBox"
        ).value
        .toLowerCase();

    const products =
        document.querySelectorAll(
            ".search-item"
        );

    products.forEach(
        product => {

            const text =
                product.innerText
                    .toLowerCase();

            if (
                text.includes(
                    input
                )
            ) {

                product.style
                    .display =
                    "block";

            }

            else {

                product.style
                    .display =
                    "none";

            }

        }
    );


}
function addWishlist(product) {

    const wishlist =
        JSON.parse(
            localStorage.getItem(
                "wishlist"
            )
        ) || [];

    wishlist.push(product);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(
            wishlist
        )
    );

    alert(
        product +
        " Added To Wishlist ❤️"
    );

}
// DARK MODE
function toggleDarkMode() {

    document.body.classList.toggle(
        "dark-mode"
    );

    if (
        document.body.classList.contains(
            "dark-mode"
        )
    ) {

        localStorage.setItem(
            "theme",
            "dark"
        );

    }

    else {

        localStorage.setItem(
            "theme",
            "light"
        );

    }

}


// LOAD SAVED THEME
const savedTheme =
    localStorage.getItem(
        "theme"
    );

if (
    savedTheme ===
    "dark"
) {

    document.body.classList.add(
        "dark-mode"
    );

}
const quantity = {

    iphone:1,
    samsung:1,
    oneplus:1,
    laptop:1,
    headphone:1,

    iphonepro:1,
    fold:1,
    pixel:1,
    nothing:1,

    macbook:1,
    rog:1,
    legion:1,
    dell:1,

    airpods:1,
    sony:1

};

const prices = {

    iphone:70000,
    samsung:65000,
    oneplus:55000,
    laptop:75000,
    headphone:2500,

    iphonepro:120000,
    fold:145000,
    pixel:80000,
    nothing:45000,

    macbook:110000,
    rog:95000,
    legion:90000,
    dell:85000,

    airpods:24999,
    sony:29999

};


function increaseQuantity(product) {
    quantity[product]++;
    updateProduct(product);
}


function decreaseQuantity(product) {
    if (quantity[product] > 1) {
        quantity[product]--;
        updateProduct(product);
    }
}

function updateProduct(product) {

    document.getElementById(
        product + "-qty"
    ).innerHTML =
        quantity[product];

    document.getElementById(
        product + "-price"
    ).innerHTML =
        "Total: ₹" +
        (
            quantity[product] *
            prices[product]
        );

}
// PRODUCT CATEGORY FILTER

function filterCategory(category) {

    const products =
        document.querySelectorAll(
            ".product"
        );

    products.forEach(product => {
        if (
            category === "all"
        ) {
            product.style.display =
                "block";
        }
        else if (
            product.classList.contains(
                category
            )
        ) {
            product.style.display =
                "block";
        }
        else {
            product.style.display =
                "none";
        }

    });

}
window.onload = function(){
    const loader =
        document.getElementById(
            "loader"
        );
    if(loader){

        loader.style.display =
            "none";
    }
}
// DISCOUNT COUPON

function applyCoupon() {
    const coupon =
        document.getElementById(
            "couponCode"
        ).value;
    const message =
        document.getElementById(
            "discountMessage"
        );
    if (
        coupon ===
        "SAVE10"
    ) {
        message.innerHTML =
            "🎉 10% Discount Applied";

        message.style.color =
            "green";
    }
    else {
        message.innerHTML =
            "❌ Invalid Coupon";
        message.style.color =
            "red";
    }

}
// PROFILE

const profileName =
    document.getElementById(
        "profileName"
    );
const profileEmail =
    document.getElementById(
        "profileEmail"
    );
if(profileName){
    profileName.innerHTML =
        localStorage.getItem(
            "username"
        ) || "Guest User";
}

if(profileEmail){
    profileEmail.innerHTML =
        localStorage.getItem(
            "email"
        ) || "No Email";

}


function editProfile(){
    const newName =
        prompt(
            "Enter New Name"
        );
    if(newName){
        localStorage.setItem(
            "username",
            newName
        );
        location.reload();
    }
}
// NOTIFICATION

function showNotification(){
    alert(
        "🔥 New Offers Available!"
    );
}
// NEWSLETTER

function subscribe(){
    const email =
        document.getElementById(
            "newsletter"
        ).value;
    if(email){
        alert(
            "Subscribed: " +
            email
        );
    }
}
// PRODUCT REVIEW

function submitReview(){
    alert(
        "⭐ Review Submitted"
    );

}
// COUNTDOWN TIMER

let time = 3600;
setInterval(() => {
    let hours =
        Math.floor(
            time / 3600
        );
    let minutes =
        Math.floor(
            (
                time % 3600
            ) / 60
        );
    let seconds =
        time % 60;
    const timer =
        document.getElementById(
            "timer"
        );
    if(timer){
        timer.innerHTML =
            hours +
            ":" +
            minutes +
            ":" +
            seconds;

    }

    if(time > 0){
        time--;
    }

}, 1000);


// WISHLIST COUNTER

const wishCount =
    document.getElementById(
        "wish-count"
    );

if(wishCount){

    const wishlist =
        JSON.parse(
            localStorage.getItem(
                "wishlist"
            )
        ) || [];

    wishCount.innerHTML =
        wishlist.length;

}


// BACK TO TOP

function topFunction(){

    window.scrollTo({

        top:0,

        behavior:
            "smooth"

    });

}

const images = [

    "images/iphone.jpg",

    "images/samsung.jpg",

    "images/oneplus.jpg",

    "images/laptop.jpg",

    "images/headphone.jpg"

];

let currentImage = 0;

setInterval(() => {

    const slider =
        document.getElementById(
            "slider-image"
        );

    if(slider){

        currentImage++;

        if(
            currentImage >=
            images.length
        ){

            currentImage = 0;

        }

        slider.src =
            images[currentImage];

    }

},3000);
setInterval(()=>{

    const visitor =
        document.getElementById(
            "visitor-count"
        );

    if(visitor){

        visitor.innerHTML =

            Math.floor(

                Math.random()
                *
                1000

            );

    }

},2000);

function openChat(){

    alert(

        "Customer Support\n\n" +

        "📞 +91 9999999999\n\n" +

        "✉ support@store.com"

    );

}
window.onscroll = function(){

    const btn =
        document.getElementById(
            "topBtn"
        );

    if(
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
    ){

        btn.style.display =
            "block";
    }
    else{
        btn.style.display =
            "none";
    }
};
function scrollToTop(){
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}
