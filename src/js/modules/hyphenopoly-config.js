// Конфигурация Hyphenopoly для разбиения слов на слоги
export function initHyphenopoly() {
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
            "patterndir": "../js/libs/hyphenopoly/patterns/", //path to the directory of pattern files
            "maindir": "../js/libs/hyphenopoly/" //path to the directory where the other ressources are stored
        }
    });
} 