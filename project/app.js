// To show cart

let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
});

// Products array

const productElements = document.querySelector(".products");
const cartItemsElements = document.querySelector(".listCart");
const totalElements = document.querySelector(".total");
const cartElements = document.querySelector(".cartTotal");

function renderProducts(){
    products.forEach( (product) => {
        productElements.innerHTML += `
        <div>
            <img src="${product.imgsrc}"/>
            <p>${product.name}</p>
            <p>${product.price}</p>
            <button class="cart" onclick="addToCart(${product.id})" >Add to Cart</button>
        </div>
        `;
    });
};
renderProducts();

// Cart 
let cart = [];

// Add to cart function

function addToCart(id) {
    //Duplicate checking
    if(cart.some((item) => item.id === id)) {
      changeUnits("plus", id);
    } else{
      const item = products.find( (product) => product.id === id);
    
      cart.push({
       ...item,
       numberOfUnits: 1,
      });
    }

    updateCart();
}


// Update cart
function updateCart() {
    renderCartItems();
    renderTotal();
}

// Calculate and show total amount

function renderTotal() {
    let totalPrice = 0, 
      totalItems = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });

    totalElements.innerHTML = `Total (${totalItems} Items): R${totalPrice}`;
    cartElements.innerHTML = totalItems;
}

// Render cart items
function renderCartItems() {
       cartItemsElements.innerHTML =""; // clears cart
       cart.forEach((item) => {
            cartItemsElements.innerHTML += `
            <div class="items">
                <div class="image" onclick="removeFromCart(${item.id})">
                  <img src="${item.imgsrc}" alt="" />
                </div>
                <div class="name">
                  ${item.name}
                </div>
                <div class="price">
                  ${item.price}
                </div>
                <div class="quantity">
                    <span class="minus" onclick="changeUnits('minus',${item.id})"><</span>
                    <span>${item.numberOfUnits}</span>
                    <span class="plus" onclick="changeUnits('plus',${item.id})">></span>
                </div>
            </div>
        `;
    });
}

// Remove from cart
function removeFromCart(id) {
    cart = cart.filter((item) => item.id !== id);

    updateCart();
}

// Change of units
function changeUnits(action,id) {
    cart = cart.map((item) => {
        let numberOfUnits = item.numberOfUnits;

        if(item.id === id) {
            if(action === "minus" && numberOfUnits > 1) {
                numberOfUnits --;
            }else if(action === "plus") {
                numberOfUnits ++;
            }

            return {
                ...item,
                numberOfUnits,
            };
        };
    });

    updateCart();
}