describe('9-module-1-task', () => {
  let parentElement;
  let products;

  beforeEach(() => {
    products = [
      {
        id: 1,
        title: 'Nuraphone - Wireless Bluetooth Over-Ear Headphones',
        imageUrl: '/assets/images/headphones.png',
        rating: {
          stars: 4,
          reviewsAmount: 24
        },
        price: '€ 399',
        oldPrice: null
      },
      {
        id: 2,
        title: 'Homido Virtual Reality Headset for Smartphone',
        imageUrl: '/assets/images/headset.png',
        rating: {
          stars: 5,
          reviewsAmount: 121
        },
        price: '€ 47.31',
        oldPrice: null
      },
      {
        id: 3,
        title: 'Victrola Pro USB Bluetooth Turntable Vinyl to MP3 Function',
        imageUrl: '/assets/images/turntable.png',
        rating: {
          stars: 5,
          reviewsAmount: 24
        },
        price: '€ 129.92',
        oldPrice: '€ 250'
      },
      {
        id: 4,
        title: 'Zolo Liberty Bluetooth Headphones',
        imageUrl: '/assets/images/bluetooth-headphones.png',
        rating: null,
        price: '€ 79.99',
        oldPrice: '€ 90.55'
      },
      {
        id: 5,
        title: 'Libratone Zipp Wireless Speaker',
        imageUrl: '/assets/images/speaker.png',
        rating: {
          stars: 5,
          reviewsAmount: 11
        },
        price: '€ 205.98',
        oldPrice: null
      },
      {
        id: 6,
        title: 'Mikme Microphone, Black',
        imageUrl: '/assets/images/microphone.png',
        rating: {
          stars: 4,
          reviewsAmount: 14
        },
        price: '€ 299.00',
        oldPrice: null
      }
    ];

    const productsJSON = JSON.stringify(products);
    localStorage.setItem('cart-products', productsJSON);

    parentElement = document.createElement('div');

    new CheckoutProductList(parentElement);
  });

  it('должна рисовать 6 продуктов с правильным базовым классом', function () {
    let productElements = parentElement.querySelectorAll('.product-wrapper');

    expect(productElements.length).toBe(6);
  });

  it('должна добавлять правильное название у продукта', function () {
    let productElements = parentElement.querySelectorAll('.product-wrapper');
    let secondProductElement = productElements[1];
    let secondProduct = products[1];

    let secondProductElementNameElement = secondProductElement
      .querySelector('.product-description .col-title');
    let nameFromHTML = secondProductElementNameElement ?
      secondProductElementNameElement.innerHTML.trim() : '';
    let productName = secondProduct.title;

    expect(nameFromHTML).toEqual(productName);
  });

  describe('удаление', () => {
    let confirmSpyObj;
    let productElement;
    let product;
    let productElementRemoveButton;

    beforeEach(() => {
      confirmSpyObj = spyOn(window, 'confirm');
      const productElements = parentElement.querySelectorAll('.product-wrapper');
      productElement = productElements[3];
      product = products[3];
      productElementRemoveButton = productElement
        .querySelector('.product-remove-button');

      productElementRemoveButton
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    afterEach(() => {
      confirmSpyObj.and.callThrough();
    });

    it('должна удалять товар из верстки', function () {
      confirmSpyObj.and.returnValue(true);

      productElementRemoveButton
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));

      let productElementsAfterRemove = parentElement.querySelectorAll('.product-wrapper');
      let isProductElementRemoved = ![...productElementsAfterRemove].some((element) => {
        return parseInt(element.dataset.productId, 10) === product.id;
      });

      expect(isProductElementRemoved).toBe(true);
    });

    it('не должна удалять товар если пользователь отменил удаление', function () {
      confirmSpyObj.and.returnValue(false);

      productElementRemoveButton
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));

      let productElementsAfterRemove = parentElement.querySelectorAll('.product-wrapper');
      let isProductElementRemoved = ![...productElementsAfterRemove].some((element) => {
        return parseInt(element.dataset.productId, 10) === product.id;
      });

      expect(isProductElementRemoved).toBe(false);
    });

    it('должна удалять товар из хранилища', function () {
      confirmSpyObj.and.returnValue(true);

      productElementRemoveButton
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));

      let productsFromStorageJSON = localStorage.getItem('cart-products');
      let productsFromStorage = JSON.parse(productsFromStorageJSON);
      let isProductFromStorageRemoved = !productsFromStorage.some((productsFromStorage) => {
        return productsFromStorage.id === product.id;
      });

      expect(isProductFromStorageRemoved).toBe(true);
    });
  });

});
