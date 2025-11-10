from flask import Flask, request, jsonify
import re

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


@app.route('/registerUser', methods=['POST'])
def registerUser():
    data = request.get_json(silent=True) or {}
    firstname = data.get('firstName')
    username = data.get('username')
    email = data.get('email')

    # check required fields
    missing = [name for name, val in (('firstName', firstname), ('username', username), ('email', email)) if not val]
    if missing:
        return jsonify({'error': 'Missing required fields', 'missing': missing}), 400

    try:

        return jsonify({
            'message': f'User {username} ({firstname}) registered successfully!',
            'email': email
        }), 201
    except Exception as e:
        return jsonify({'error': 'Registration failed'}), 500


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