// Обработчик placeholder'ов с бегущей строкой
export class PlaceholderHandler {
    constructor() {
        this.inputsElements = document.querySelectorAll('input[type="text"]');
        this.intervalIds = {};
        this.originalPlaceholdersText = {};
        
        this.init();
    }

    // Функция для определения ширины текста
    getTextWidth(text, font) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.width;
    }

    // Функция проверки размеров placeholder'ов
    checkPlaceholdersSize() {
        // Перебор объекта и очистка 
        // всех запущенных интервалов
        for (let id in this.intervalIds) {
            console.log(id);
            clearInterval(this.intervalIds[id]);
        }

        // Очистка объекта
        this.intervalIds = {};

        this.inputsElements.forEach(input => {
            // Получаем изначальный текст placeholder'а
            const originalPlaceholderText = input.getAttribute('placeholder');
            // Получаем уникальный идентификатор input (например, id)
            const inputId = input.id;

            // Если для данного inputId еще не сохранено изначальное 
            // значение placeholder'а, сохраняем
            if (!this.originalPlaceholdersText[inputId]) {
                this.originalPlaceholdersText[inputId] = originalPlaceholderText;
            }

            // Получаем ширину input и ширину текста placeholder'а
            const inputWidth = input.clientWidth;
            const textWidth = this.getTextWidth(originalPlaceholderText, getComputedStyle(input).font);

            // Если текст placeholder'а шире, чем сам input 
            // и интервал еще не создан
            if (textWidth > inputWidth && !this.intervalIds[input]) {
                // Создаем интервал для бегущей строки в placeholder'е
                this.intervalIds[inputId] = setInterval(() => {
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
                input.setAttribute('placeholder', this.originalPlaceholdersText[inputId]);
            }
        });
    }

    init() {
        // Подключаем вышеописанную функцию к событию
        // изменения размеров окна
        window.addEventListener('resize', () => {
            this.checkPlaceholdersSize();
        });

        // Изначальный запуск
        this.checkPlaceholdersSize();
    }
} 