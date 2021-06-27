from summarizer import TransformerSummarizer


def summarise(text):
    GPT2_model = TransformerSummarizer(transformer_type="GPT2", transformer_model_key="gpt2")
    summary = ''.join(GPT2_model(text, min_length=60))
    print(summary)


if __name__ == '__main__':
    with open('sample.txt', 'r', encoding='utf8') as file:
        summarise(file.read())
