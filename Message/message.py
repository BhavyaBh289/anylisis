import  telebot
import requests
import json
import time
with open("token.txt","r") as f:
    for a in f:
        token = a.strip()
with open("group.txt","r") as f:
    for a in f:
        group = a.strip()
bot = telebot.TeleBot(token)
bot.send_message(group,"1")
