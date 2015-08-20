var ListController = {
    /* Найти и вернуть 1 элемент из списка по указанному полю
     * @list исходный список
     * @itemId значение для поиска элемента
     * @fieldName название свойства, по которому ведется поиск (по умолчанию id)
     * @inverseSelection применить в поиске исключение (все элементы, кроме...)
     * @getAllMatches вернуть не 1, а все совпавшие элементы
     */
    getItemById: function (list, itemId, fieldName, inverseSelection, getAllMatches) {
        // Искомое поле
        if (fieldName === undefined)
            fieldName = 'id';

        // Флаг исключение (по умолчанию совпадение)
        if (inverseSelection === undefined)
            inverseSelection = false;

        // Флаг выдать все совпадения
        if (getAllMatches === undefined)
            getAllMatches = false;

        // Если установлен флаг выдачи всех совпадений
        // то на выходе получаем массив, а не null
        var Result = !getAllMatches ? null : [];

        if (list && list.length) {

            var items = [];

            list.every(function (el) {

                var Found = false;

                // Если ищем нули, то приводим тип точно
                if (itemId === null || itemId === undefined) {
                    if (inverseSelection)
                        Found = (el[fieldName] !== itemId);
                    else
                        Found = (el[fieldName] === itemId);
                }

                // Если ищем значения, то не точно, т.к. могут быть и строки и числа
                else {
                    if (inverseSelection)
                        Found = (el[fieldName] != itemId);
                    else
                        Found = (el[fieldName] == itemId);
                }

                if (!!Found) {
                    items.push(el);

                    // Если искалось единственное значение 
                    // и мы его нашли - дальше перебирать не имеет смысла
                    if (!getAllMatches) {
                        return false;
                    }
                }
                // цикл продолжается
                return true;
            });

            if (!!items.length) {
                if (!getAllMatches)
                    return items[0];
                else
                    return items;
            }
        }
        return Result;
    },
    /*
     * удалить элемент из списка, где равны значения указанного поля
     * @list исходный список
     * @item элемент для удаления
     * @fieldName поле, по которому ищется совпадение
     */
    deleteItem: function (list, item, fieldName) {

        fieldName = fieldName === undefined ? 'id' : fieldName;

        var itemsById = list.filter(function (el) {
            return el[fieldName] === item[fieldName]
        });

        if (itemsById.length) {
            list.splice(list.indexOf(itemsById[0]), 1);
        }
    },
    /*
     * удалить элемент из списка, где равны значения указанного поля
     * @list исходный список
     * @item элемент для удаления
     * @fieldName поле, по которому ищется совпадение
     */
    deleteItemId: function (list, itemId, fieldName) {

        fieldName = fieldName === undefined ? 'id' : fieldName;

        var itemsById = list.filter(function (el) {
            return el[fieldName] === itemId
        });

        if (itemsById.length) {
            list.splice(list.indexOf(itemsById[0]), 1);
        }
    },
    /*
     * Сдвинуть элемент массива с полем сортировки
     * @list исходный список
     * @item элемент, который двигаем
     * @stepBy направление движения: -1 вверх, +1 вниз
     * @sortField название поля сортировки (индекс сортировки списка)
     */
    moveItem: function (list, item, stepBy, sortField) {


        if (!!item && !!list) {

            // Перед сортировкой проведем нормализацию индексов
            // Операция безопасная, т.к. у нас относительное смещение            
            this.normalize(list, sortField);

            // Сортировка происходит следующим образом:
            // 1. Сначала нумеруются все элементы массива
            // 2. Потом устанавливается приращение индекса
            // 3. Элементы нумеруются заново                                        
            var curIndex = 1 * item[sortField];
            var newIndex = 1 * item[sortField] + 1 * stepBy;
            var topLimit = (curIndex === 0 && newIndex < 0);
            var bottomLimit = ((curIndex >= list.length) && (newIndex > curIndex));
            // Верхний предел Нижний предел
            if (topLimit || bottomLimit) {
                // ничего не делаем
            }
            // индекс где то по середине - переставляем на новое положение
            else {
                list.forEach(function (el, ix, ar) {
                    var elIndex = 1 * el[sortField];
                    if (elIndex == newIndex)
                        el[sortField] = curIndex;
                    else if (elIndex == curIndex)
                        el[sortField] = newIndex;
                });

                // Элемент успешно перемещен
                return true;
            }
        }

        return false

    },
    /*
     * Сдвинуть элемент массива на указанный индекс с полем сортировки
     * @list исходный список
     * @item элемент, который двигаем
     * @index индекс нового положения элемента
     * @sortField название поля сортировки (индекс сортировки списка)
     */
    moveItemTo: function (list, item, index, sortField) {

        if (!!item && !!list && list.length) {


            // Перед сортировкой проведем нормализацию индексов
            // Операция безопасная, т.к. у нас относительное смещение            
            this.normalize(list, sortField);

            // А где сейчас этот элемент?
            var curIndex = item[sortField];

            // Опредедим направление движение относительно нашего элемента
            var stepCount = 1 * curIndex - 1 * index;
            var stepBy = stepCount > 0 ? -1 : (stepCount < 0 ? 1 : 0);

            for (stepCount = Math.abs(stepCount); stepCount > 0; stepCount--) {
                this.moveItem(list, item, stepBy, sortField);
            }
        }

        return false

    },
    /* 
     * Нормализация списка
     */
    normalize: function (list, sortField) {
        if (!!list && !!list.length && !!sortField) {
            // Для этого сначала отсортируем массив по текущим значениям индекса
            list.sort(function (a, b) {
                return 1 * a[sortField] - 1 * b[sortField];
            });
            // Затем пронумеруем заново
            list.forEach(function (el, ix) {
                el[sortField] = 1+ix;
            });
        }
    },
    
    // Удалить поля из элементов массива
    // Список полей передается также в виде массива
    removeFields: function(list, fields) {
        
        if (!!list && !!fields && list.length && fields.length) {
            list.forEach(function(item) {
                fields.forEach(function(field){
                    if (!!item[field])
                        delete item[field];
                });
            });
        }
        
    }
    
};

