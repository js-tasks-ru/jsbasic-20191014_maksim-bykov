'use strict';

class CheckoutProductList {
  productsStoreKey = 'cart-products';  

  constructor(parentElement) {
    this.el = parentElement;
    this.buildContent();

    this.el.addEventListener('click', this.removeHandler);
  }

  removeHandler(event) {    
    let trg = event.target;
    if (trg.className == 'product-remove-button') {
      let parent = trg.closest('.product-wrapper');

      let doIt = confirm('Вы уверенны, что хотите удалить этот товар из корзины?');
      if (doIt) {
        let productId = +parent.dataset['productId'];
        parent.remove();

        let cart = localStorage.getItem('cart-products');
        let cartData = cart ? JSON.parse(cart) : [];
        if (cartData.some(cart => cart.id == productId)) {
          let products = cartData.filter(p => p.id != productId);          
          localStorage.setItem('cart-products', JSON.stringify(products));
        }
      }
    }
  }

  buildContent() {
    let data = this.getProducts();
    this.el.innerHTML = this.makeList(data);
  }

  getProducts() {    
    let cart = localStorage.getItem('cart-products');
    return cart ? JSON.parse(cart) : [];
  }

  makeList(products) {
    let productCards = '';
    if (products && products.length && products.length > 0) {
      for (let i = 0; i < products.length; i++) {
        productCards += this.makeCart(products[i]);
      }
    }
    let res = `
    <div class="product-list-box">
      ${productCards}
    </div>
    `;
    return res;
  }

  makeCart(product) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (product.rating) {
        if (i <= product.rating.stars) {
          stars += '<i class="icon-star checked"></i>';
        } else {
          stars += '<i class="icon-star"></i>';
        }
      } else {
        stars += '<i class="icon-star"></i>';
      }
    }

    let rating = `
      <div class="rate">
        ${stars}
      </div>  
      <p class="rate-amount d-none d-md-block mt-1">${product.rating ? product.rating.reviewsAmount : 0} reviews</p>  
    `;

    let cart = `    
    <div data-product-id="${product.id}" class="product-wrapper box-inner-col description-col">
  
      <div class="product-image-container">
        <img class="product-image" src="${product.imageUrl}" alt="img">
      </div>
      
      <div class="product-description">
        <h4 class="col-title mb-2">${product.title}</h4>
        ${rating}
      </div>
      
      <div class="product-price">
        <p class="mb-0 font-weight-light">Price:</p>
        <h4 class="col-title price-text mb-2">${product.price}</h4>
      </div>
      
      <div class="product-remove-button-wrapper">
        <button type="button"
                data-button-role="checkout-remove-product"
                class="product-remove-button">
          X
        </button>
      </div>

    </div>
    `;

    return cart;
  }
}

window.CheckoutProductList = CheckoutProductList;
