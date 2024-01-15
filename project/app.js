document.addEventListener("DOMContentLoaded", () => {
  const cartTab = document.querySelector(".cartTab");
  const closeBtn = document.querySelector(".close");
  const productElements = document.querySelector(".products");
  const cartItemsElements = document.querySelector(".listCart");
  const totalElements = document.querySelector(".total");
  const cartElements = document.querySelector(".cartTotal");

  let cart = [];

  function showCart() {
    cartTab.style.inset = "0 0 0 auto";
    document.body.style.overflow = "hidden";
  }

  function hideCart() {
    cartTab.style.inset = "0 -400px 0 auto";
    document.body.style.overflow = "auto";
  }

  document.querySelector(".icon-cart").addEventListener("click", showCart);
  closeBtn.addEventListener("click", hideCart);

  productElements.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("cart")) {
      const productId = parseInt(target.dataset.productId);
      addToCart(productId);
    }
  });

  cartItemsElements.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("remove")) {
      const productId = parseInt(target.dataset.productId);
      removeFromCart(productId);
    } else if (target.classList.contains("minus")) {
      const productId = parseInt(target.dataset.productId);
      changeUnits("minus", productId);
    } else if (target.classList.contains("plus")) {
      const productId = parseInt(target.dataset.productId);
      changeUnits("plus", productId);
    }
  });

  function renderProducts() {
    productElements.innerHTML = "";
    products.forEach((product) => {
      var categoryClass = getCategoryClass(product.id);
      productElements.innerHTML += `
            <div class="product ${categoryClass}" id="product-${product.id}">
              <img src="${product.imgsrc}" class="product-image" alt="${product.name}" />
              <p class="product-name">${product.name}</p>
              <p class="product-price">R${product.price}</p>
              <button class="cart" data-product-id="${product.id}">Add to Cart</button>
            </div>`;
    });
  }

  function getCategoryClass(productId) {
    if (productId >= 0 && productId <= 3) {
      return "yeezy";
    } else if (productId >= 4 && productId <= 7) {
      return "adidas";
    } else {
      return "new-balance";
    }
  }

  function addToCart(id) {
    const item = cart.find((item) => item.id === id);

    if (item) {
      item.numberOfUnits++;
    } else {
      const product = products.find((product) => product.id === id);
      cart.push({ ...product, numberOfUnits: 1 });
    }

    updateCart();
  }

  function removeFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
    updateCart();
  }

  function changeUnits(action, id) {
    const item = cart.find((item) => item.id === id);

    if (item) {
      if (action === "minus" && item.numberOfUnits > 1) {
        item.numberOfUnits--;
      } else if (action === "plus") {
        item.numberOfUnits++;
      }
    }

    updateCart();
  }

  function updateCart() {
    renderCartItems();
    renderTotal();
  }

  function renderTotal() {
    let totalPrice = 0,
      totalItems = 0;

    cart.forEach((item) => {
      totalPrice += item.price * item.numberOfUnits;
      totalItems += item.numberOfUnits;
    });

    totalElements.textContent = `Total (${totalItems} Items): R${totalPrice}`;
    cartElements.textContent = totalItems;
  }

  function renderCartItems() {
    cartItemsElements.innerHTML = "";
    cart.forEach((item) => {
      cartItemsElements.innerHTML += `
          <div class="items">
            <div class="image" onclick="removeFromCart(${item.id})">
              <img src="${item.imgsrc}" alt="" />
            </div>
            <div class="name">${item.name}</div>
            <div class="price">R${item.price}</div>
            <div class="quantity">
              <span class="minus" data-product-id="${item.id}"><</span>
              <span>${item.numberOfUnits}</span>
              <span class="plus" data-product-id="${item.id}">></span>
            </div>
            <button class="remove" data-product-id="${item.id}">Remove</button>
          </div>`;
    });
  }

  renderProducts();
});
