import re
import pandas as pd
from newsfetch.news import newspaper
from flask import Flask, request, jsonify
from summarizer import TransformerSummarizer


app = Flask(__name__)
model = TransformerSummarizer(transformer_type="GPT2", transformer_model_key="gpt2")


def get_summaries(df_in):
    """
        Summarise each news article in a dataframe.

        :param df_in: pandas dataframe object containing a list of texts
        :return: a list summaries
    """

    df_in = df_in.fillna('')
    summaries = df_in['text'].apply(lambda x: ''.join(model(x, min_length=60))).to_list()
    return summaries


def _is_valid(url):
    pattern = re.compile(
        r'^(?:http|ftp)s?://'  # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'  # domain...
        r'localhost|'  # localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # ...or ip
        r'(?::\d+)?'  # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    return re.match(pattern, url) is not None


@app.route('/summarise', methods=['POST'])
def summarise():
    """
    API endpoint for summarising web article. Takes the json object from request as input and returns
    a json object containing the input urls, summaries and flags.

    :return: json object containing the input urls, summaries and flags. A text is flagged as 0 if it has been
    summarised successfully, 1 if its url is invalid, 2 if it's not in English and 3 if it is shorter than 80 words.
    """

    if request.method == 'POST':
        data = request.get_json(force=True)
        urls = data['urls']

        flags = [0] * len(urls)
        texts = [None] * len(urls)
        for i in range(len(urls)):
            url = urls[i]

            if not _is_valid(url):
                flags[i] = 1
                continue

            # Scrape main article
            news = newspaper(url)

            # Flag unsupported language
            if news.language != 'en':
                flags[i] = 2

            # Flag articles behind paywall
            elif len(news.article.split()) < 80:
                flags[i] = 3

            else:
                texts[i] = news.headline + '\n\n' + news.article
        df = pd.DataFrame({'text': texts})
        return jsonify({'url': urls, 'summary': get_summaries(df), 'flag': flags})


if __name__ == '__main__':
    app.run()
