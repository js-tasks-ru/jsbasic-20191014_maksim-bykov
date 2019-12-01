describe('8-module-1-task', () => {
  let productList = null;
  let oldFetch = window.fetch;
  let parentElement;
  let products;
  let product;

  function mockFetch(data) {
    window.fetch = function () {
      return Promise.resolve({json: () => Promise.resolve(data)});
    };
  }

  function getProductAddButton() {
    let productElements = parentElement.querySelectorAll('.products-list-product');
    let productElement = productElements[0];

    return productElement
      .querySelector('.product-add-to-cart');
  }

  function checkIsProductAddedToCart(product) {
    let productsFromStorageJSON = localStorage.getItem('cart-products');
    let productsFromStorage = JSON.parse(productsFromStorageJSON);

    return !!productsFromStorage && productsFromStorage.some((productsFromStorage) => {
      return productsFromStorage.id === product.id;
    });
  }

  beforeEach(() => {
    product = {
      id: 1,
      title: 'Nuraphone - Wireless Bluetooth Over-Ear Headphones',
      imageUrl: '/assets/images/headphones.png',
      rating: {
        stars: 4,
        reviewsAmount: 24
      },
      price: '€ 399',
      oldPrice: null
    };
    products = [product];

    mockFetch(products);

    parentElement = document.createElement('div');

    productList = new ProductList(parentElement);
  });

  afterEach(() => {
    productList = null;
    window.fetch = oldFetch;
  });

  it('проверяем отрисовку', async () => {
    await productList.show();

    expect(productList.el.querySelector('.card-title').innerHTML)
      .toEqual('Nuraphone - Wireless Bluetooth Over-Ear Headphones');
  });

  describe('Добавление в корзину', () => {
    let confirmSpyObj;

    beforeEach(() => {
      localStorage.clear();
      confirmSpyObj = spyOn(window, 'confirm');
    });

    afterEach(() => {
      confirmSpyObj.and.callThrough();
    });

    it('не должна добавлять товар если пользователь отменил добавление', async () => {
      await productList.show();

      confirmSpyObj.and.returnValue(false);

      let productElementAddButton = getProductAddButton();
      productElementAddButton
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));

      let isProductAddedToCart = checkIsProductAddedToCart(product);

      expect(isProductAddedToCart).toBe(false);
    });

    it('должна добавлять товар в корзину', async () => {
      await productList.show();

      confirmSpyObj.and.returnValue(true);

      let productElementAddButton = getProductAddButton();
      productElementAddButton
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));

      let isProductAddedToCart = checkIsProductAddedToCart(product);

      expect(isProductAddedToCart).toBe(true);
    });
  });

});
