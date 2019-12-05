'use strict';

class Carousel {
  slides = [
    {
      id: 0,
      title: 'BEST LAPTOP DEALS',
      img: './assets/images/default-slide-img.jpg'
    },
    {
      id: 1,
      title: 'BEST HEADPHONES DEALS',
      img: './assets/images/default-slide-img.jpg'
    },
    {
      id: 2,
      title: 'BEST SPEAKERS DEALS',
      img: './assets/images/default-slide-img.jpg'
    }
  ];

  constructor(element) {
    this.el = element;
    this.el.innerHTML = this.buildCarouselTemplate();
    this.el.querySelector('.carousel-control-prev')
      .addEventListener('click', e => this.insertSlide(this.currentSlide - 1));
    this.el.querySelector('.carousel-control-next')
      .addEventListener('click', e => this.insertSlide(this.currentSlide + 1));

    this.el.addEventListener('click', event=> this.navigationHandler(event));

    this.currentSlide = 0;
    this.insertSlide(0);
  }

  navigationHandler(event) {
    let trg = event.target;
    if (trg.className == 'carousel-indicator') {
      let id = trg.dataset['slideTo'];
      this.insertSlide(id);
    }
  }

  insertSlide(index) {
    if (index > 2) {
      index = 0;
    } else if (index < 0) {
      index = 2;
    }

    let parent = this.el.querySelector('.carousel-inner');
    parent.innerHTML = this.buildSlide(index);
    this.currentSlide = index;

    let points = this.el.querySelectorAll('.carousel-indicator');
    for (let i = 0; i < 3; i++) {
      if (i == this.currentSlide) {
        points[i].classList.add('active');
      } else {
        points[i].classList.remove('active');
      }
    }
  }

  buildSlide(index) {
    let slide = this.slides[index];
    return `
      <div class="carousel-item active">
        <img src="assets/images/default-slide-img.jpg" alt="Activelide">
        <div class="container">
            <div class="carousel-caption">
                <h3 class="h1">${slide.title}</h3>
                <div>
                    <a class="btn" href="#" role="button">
                        View all DEALS
                        <img src="${slide.img}" class="ml-3" alt="">
                    </a>
                </div>
            </div>
        </div>
      </div>    
    `;
  }

  buildCarouselTemplate() {
    return `
      <div id="mainCarousel" class="main-carousel carousel slide">
          <ol class="carousel-indicators">
              <li data-target="#mainCarousel" data-slide-to="0" class="carousel-indicator"></li>
              <li data-target="#mainCarousel" data-slide-to="1" class="carousel-indicator"></li>
              <li data-target="#mainCarousel" data-slide-to="2" class="carousel-indicator"></li>
          </ol>
          <div class="carousel-inner">
          </div>
          
          <button class="carousel-control-prev" href="#mainCarousel" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
          </button>
          <button class="carousel-control-next" href="#mainCarousel" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
          </button>
      </div>
    `;
  }
}



// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.Carousel = Carousel;
