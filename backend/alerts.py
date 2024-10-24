
from telegram import Bot
from config import TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID

bot = Bot(token=TELEGRAM_BOT_TOKEN)

def send_alert(message):
    bot.send_message(chat_id=TELEGRAM_CHAT_ID, text=message)

def alert_on_failure():
    send_alert("Critical failure in SMS system detected!")

def alert_on_success_rate_drop(country_operator, success_rate):
    send_alert(f"Low success rate for {country_operator}: {success_rate}%")
