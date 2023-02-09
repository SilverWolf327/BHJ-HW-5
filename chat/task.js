const chatWidget = document.body.querySelector('.chat-widget');
const chatWidgetInput = document.getElementById('chat-widget__input');
const chatWidgetMessages = document.getElementById('chat-widget__messages');
const messagesContainer = document.body.querySelector('.chat-widget__messages-container');

let lastTransmitMessageTime;

function getBotPhrase() {
    const phrasesArray = [
        'Фраза1',
        'Фраза2',
        'Фраза3',
        'Фраза4',
        'Фраза5'
    ];
    let index = Math.floor(Math.random() * phrasesArray.length);

    return phrasesArray[index];
};

function messageAdd(chatValue) {
    chatWidgetMessages.insertAdjacentHTML('beforeend', `
        <div class="message">
            <div class="message__time"></div>
            <div class="message__text"></div>
        </div>`);
        
        let messageText = chatWidgetMessages.querySelectorAll('.message__text');
        messageText[messageText.length - 1].innerHTML = chatValue;

        let messageTime = chatWidgetMessages.querySelectorAll('.message__time');
        messageTime[messageTime.length - 1].innerHTML = new Date().toLocaleString();
        lastTransmitMessageTime = Date.now();
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        setTimeout(activityCheck, 30000);
        
};


function activityCheck() {

    if ((chatWidget.classList.contains('chat-widget_active')) && 
        ((Date.now() - lastTransmitMessageTime) >= 30000)) {
        
           messageAdd("Чем могу Вам помочь?");
    };
};



chatWidget.addEventListener('click', () => {
    chatWidget.classList.add('chat-widget_active');

    if(chatWidgetMessages.querySelectorAll('.message').length === 0) {
        messageAdd("Добрый день!");
    };
});  

chatWidgetInput.onchange = () => {

    messageAdd(chatWidgetInput.value);

    chatWidget.querySelectorAll('.message')[
        chatWidget.querySelectorAll('.message').length - 1]
        .classList.add('message_client');
    
    chatWidgetInput.value = "";

    messageAdd(getBotPhrase());
};