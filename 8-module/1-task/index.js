//import { promises } from 'dns';

class ProductList {
  productsUrl = '/assets/data/products.json';
  productsStoreKey = 'cart-products';

  constructor(element) {
    this.el = element;    
  }

  async show() {
    await fetch(this.productsUrl)
      .then(res => res.json())
      .then((data) => {
        this.data = data;
        let content = this.drawList(data);
        this.el.innerHTML = content;

        let cartlist = this.el.querySelector('.homepage-cards');
        cartlist.addEventListener('click', this.addHandler);
      });
  }

  addHandler(event) {
    let trg = event.target;
    if (trg.className == 'product-add-to-cart') {
      let parent = trg.closest('.products-list-product');
      let doIt = confirm('Вы уверенны, что хотите добавить этот товар в корзину?');
      if (doIt) {
        let productId = +parent.dataset['productId'];
        let cart = localStorage.getItem('cart-products');
        let cartData = cart ? JSON.parse(cart) : [];
        if (!cartData.some(cart => cart.id == productId)) {
          cartData.push({id: productId});
        }
        localStorage.setItem('cart-products', JSON.stringify(cartData));
      }
    }
  }

  drawList(productData) {
    let productList = '';
    productData.forEach(element => {
      productList += this.drawCard(element);
    });

    return `
    <div class="row justify-content-end">
      <div class="col-lg-9">
        <h3 class="section-title">Top Recommendations for You</h3>
        <div class="row homepage-cards">    
          ${productList}        
        </div>
      </div>
    </div>`;
  }

  drawCard(product) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (product.rating) {
        if (i <= product.rating.stars) {
          stars += '<i class="icon-star checked"></i>';
        } else {
          stars += '<i class="icon-star active"></i>';
        }
      } else {
        stars += '<i class="icon-star"></i>';
      }
    }

    let rating = `
      <div class="rate">
        ${stars}
        <span class="rate-amount ml-2">${product.rating ? product.rating.reviewsAmount : ''}</span>
      </div>    
    `;
        
    let price = `<p class="card-text price-text discount"><strong>${product.price}</strong>`;
    if (product.oldPrice) {
      price += `<small class="ml-2">${product.oldPrice}</small></p>`;
    }

    let card = `
    <div data-product-id="${product.id}" class="products-list-product col-md-6 col-lg-4 mb-4">
      <div class="card">
        <div class="card-img-wrap">
          <img class="card-img-top" src="${product.imageUrl}" alt="Card image cap">
        </div>
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          ${rating}
          ${price}          
          <button class="product-add-to-cart" data-button-role="add-to-cart">
            Add to cart
          </button>
        </div>
      </div>
    </div>
    `;
    return card;
  }

}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.ProductList = ProductList;
