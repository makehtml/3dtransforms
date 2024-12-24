// perspective cube

(() => {
  const demo = document.querySelector('.demo--persp-cube');
  const scene = demo.querySelector('.scene');
  const cube = demo.querySelector('.cube');
  let originX = 50;
  let originY = 50;

  // Обновляем позицию перспективы
  const updatePerspectiveOrigin = () => {
    scene.style.perspectiveOrigin = `${originX}% ${originY}%`;
  };

  // Управление перспективой
  const perspectiveRange = demo.querySelector('.perspective-range');
  const perspectiveDisplay = perspectiveRange.parentNode.querySelector('.range-display');
  
  const updatePerspective = () => {
    let value = `${perspectiveRange.value}px`;
    if (value === '1000px') {
      value = 'none';
      perspectiveDisplay.textContent = 'none';
    } else {
      perspectiveDisplay.textContent = value;
    }
    scene.style.perspective = value;
  };
  perspectiveRange.addEventListener('input', updatePerspective);
  perspectiveRange.addEventListener('change', updatePerspective);
  updatePerspective(); // Вызов для начальной установки

  // Управление origin X
  const originXRange = demo.querySelector('.origin-x-range');
  originXRange.addEventListener('input', () => {
    originX = originXRange.value;
    updatePerspectiveOrigin();
  });
  originXRange.addEventListener('change', () => {
    originX = originXRange.value;
    updatePerspectiveOrigin();
  });
  updatePerspectiveOrigin(); // Вызов для начальной установки

  // Управление origin Y
  const originYRange = demo.querySelector('.origin-y-range');
  originYRange.addEventListener('input', () => {
    originY = originYRange.value;
    updatePerspectiveOrigin();
  });
  originYRange.addEventListener('change', () => {
    originY = originYRange.value;
    updatePerspectiveOrigin();
  });
  updatePerspectiveOrigin(); // Вызов для начальной установки

  // Управление вращением куба
  const spinCubeCheckbox = demo.querySelector('.spin-cube-checkbox');
  spinCubeCheckbox.addEventListener('change', () => {
    cube.classList.toggle('is-spinning', spinCubeCheckbox.checked);
  });

  // Управление видимостью задней части
  const backfaceCheckbox = demo.querySelector('.backface-checkbox');
  backfaceCheckbox.addEventListener('change', () => {
    cube.classList.toggle('is-backface-hidden', !backfaceCheckbox.checked);
  });

})();
