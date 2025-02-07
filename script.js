"use strict";

/**
 * ajaxRequest PROMISE
 * 
 * PARAMS
 * url {string} - адрес куда отправляем запрос
 * method {string} - тип запроса: get|post
 * data {object} - тело запроса, параметры, данные для типа запроса post
 * formId {string|int} - Идентификатор формы для дальнейшей обработки в событиях
 * isJson {bool} - преобразовать ответ в JSON, если false то в text()
 * headers {object} - Заголовки
 * 
*/
async function ajaxRequest(
    url,
    method = 'POST',
    data = {},
    formId = 'custom',
    isJson = true,
    headers = {}
) {
    try {
        if (!url) {
            throw new SyntaxError('URL is empty');
        }

        // Настройка заголовков
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };
        const requestHeaders = { ...defaultHeaders, ...headers };

        // Настройка параметров запроса
        const requestOptions = {
            method: method.toUpperCase(),
            headers: requestHeaders,
        };

        // Добавляем тело запроса для POST, PUT, PATCH
        if (['POST', 'PUT', 'PATCH'].includes(requestOptions.method)) {
            requestOptions.body = JSON.stringify(data);
        }

        // Добавление get полей
        if (['GET'].includes(requestOptions.method)) {
            if (url.indexOf('?') !== -1) {
                url += '&';
            } else {
                url += '?';
            }

            url += Object.keys(data)
                    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                    .join('&');
        }

        // Событие перед запросом
        window.dispatchEvent(
            new CustomEvent('ajaxRequestBefore', {
                detail: { form: formId },
            })
        );

        // Выполнение запроса
        const response = await fetch(url, requestOptions);

        // Проверка на успешный ответ
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        // Обработка ответа
        const result = await (isJson ? response.json() : response.text());

        // Событие успешного завершения
        window.dispatchEvent(
            new CustomEvent('ajaxRequestSuccess', {
                detail: { data: result, form: formId },
            })
        );

        return result; // Возвращаем результат для дальнейшего использования
    } catch (error) {
        // Событие ошибки
        window.dispatchEvent(
            new CustomEvent('ajaxRequestError', {
                detail: { error, form: formId },
            })
        );

        console.error('AJAX Request Error:', error);
        throw error; // Пробрасываем ошибку для дальнейшей обработки
    } finally {
        // Событие после завершения запроса
        window.dispatchEvent(
            new CustomEvent('ajaxRequestAfter', {
                detail: { form: formId },
            })
        );
    }
}