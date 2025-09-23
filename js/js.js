$(document).ready(function () {
  
  const $slider = $('#slider');
  const slideWidth = 600;
  const $slides = $slider.children();
  const slideCount = $slides.length;
  let currentIndex = 1;
  let animating = false;

  const $firstClone = $slides.first().clone();
  const $lastClone = $slides.last().clone();

  $slider.append($firstClone);
  $slider.prepend($lastClone);

  const totalSlides = slideCount + 2;

  function getSlideWidth() {
    if (window.innerWidth <= 600) {
      return 300;
    } else {
      return window.innerWidth / 2;
    }
  }

  function updateSliderSize() {
    const slideWidth = getSlideWidth();
    $slider.css('width', slideWidth * totalSlides + 'px');
    $slider.css('transform', `translateX(-${slideWidth * currentIndex}px)`);
  }

  updateSliderSize();

  function updateSlide() {
    if (animating) return;
    animating = true;

    const slideWidth = getSlideWidth();

    $slider.css('transition', 'transform 0.5s ease');
    $slider.css('transform', `translateX(-${slideWidth * currentIndex}px)`);

    setTimeout(() => {
      if (currentIndex === 0) {
        $slider.css('transition', 'none');
        currentIndex = slideCount;
        $slider.css('transform', `translateX(-${slideWidth * currentIndex}px)`);
      }
      if (currentIndex === slideCount + 1) {
        $slider.css('transition', 'none');
        currentIndex = 1;
        $slider.css('transform', `translateX(-${slideWidth * currentIndex}px)`);
      }

      animating = false;
      updateIndicator();
    }, 500);
  }

  function updateIndicator() {
    let indicatorIndex = currentIndex - 1;
      
    if (currentIndex === 0) {
      indicatorIndex = slideCount - 1;
    } else if (currentIndex === slideCount + 1) {
      indicatorIndex = 0;
    }
      
    $('#indicator .list').removeClass('active');
    $('#indicator .list').eq(indicatorIndex).addClass('active');
      
    let translateX = 0;
    if (window.innerWidth <= 600) {
      translateX = 70 * indicatorIndex;
    } else {
      translateX = 290 * indicatorIndex;
    }
    $('.indicator-2 .active-bar').css('transform', `translateX(${translateX}px)`);
  }
    
  $('#next, #rwd-next').click(() => {
    if (animating) return;
    currentIndex++;
    updateSlide();
  });
    
  $('#prev, #rwd-prev').click(function () {
    if (animating) return;
    currentIndex--;
    updateSlide();
  });
    
  $('#indicator .list').each(function (index) {
    $(this).click(function () {
      if (animating) return;
      currentIndex = index + 1;
      updateSlide();
    });
  });
    
  $('#indicator-2 .list').each(function (index) {
    $(this).click(function () {
      if (animating) return;
      currentIndex = index + 1;
      updateSlide();
    });
  });
  updateIndicator();
});


document.querySelectorAll('.box-title').forEach(header => {
  header.addEventListener('click', () => {
    const faqItem = header.parentElement;
    const content = faqItem.querySelector('.box-content');
    const isOpen = faqItem.classList.contains('open');

    // 全て閉じる
    document.querySelectorAll('.box').forEach(item => {
      item.classList.remove('open');
      item.querySelector('.box-content').style.height = '0px';
    });

    // クリックしたものだけ開く
    if (!isOpen) {
      faqItem.classList.add('open');
      content.style.height = content.scrollHeight + 'px';
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const targets = document.querySelectorAll(".scroll");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  targets.forEach((target) => {
    observer.observe(target);
  });
});


$(function () {
  $('#hamburger').on('click', function () {
    $('.header-box2').toggleClass('show');

    if ($('.header-box2').hasClass('show')) {
      $('.header-box2').css('display', 'block');
    } else {
      $('.header-box2').css('display', 'none');
    }
  });
});

$(function () {
  $('#hamburger').on('click', function () {
    $('.header-box2').slideToggle();
  });
});