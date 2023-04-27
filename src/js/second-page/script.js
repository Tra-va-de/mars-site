document.addEventListener('DOMContentLoaded', function () {
    let elements = document.querySelectorAll('.professions__card');

    elements.forEach(element => {
        element.addEventListener('mouseover', () => {
            elements.forEach(element => {
                element.style.animationPlayState = 'paused';
            });
        });

        element.addEventListener('mouseout', () => {
            elements.forEach(element => {
                element.style.animationPlayState = 'running';
            });
        });
    });
});