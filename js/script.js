document.addEventListener('DOMContentLoaded', function() {
  // 头部动态隐藏/显示（向下滚动隐藏，向上滚动显示）
  const header = document.getElementById('site-header');
  let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop < lastScrollTop) {
      header.classList.remove('header-hidden');
    } else {
      header.classList.add('header-hidden');
    }
    lastScrollTop = scrollTop;
  });
  
  // 添加触摸事件监听
  document.querySelector('.header-logo').addEventListener('touchstart', function() {
    this.classList.add('active');
  });
  document.querySelector('.header-logo').addEventListener('touchend', function() {
    this.classList.remove('active');
  });

  // 轮播图逻辑
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-button.prev');
  const nextBtn = document.querySelector('.carousel-button.next');
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  let currentIndex = 0;
  let autoRotate = true;
  let autoRotateInterval = setInterval(nextSlide, 3000);
  let resumeTimeout;

  // 创建指示器（小方块）
  slides.forEach((slide, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', function() {
      stopAutoRotate();
      currentIndex = index;
      showSlide(currentIndex);
    });
    indicatorsContainer.appendChild(indicator);
  });

  const indicators = document.querySelectorAll('.carousel-indicators .indicator');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  function stopAutoRotate() {
    if (autoRotate) {
      clearInterval(autoRotateInterval);
      autoRotate = false;
      if (resumeTimeout) clearTimeout(resumeTimeout);
      // 40秒后恢复自动轮播
      resumeTimeout = setTimeout(function() {
        autoRotate = true;
        autoRotateInterval = setInterval(nextSlide, 3000);
      }, 40000);
    }
  }

  prevBtn.addEventListener('click', function() {
    stopAutoRotate();
    prevSlide();
  });

  nextBtn.addEventListener('click', function() {
    stopAutoRotate();
    nextSlide();
  });
});
