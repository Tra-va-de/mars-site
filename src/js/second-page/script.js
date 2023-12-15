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
        // Основной язык
        defaultLanguage: "ru",
        // Селекторы для переносов
        selectors: {
            ".professions": {},
            // Устанавливаем селектор для исключения
            ".professions__types": { minWordLength: 1000 },
        },
    },
    paths: {
        "patterndir": "../js/hyphenopoly/patterns/", //path to the directory of pattern files
        "maindir": "../js/hyphenopoly/" //path to the directory where the other ressources are stored
    }
});


// Получаем все input'ы с типом "text"
const inputsElements = document.querySelectorAll('input[type="text"]');
// Объект для хранения идентификаторов интервалов
let intervalIds = {};
// Объект для хранения изначального текста
let originalPlaceholdersText = {};

// Функция для определения ширины текста
function getTextWidth(text, font) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
}

// Функция проверки размеров placeholder'ов
function checkPlaceholdersSize(inputsElements) {
    // Перебор объекта и очистка 
    // всех запущенных интервалов
    for (let id in intervalIds) {
        console.log(id);
        clearInterval(intervalIds[id]);
    }

    // Очистка объекта
    intervalIds = {};

    inputsElements.forEach(input => {
        // Получаем изначальный текст placeholder'а
        const originalPlaceholderText = input.getAttribute('placeholder');
        // Получаем уникальный идентификатор input (например, id)
        const inputId = input.id;

        // Если для данного inputId еще не сохранено изначальное 
        // значение placeholder'а, сохраняем
        if (!originalPlaceholdersText[inputId]) {
            originalPlaceholdersText[inputId] = originalPlaceholderText;
        }

        // Получаем ширину input и ширину текста placeholder'а
        const inputWidth = input.clientWidth;
        const textWidth = getTextWidth(originalPlaceholderText, getComputedStyle(input).font);

        // Если текст placeholder'а шире, чем сам input 
        // и интервал еще не создан
        if (textWidth > inputWidth && !intervalIds[input]) {
            // Создаем интервал для бегущей строки в placeholder'е
            intervalIds[inputId] = setInterval(() => {
                // Получаем текущий текст placeholder'а
                const placeholderText = input.getAttribute('placeholder');
                // Создаем новый текст с бегущей строкой
                const scrolledText = placeholderText.substring(1) + placeholderText[0];
                // Устанавливаем новый текст в placeholder
                input.setAttribute('placeholder', scrolledText);
            }, 150); // Изменение каждые 200 миллисекунд
        }
        else {
            // Если текст placeholder'а не шире input или интервал уже создан,
            // восстанавливаем изначальный текст
            input.setAttribute('placeholder', originalPlaceholdersText[inputId]);
        }
    });
}

// Подключаем вышеописанную функцию к событию
// изменения размеров окна
window.addEventListener('resize', function () {
    checkPlaceholdersSize(inputsElements);
});

// Изначальный запуск
checkPlaceholdersSize(inputsElements);