const swiper = new Swiper('.swiper', {
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
});


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
    // // Получим высоту слайда
    const cardHeight = slide.clientHeight;
    // // Установим явную высоту слайда
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


// Используем библиотеку hyphenopoly для разбиения слов на слоги
Hyphenopoly.config({
    require: {
        "ru": "приветстогосвета",
        "en-us": "Supercalifragilisticexpialidocious",
    },
    setup: {
        selectors: {
            ".professions": {}
        }
    },
    paths: {
        "patterndir": "../js/hyphenopoly/patterns/", //path to the directory of pattern files
        "maindir": "../js/hyphenopoly/" //path to the directory where the other ressources are stored
    }
});