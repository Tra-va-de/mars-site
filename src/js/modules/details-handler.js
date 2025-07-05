// Обработчик элементов details в слайдах
export function initDetailsHandler() {
    // Получаем все элементы <details> внутри слайдов
    const detailsElements = document.querySelectorAll('.swiper-slide details');

    // Добавляем обработчик события toggle каждому элементу <details>
    detailsElements.forEach(function (details) {
        // Находим родительский слайд
        const slide = details.closest('.swiper-slide');
        let cardHeight;

        details.addEventListener('toggle', function () {
            // Если слайд найден, обновляем его размер
            if (slide) {
                // Если <details> открыт, получаем высоту его содержимого и обновляем высоту слайда
                if (details.open) {
                    cardHeight = slide.clientHeight;
                    const detailsHeight = slide.querySelector('.professions__details').clientHeight;
                    slide.style.height = detailsHeight + 'px';
                }
                // Если <details> закрыт, восстанавливаем исходную высоту слайда
                else {
                    // Восстанавливаем исходную высоту слайда
                    slide.style.height = cardHeight + 'px';
                }
            };
        });
    });
} 