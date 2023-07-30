import sys

import json

from transformers import AutoTokenizer
from transformers import AutoModelForSequenceClassification
from scipy.special import softmax

MODEL = f"cardiffnlp/twitter-roberta-base-sentiment"
tokenizer = AutoTokenizer.from_pretrained(MODEL)
model = AutoModelForSequenceClassification.from_pretrained(MODEL)

data = sys.stdin.readline().strip()

tweetsData = json.loads(data)
print(tweetsData[0]['tweet'])

# try:
#     data = ast.literal_eval(data)
#     print(data[0]['tweet'])
# except ValueError:
#     print("Invalid input. The string is not a valid list representation.")

for tweet in tweetsData:
    currTweet = tweet['tweet']
    encoded_text  =tokenizer(currTweet,return_tensors='pt')
    output = model(**encoded_text)
    scores = output[0][0].detach().numpy()
    scores = softmax(scores)
    scores_dict = {
        'Negative' : scores[0],
        'Neutral'  : scores[1],
        'Positive' : scores[2],
    }
    print(scores_dict)
