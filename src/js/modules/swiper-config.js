// Конфигурация Swiper слайдера
export const swiperConfig = {
    // ====================
    // Основные параметры
    // ====================
    // направление
    direction: 'horizontal',
    // зацикленный слайдер
    loop: true,
    // скорость переключения
    speed: 1000,

    // кол-во отображаемых слайдов
    slidesPerView: 3,
    // расстояние между слайдами
    spaceBetween: 130,

    // прокрутка мышью
    mousewheel: true,
    // курсор с рукой
    grabCursor: true,

    // прокрутка клавиатурой
    keyboard: {
        enabled: true,
        // только в пределах видимости
        onlyInViewport: true,
    },

    // автослайдинг
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },

    // ====================
    // Адаптив
    // ====================
    breakpoints: {
        1600: {
            spaceBetween: 130,
        },

        800: {
            slidesPerView: 3,
            spaceBetween: 50,
        },

        0: {
            slidesPerView: 1,
        },
    },
}; 