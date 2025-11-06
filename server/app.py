from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello World, this is the food freshness tracker made by Cheryl, Harshika, Thaira, Danae, and Tasneem!"

@app.route('/cheryl')
def helloCheryl():
    return "Hello from Cheryl!"


@app.route('/harshika')
def helloHarshika():
    return "Hello from Harshika!"


#backend developers, create a new route here with your name that returns a similar message
# Ex route. '/anju' 
# push to your branch to verify flask is working

#this is how a basic POST request would be defined
@app.route('/api/test', methods=['POST'])
def test():
    data = request.json
    message = data.get('message')
    return jsonify({
        'received': message,
        'response': 'Flask received your message!'
    })
if __name__ == '__main__':
    app.run(debug=True, port=5000)