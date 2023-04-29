from flask import Flask, request, jsonify, render_template
from dictionary import Dictionary

app = Flask(__name__)
dictionary = Dictionary()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/v1/words', methods=['GET', 'POST', 'DELETE'])
def words():
    if request.method == 'GET':
        words = dictionary.get_words()
        return jsonify(words)

    if request.method == 'POST':
        word = request.form['word']
        meaning = request.form['meaning']
        dictionary.add_word(word, meaning)
        return '', 204

    if request.method == 'DELETE':
        word = request.form['word']
        dictionary.remove_word(word)
        return '', 204

@app.route('/api/v1/words/<string:word>', methods=['GET', 'PUT'])
def word(word):
    if request.method == 'GET':
        meaning = dictionary.get_meaning(word)
        return jsonify({'meaning': meaning})

    if request.method == 'PUT':
        new_meaning = request.form['meaning']
        dictionary.edit_word(word, new_meaning)
        return '', 204


@app.route('/api/v1/words/<string:word>', methods=['DELETE'])
def delete_word(word):
    dictionary.remove_word(word)
    return jsonify({"status": "success", "message": f"Palabra '{word}' eliminada"})

if __name__ == '__main__':
    app.run(debug=True)
