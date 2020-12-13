from flask import Flask, render_template, request, url_for, jsonify
from pprint import pprint
from article_sum import *
from urllib.parse import unquote
app = Flask(__name__)

@app.route('/')
def homepage():
    return render_template('index.html')

@app.route('/summarize-text',methods=['POST'])
def getInputText():
    result = ''
    if request.method == 'POST':
        data = request.form.get('inputText')
        result = run_summarization(data)
        return jsonify({'status':'success','result':result})

@app.route('/text-to-speech',methods=['POST'])
def getAudio():
    if request.method == 'POST':
        data = request.get_json()
        text_to_speech(data['text'])
        return jsonify({'status':'success','path':'static/audio.mp3'})


if __name__=='__main__':
    from os import path, walk

    extra_dirs = ['templates','static/js','static/css']
    extra_files = extra_dirs[:]
    for extra_dir in extra_dirs:
        for dirname, dirs, files in walk(extra_dir):
            for filename in files:
                filename = path.join(dirname, filename)
                if path.isfile(filename):
                    extra_files.append(filename)
    app.run(debug=True,extra_files=extra_files)