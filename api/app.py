from flask import Flask, jsonify, render_template
from artistas import reggetoneros

app = Flask(__name__, static_url_path='/static')

@app.route("/")
def goHome():
    return render_template("index.html")

@app.route('/artistas', methods=["GET"])
def getArtistas(): 
    return jsonify(reggetoneros)

@app.route('/artistas/<string:artista>', methods=["GET"])
def getArtista(artista): 
    regFound = {}
    for regg in reggetoneros: 
        if artista == regg['name']:
            regFound = regg
    return jsonify(regFound)


if __name__ == "__main__":
    app.run(debug=True, port=8080)
