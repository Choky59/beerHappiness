from flask import Flask, jsonify
from artistas import reggetoneros

app = Flask(__name__)

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
