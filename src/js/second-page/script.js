document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.professions__cards');
    const elements = document.querySelectorAll('.professions__card');

    elements.forEach(element => {
        element.addEventListener('mouseover', () => {
            console.log("*** Стартуем ***");
            console.log("Имя элемента: ", element.querySelector('.professions__name').innerHTML);
            // получаем анимацию элемента
            const animation = element.getAnimations()[0];
            // console.log(animation);
            // берем все кадры анимации
            const keyframes = animation.effect.getKeyframes();

            console.log("Время старта: ", animation.startTime);
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

                // перебираем все кадры анимации
                for (let i = 0; i < keyframes.length; i++) {
                    // получаем время до текущего кадра
                    const offset = keyframes[i].offset * duration;
                    // получаем разницу между текущим временем анимации и временем кадра
                    const distance = Math.abs(currentTime - offset);
                    // проверяем, что разница во времени с данным кадром меньше предыдущего сохраненного значения,
                    // а также больше нуля
                    console.log("до кадра", keyframes[i].offset, "distance = ", distance);
                    if (distance < closestDistance && offset > currentTime) {
                        // сохраняем время ожидания до ближайшего кадра
                        closestDistance = offset - currentTime;
                        // и время до ближайшего кадра со старта
                        closestOffset = offset;
                    }
                }
                console.log("Разница с настоящим (текущим) временем: ", closestDistance);
                
                elements.forEach(element => {
                    const animation = element.getAnimations()[0];
                    // Дожидаемся ближайшего кадра
                    console.log(closestOffset, currentTime, closestOffset - currentTime);
                    setTimeout(() => {
                        animation.pause();
                        // увеличиваем немного выделенный элемент
                        container.style.paddingLeft = "5%";
                        element.style.flexBasis = "100%";
                    }, closestOffset - currentTime);
                });
                
                console.log("*** Готово ***");
            }
        });
        
        element.addEventListener('mouseout', () => {
            elements.forEach(element => {
                const animation = element.getAnimations()[0];
                animation.play();
                // уменьшаем обратно выделенный элемент
                container.style.paddingLeft = "10%";
                element.style.flexBasis = "90%";
                console.log("Добби свободен");
            });
        });
    });
});