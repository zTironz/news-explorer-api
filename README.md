# news-explorer-api

Бекенд дипломной работы 

публичный ip: http://84.201.162.249 <br/>
backend: https://api.ztironz.tk <br/>
<br/> 
<br/>
запрос GET /users/me возвращает конкретного пользователя;<br/>
запрос POST /signup  создаёт пользователя;<br/>
{
    "name" : "Oleg",
    "email": "xtironx@yandex.ru",
    "password": "Test12345"
}<br>
запрос POST /signin  авторизирует пользователя;<br/>
запрос GET /articles возвращает статьи пользователя;<br/>
запрос POST /articles создаёт статью;<br/>
{
"keyword": "новости",
"title": "брбрбр",
"text": "Описание статьи",
"date": "вчера 2020",
"source": "Вася",
"link": "https://fdgfdgdfg.ru",
"image": "https://fdgfdgdfg.ru/text.jpg"
}<br>
запрос DELETE /articles/articleId удаляет статью пользователя;<br/>
<br/>
npm i устанавливаем модули<br/>
npm start  запускаем проект<br/>
