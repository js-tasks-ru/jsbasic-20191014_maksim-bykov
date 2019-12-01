## Учебный проект: компонента CheckoutProductList

### Что нужно сделать:
Создать класс компонеты CheckoutProductList, которая будет рисовать список товаров внутрь заданного элемента.
Конструктор класса принимает элемент, в который он вставляет свою разметку и массив товаров в корзине. Массив товаров нужно получить из localStorage на странице.

### Примерный алгоритм выполнения:

#### 1. Базовая отрисовка компоненты 
- Получить товары из хранилища `localStorage`: 
```
localStorage.getItem('cart-products');
```

- !!! Товары в [localStorage](http://learn.javascript.ru/localstorage) должны у вас появиться в результате выполнения предыдущей задачи
- !!! Не забудьте преобразовать строку из хранилища с помощью `JSON.parse`. В результате этого шага вы получите массив объектов товаров

- Пример объекта для ОДНОГО товара:
```javascript
const product = {
    id: 1, // Уникальный идентификатор товара
    title: 'Название товара',
    imageUrl: '/ссылка на картинку',
    // Свойство rating либо объект, либо null, если никто не оставил отзыв
    rating: {
        stars: 4, // Число от 0 до 5, количество звезд рейтинга
        reviewsAmount: 12, // Количество отзывов на товар
    },
    price: '$353', // Строка с текущей ценой цена
    oldPrice: null, // Строка со старой ценой или null, если старой цены нет. Если старая цена есть, ее нужно показать
}
```

- Отрисовать разметку компоненты:
```html
Основа разметки всей компоненты, в которую нужно вставить список карточек:
<div class="product-list-box">
    <!--ВОТ ЗДЕСЬ БУДУТ КАРТОЧКИ ТОВАРОВ-->
</div>
```

- Разметка карточки товара:
```html
<div data-product-id="1" class="product-wrapper box-inner-col description-col">
  
  <div class="product-image-container">
    <img class="product-image" src="assets/images/canon1.png" alt="img">
  </div>
  
  <div class="product-description">
    <h4 class="col-title mb-2">Canon EOS 200D Digital SLR Camera</h4>
    <div class="rate">
      <i class="icon-star checked"></i>
      <i class="icon-star checked"></i>
      <i class="icon-star checked"></i>
      <i class="icon-star checked"></i>
      <i class="icon-star checked"></i>
    </div>
    <p class="rate-amount d-none d-md-block mt-1">11 reviews</p>
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
```


- https://codepen.io/Dolgach/pen/EqbeEx?editors=0010 вот здесь мы уже рисовали звезды. 
- !!! Обратите внимание на то, что там используется другой подход и другие CSS классы, просто скопировать и вставить не получится.
- Также мы уже рисовали список товаров, но с другой версткой, можно переиспользовать основной JS код
- CSS Классы для звездочек
    - "icon-star" - базовый класс, который должен быть у всех звезд
    - "checked" - если звезда закрашена
    - тег для звездочки стоит использовать `<i></i>`

- В итоге вы получите что-то похожее:
```html
<div class="product-list-box">
    <div class="product-wrapper box-inner-col description-col">
      
      <div class="product-image-container">
        <img class="product-image" src="assets/images/canon1.png" alt="img">
      </div>
      
      <div class="product-description">
        <h4 class="col-title mb-2">Canon EOS 200D Digital SLR Camera</h4>
        <div class="rate">
          <i class="icon-star checked"></i>
          <i class="icon-star checked"></i>
          <i class="icon-star checked"></i>
          <i class="icon-star checked"></i>
          <i class="icon-star checked"></i>
        </div>
        <p class="rate-amount d-none d-md-block mt-1">11 reviews</p>
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
</div>
```

- Втставить разметку в элемент, который передается как параметр в конструктор при создании компоненты.
  - `product-list-box-wrapper` - класс пустого элемента внутрь которого нужно вставлять нашу компоненту.

#### 2. Удаление товара из корзины

У каждого товара справа есть кнопка для удаления этого товара из корзины. 
В этом пункте вы реализуете процесс удаления.

- Т.к. товаров в корзине может быть любое количество, 
рекомендуется использовать прием [Делегирование событий](http://learn.javascript.ru/event-delegation);
Т.е. навесить только один обработчик на родительский элемент.
  -  `product-list-box` - CSS класс родительского элемента
  - `data-button-role="checkout-remove-product"` - дата-атрибут на кнопке удаления
- Перед удалением элемента со страницы, рекомендуется переспросить у пользователя с помощью встроенной функции
`confirm('Вы уверенны, что хотите удалить этот товар из корзины?')`
- После удаления, нужно записать новый список товаров в `localStorage`. Это важно для следующей компоненты.
- Каждая карточка товара имеет атрибут с id этого товара - `data-product-id="${product.id}"`, это нужно чтобы понять, какой именно товар мы удаляем.
- Каждая карточка товара имеет класс `product-wrapper`
- Обратите внимание, т.к. в `localStorage` все хранится как строка, то при удалении товара, вам нужно полностью перезаписать весь список.
  
