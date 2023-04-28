document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.professions__cards');
    const elements = document.querySelectorAll('.professions__card');

    const windowWidth = window.innerWidth;
    const screenCenter = windowWidth / 2;

    elements.forEach(element => {
        element.addEventListener('mouseover', () => {
            // console.log("*** Стартуем ***");
            // console.log("Имя элемента: ", element.querySelector('.professions__name').innerHTML);

            // получаем анимацию элемента
            const animation = element.getAnimations()[0];
            // console.log(animation);

            // берем все кадры анимации
            const keyframes = animation.effect.getKeyframes();

            // получаем координа координату центра элемента по оси x
            const rect = element.getBoundingClientRect();
            const elementCenter = (rect.left + rect.right) / 2 + window.scrollX;

            // console.log('elementCenter:', elementCenter, 'screenCenter: ', screenCenter);

            if (elementCenter < screenCenter) {
                elements.forEach(element => {
                    const animation = element.getAnimations()[0];
                    animation.playbackRate = -1;
                });
            }

            // console.log("Время старта: ", animation.startTime);

            // проверяем, что анимация запущена
            if (animation.startTime !== null) {
                // получаем текущие вычисленные значения таймингов анимации          
                const computedTiming = animation.effect.getComputedTiming();
                // получаем время анимации
                const duration = computedTiming.duration;
                // получаем текущую итерацию (повтор)
                const currentIteration = computedTiming.currentIteration;
                // вычисляем сколько времени прошло с момента старта итерации
                const currentTime = computedTiming.localTime - duration * currentIteration;

                // объявляем переменную для времени ближайшего кадра от начала отсчёта  
                let closestOffset = 0;
                // и переменную для разницы с настоящим (текущим) временем
                let closestDistance = Infinity;

                // переменная для времени ожидания
                let waitingTime = 0;

                // перебираем все кадры анимации
                for (let i = 0; i < keyframes.length; i++) {
                    // получаем время до текущего кадра
                    const offset = keyframes[i].offset * duration;
                    // получаем разницу между текущим временем анимации и временем кадра
                    const distance = Math.abs(currentTime - offset);

                    // console.log("до кадра", keyframes[i].offset, "distance = ", distance);

                    if (animation.playbackRate === 1) {
                        // проверяем, 
                        // что разница во времени с данным кадром меньше предыдущего сохраненного значения,
                        // а также, что время до кадра больше или равно времени со старта
                        if (distance < closestDistance && offset >= currentTime) {
                            // сохраняем время ожидания до ближайшего кадра
                            // время до текущего кадра - время с момента старта итерации
                            closestDistance = offset - currentTime;
                            // и время до ближайшего кадра со старта
                            closestOffset = offset;
                            // сохраняем время ожидания
                            // время до ближайшего кадра со старта - времяс момента старта итерации
                            waitingTime = closestOffset - currentTime;

                            // console.log(closestOffset, waitingTime);
                        }
                    } else {
                        // проверяем, что 
                        // разница во времени с данным кадром меньше предыдущего сохраненного значения,
                        // а также, что время до кадра меньше или равно времени со старта
                        if (distance < closestDistance && offset <= currentTime) {
                            // сохраняем время ожидания до ближайшего кадра
                            // время с момента старта итерации - время до текущего кадра
                            closestDistance = currentTime - offset;
                            // и время до ближайшего кадра со старта
                            closestOffset = offset;
                            // сохраняем время ожидания
                            waitingTime = currentTime - closestOffset;

                            // console.log(closestDistance, waitingTime);
                        }
                    }
                }
                // console.log("Разница с настоящим (текущим) временем: ", closestDistance);

                elements.forEach(element => {
                    const animation = element.getAnimations()[0];

                    // console.log(closestOffset, currentTime, closestOffset - currentTime);

                    // Дожидаемся ближайшего кадра
                    setTimeout(() => {
                        animation.playbackRate = 1;
                        animation.pause();
                        // увеличиваем немного выделенный элемент
                        container.style.paddingLeft = "5%";
                        element.style.flexBasis = "100%";
                    }, waitingTime);
                });

                // console.log("*** Готово ***");
            }
        });

        element.addEventListener('mouseout', () => {
            elements.forEach(element => {
                const animation = element.getAnimations()[0];
                animation.playbackRate = 1;
                animation.play();
                // уменьшаем обратно выделенный элемент
                container.style.paddingLeft = "10%";
                element.style.flexBasis = "90%";

                // console.log("Добби свободен");
            });
        });
    });
});