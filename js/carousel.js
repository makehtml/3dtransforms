// rotate carousel
(() => {
  const demo = document.querySelector('.demo--rotate-carousel');
  const carousel = demo.querySelector('.carousel');
  const cellCount = 9;
  let selectedIndex = 0;

  // Функция вращения карусели
  const rotateCarousel = () => {
    const angle = (selectedIndex / cellCount) * -360;
    carousel.style.transform = `translateZ(-288px) rotateY(${angle}deg)`;
  };

  const prevButton = demo.querySelector('.previous-button');
  const nextButton = demo.querySelector('.next-button');

  // Обработчики кликов по кнопкам
  prevButton.addEventListener('click', () => {
    selectedIndex--;
    rotateCarousel();
  });

  nextButton.addEventListener('click', () => {
    selectedIndex++;
    rotateCarousel();
  });
})();

// dynamic carousel
(() => {
  const demo = document.querySelector('.demo--dynamic-carousel');
  const carousel = demo.querySelector('.carousel');
  const cells = Array.from(carousel.querySelectorAll('.carousel__cell'));
  let cellCount = 9;
  let selectedIndex = 0;
  const cellWidth = carousel.offsetWidth;
  const cellHeight = carousel.offsetHeight;
  let isHorizontal = true;
  let rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
  let radius, theta;

  // Функция вращения динамической карусели
  const rotateCarousel = () => {
    const angle = theta * selectedIndex * -1;
    carousel.style.transform = `translateZ(${-radius}px) ${rotateFn}(${angle}deg)`;
  };

  // Обновление карусели на основе диапазона клеток
  const changeCarousel = () => {
    theta = 360 / cellCount;
    const cellSize = isHorizontal ? cellWidth : cellHeight;
    radius = Math.round((cellSize / 2) / Math.tan(Math.PI / cellCount));

    cells.forEach((cell, index) => {
      if (index < cellCount) {
        // Видимая клетка
        cell.style.opacity = 1;
        const cellAngle = theta * index;
        cell.style.transform = `${rotateFn}(${cellAngle}deg) translateZ(${radius}px)`;
      } else {
        // Скрытая клетка
        cell.style.opacity = 0;
        cell.style.transform = 'none';
      }
    });

    rotateCarousel();
  };

  const prevButton = demo.querySelector('.previous-button');
  const nextButton = demo.querySelector('.next-button');
  const cellsRange = demo.querySelector('.cells-range');
  
  prevButton.addEventListener('click', () => {
    selectedIndex--;
    rotateCarousel();
  });

  nextButton.addEventListener('click', () => {
    selectedIndex++;
    rotateCarousel();
  });

  // Слушатели для изменения количества клеток
  cellsRange.addEventListener('input', changeCarousel);
  cellsRange.addEventListener('change', changeCarousel);

  // Обработка изменения ориентации
  const orientationRadios = demo.querySelectorAll('input[name="orientation"]');

  orientationRadios.forEach(radio => {
    radio.addEventListener('change', onOrientationChange);
  });

  const onOrientationChange = () => {
    const checkedRadio = demo.querySelector('input[name="orientation"]:checked');
    isHorizontal = checkedRadio.value === 'horizontal';
    rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
    changeCarousel();
  };

  // Устанавливаем начальное состояние
  onOrientationChange();
})();
