// Импорт модулей
import { swiperConfig } from './modules/swiper-config.js';
import { initSwiperHandlers } from './modules/swiper-handlers.js';
import { initDetailsHandler } from './modules/details-handler.js';
import { initHyphenopoly } from './modules/hyphenopoly-config.js';
import { PlaceholderHandler } from './modules/placeholder-handler.js';

// Инициализация Swiper
const swiper = new Swiper('.swiper', swiperConfig);

// Инициализация обработчиков
initSwiperHandlers(swiper);
initDetailsHandler();
initHyphenopoly();

// Инициализация обработчика placeholder'ов
new PlaceholderHandler();