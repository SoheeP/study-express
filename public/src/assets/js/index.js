
$(document).ready(function () {

  Array.from(document.querySelectorAll('[data-rating]')).map(list => {
    list.style.width = `${list.getAttribute('data-rating')}%`;
  })


  $('.main__slider').slick({
    dots: false,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<span class="slider__btn prev"><i class="fas fa-caret-left"></i></span>',
    nextArrow: '<span class="slider__btn next"><i class="fas fa-caret-right"></i></span>',
  });

  $('.main__poster_row').slick({
    dots: false,
    infinite: true,
    variableWidth: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          speed: 500,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          speed: 500,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          speed: 500,
        }
      }
    ]
  });


});