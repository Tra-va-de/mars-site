let elements = document.querySelectorAll('.professions__card');

elements.forEach(element => {
  element.addEventListener('mouseover', () => {
    element.style.animationPlayState = 'paused';
  });

  element.addEventListener('mouseout', () => {
    element.style.animationPlayState = 'running';
  });
});