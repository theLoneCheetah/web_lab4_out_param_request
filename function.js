export async function handler(event, context) {
    // Извлекаем параметр N из пути
    const n = event.pathParams?.N;

    if (!n) {
        return {
            statusCode: 400,
            body: 'Missing parameter N',
        };
    }

    // URL для запроса с подстановкой параметра
    const url = `https://nd.kodaktor.ru/users/${n}`;

    try {
        // Используем fetch, он не добавляет Content-Type для GET-запросов без тела
        const response = await fetch(url, { method: 'GET', });

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: `External API error: ${response.status}`,
            };
        }

        // Парсинг и извлечение login
        const data = await response.json();
        const login = data.login;

        return {
            statusCode: 200,
            body: login,
            headers: { 'Content-Type': 'text/plain' },
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: `Request failed: ${err.message}`,
        };
    }
}