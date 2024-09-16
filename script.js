const asdf = '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';

document.getElementById('user-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Получение значения поля
    const userAnswer = document.getElementById('userAnswer').value;

    // Очистка старых сообщений
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';

    // Отображение лоадера
    document.getElementById('loader').style.display = 'block';

    try {
        // Создание запроса к API OpenAI
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${asdf}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                prompt: `
                The question was: "Allergies (In English)".
                Instructions: "Впишите, пожалуйста, сюда те продукты, которые необходимо исключить из меню. Список аллергий требует повар, SO PLEASE WRITE IN ENGLISH. Если аллергий нет, запишите 'нет'".
                The user's answer is: "${userAnswer}".
                Please check if the answer is written in English and follows the instructions. If everything is correct, return "ok". If there is an error, return the error message in both Russian and English for displaying to the user.
                `,
                max_tokens: 300,
                temperature: 0.5
            })
        });

        const data = await response.json();

        // Скрытие лоадера
        document.getElementById('loader').style.display = 'none';

        // Проверка ответа и отображение сообщений
        if (data.choices[0].text.trim() === 'ok') {
            document.getElementById('successMessage').style.display = 'block';
        } else {
            document.getElementById('errorMessage').innerText = `Ошибка: ${data.choices[0].text.trim()}`;
            document.getElementById('errorMessage').style.display = 'block';
        }

    } catch (error) {
        // Обработка ошибок
        document.getElementById('loader').style.display = 'none';
        document.getElementById('errorMessage').innerText = 'Ошибка: проблема с запросом';
        document.getElementById('errorMessage').style.display = 'block';
    }
});
