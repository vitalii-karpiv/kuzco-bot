const TelegramBot = require('node-telegram-bot-api');

const token = '';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;

    const replyKeyboard = {
        reply_markup: {
            keyboard: [
                ['Каталог'],
                ['Про нас', 'Наявність'],
                ["Зʼязатись з менеджером"]
            ],
            resize_keyboard: true,
            is_persistent: true
        }
    };

    await bot.sendMessage(chatId, 'Welcome! Choose an option:', replyKeyboard);
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Respond to the specific buttons
    if (text === 'Про нас') {
        bot.sendMessage(chatId, 'Про нас', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Зробити замовлення", callback_data: 'order' }]
                ]
            }
        });
    }
});

bot.on('callback_query', (callbackQuery) => {
    const message = callbackQuery.message;
    const data = callbackQuery.data;

    if (data === 'order') {
        bot.sendMessage(message.chat.id, 'You selected "Зробити замовлення".');
    }

    // Acknowledge the callback to remove the loading state in the Telegram UI
    bot.answerCallbackQuery(callbackQuery.id);
});