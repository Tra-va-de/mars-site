// Обработчики событий для Swiper слайдера
export function initSwiperHandlers(swiper) {
    // сделали перенастройку размеров слайдов
    // при изменении размера окна
    window.addEventListener('resize', function () {
        swiper.slides.forEach(slide => {
            // Закрываем все details внутри слайдов
            const details = slide.querySelector('details');
            if (details) {
                details.removeAttribute('open');
            }

            // делаем рассчет высоты автоматическим
            setTimeout(() => {
                slide.style.height = '';
            }, 10);

            // Установим явную высоту слайда с небольшой задержкой
            setTimeout(() => {
                slide.style.height = slide.clientHeight + 'px';
            }, 10);
        });
    });

    // настройка слайдов и взаимодействия с ними
    swiper.slides.forEach((slide, index) => {
        // Получим высоту слайда
        const cardHeight = slide.clientHeight;
        // Установим явную высоту слайда
        slide.style.height = cardHeight + 'px';

        // дополнительные настройки при наведении курсора
        slide.addEventListener('mouseenter', () => {
            // Остановим автоматическую прокрутку слайдов при наведении курсора
            swiper.autoplay.stop();
        });

        slide.addEventListener('mouseleave', () => {
            // Запустим автоматическую прокрутку слайдов при уходе курсора
            swiper.autoplay.start();
        });

        // настройка клика по слайду
        slide.addEventListener('click', () => {
            // Проверим, отображается ли больше одного слайда
            if (swiper.params.slidesPerView > 1) {
                // Если текущий слайд активен, перейдем на предыдущий слайд
                if (slide.classList.contains('swiper-slide-active')) {
                    swiper.slidePrev(300);
                }
                // Если не активен, и индекс не равен 0, перейдем на предыдущий слайд
                else if (index != 0) {
                    swiper.slideToLoop(index - 1, 300);
                }
                // Иначе, если индекс равен 0, перейдем на последний слайд
                else {
                    swiper.slideToLoop(swiper.slides.length - 1, 300);
                }
            }
        });
    });
} 