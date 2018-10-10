

var token = require('./key');

var TelegramBot = require('node-telegram-bot-api');
const Converter = require("./api/api"); 
// your token .
const token = token.key;


var bot = new TelegramBot(token, {polling: true});

// /convert USD UAH 2000
bot.onText(/\/convert (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    const chatId = msg.chat.id;
    const valute = match[1].split(' ');
    const amount = valute[2];  
    // send back the matched "whatever" to the chat
        
        var rates = Converter.getRate(valute[0], valute[1]);
        rates.then(res => {
            let newAmount = Object.values(res.data)[0] * amount;
            newAmount = newAmount.toFixed(3).toString();  
            bot.sendMessage(chatId, "Value = " +newAmount);    
        });
  });


  //test
bot.onText(/^\/place_order/, function (msg, match) {
    var option = {
        "parse_mode": "Markdown",
        "reply_markup": {
            "one_time_keyboard": true,
            "keyboard": [[{
                text: "My phone number",
                request_contact: true
            }], ["Cancel"]]
        }
    };
    bot.sendMessage(msg.chat.id, "How can we contact you?", option).then(() => {
        bot.once("contact",(msg)=>{
            var option = {
                "parse_mode": "Markdown",
                "reply_markup": {
                    "one_time_keyboard": true,
                    "keyboard": [[{
                        text: "My location",
                        request_location: true
                    }], ["Cancel"]]
                }
            };
            bot.sendMessage(msg.chat.id,
                            util.format('Thank you %s with phone %s! And where are you?', msg.contact.first_name, msg.contact.phone_number),
                            option)
            .then(() => {
                bot.once("location",(msg)=>{
                    bot.sendMessage(msg.chat.id, "We will deliver your order to " + [msg.location.longitude,msg.location.latitude].join(";"));
                })
            })
        })
    })

});
