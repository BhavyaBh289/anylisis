import sys

import json
from langdetect import detect

import  telebot
import requests
import time
bot = telebot.TeleBot("6644142336:AAGBSOTc0nePR7vCGgAi3yY2Y0y8PmGL8bc")
group = "-830125467"

from transformers import AutoTokenizer
from transformers import AutoModelForSequenceClassification
from scipy.special import softmax

MODEL = f"cardiffnlp/twitter-roberta-base-sentiment"
tokenizer = AutoTokenizer.from_pretrained(MODEL)
model = AutoModelForSequenceClassification.from_pretrained(MODEL)

data = sys.stdin.readline().strip()

tweetsData = json.loads(data)
# print(tweetsData[0]['tweet'])

# try:
#     data = ast.literal_eval(data)
#     print(data[0]['tweet'])
# except ValueError:
#     print("Invalid input. The string is not a valid list representation.")

def check_language(text):
    try:
        language = detect(text)
        return language
    except Exception as e:
        # If the language cannot be detected or there's an error, return None
        return None

for tweet in tweetsData:
    currTweet = tweet['tweet']
    if check_language(currTweet) == "en" :
        encoded_text  =tokenizer(currTweet,return_tensors='pt')
        output = model(**encoded_text)
        scores = output[0][0].detach().numpy()
        scores = softmax(scores)
        scores_dict = {
            'Negative' : scores[0],
            'Neutral'  : scores[1],
            'Positive' : scores[2],
        }
        print(tweet['username'],"_______",tweet["date"],"----",tweet["time"])
        print("Tweet ______ ",tweet['tweet'])
        accuracy = scores_dict['Negative']*100
        print("Harsh (1 to 100) % ==> ","{:.2f}".format(accuracy))
        print("\n")
        bot.send_message(group,f"{tweet['username']} messaged {tweet['tweet']} with harshness of {'{:.2f}'.format(accuracy)} ")
        
     
