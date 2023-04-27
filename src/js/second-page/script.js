let elements = document.querySelectorAll('.professions__card');

elements.forEach(element => {
  element.addEventListener('mouseover', () => {
    element.style.animationPlayState = 'paused';
  });
});