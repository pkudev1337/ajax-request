Ajax Request
=

This feature is for flexible use in vanilla javascript.

**ajaxRequest** - promise

```js
async function ajaxRequest(
    url,
    method = 'POST',
    data = {},
    formId = 'custom',
    isJson = true,
    headers = {}
)
```

Events
-
**события для отслеживания состояния запроса:**

- ajaxRequestBefore — перед началом запроса.
- ajaxRequestSuccess — при успешном завершении.
- ajaxRequestError — при возникновении ошибки.
- ajaxRequestAfter — после завершения запроса (всегда вызывается).

Example
-

**HTML element**

```html
<button type="button" class="btn">
    click me
</button>

<script src="script.js"></script>

<script>
    // Create listener for custom event
    window.addEventListener('ajaxRequestSuccess', (e) => {
        console.log('ajaxRequestSuccess');
        console.log(e.detail.data, 'Form ID:' + e.detail.form);
    });

    document.querySelector('.btn').addEventListener('click', function () {
        ajaxRequest(
            'http://localhost/testfetch.php', 
            'post', 
            {
                param1: 'param1value'
            },
            'callback'
        );
    });
</script>
```

Usage
-

```js
// Пример GET-запроса
ajaxRequest('https://api.example.com/data', 'GET')
    .then(data => console.log('Data received:', data))
    .catch(error => console.error('Error:', error));

// Пример POST-запроса
ajaxRequest('https://api.example.com/submit', 'POST', { name: 'John', age: 30 })
    .then(response => console.log('Response:', response))
    .catch(error => console.error('Error:', error));

// Пример с кастомными заголовками
ajaxRequest('https://api.example.com/auth', 'POST', { token: '12345' }, 'authForm', true, {
    'Authorization': 'Bearer 12345',
});
```

Usage events
-

```js
window.addEventListener('ajaxRequestError', (e) => {
    console.log('ajaxRequestError');
    console.log(e.detail.error.message, 'Form ID:' + e.detail.form);
});

window.addEventListener('ajaxRequestSuccess', (e) => {
    console.log('ajaxRequestSuccess');
    console.log(e.detail.data, 'Form ID:' + e.detail.form);
});

window.addEventListener('ajaxRequestBefore', (e) => {
    console.log('ajaxRequestBefore');
    console.log('Form ID:' + e.detail.form);
});

window.addEventListener('ajaxRequestAfter', (e) => {
    console.log('ajaxRequestAfter');
    console.log('Form ID:' + e.detail.form);

    if (e.detail.form === 'myform123') {
        //alert('myform123');
    }
});
```

