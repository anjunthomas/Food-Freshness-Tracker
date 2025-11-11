from flask import Flask, request, jsonify
import sqlite3
import re

app = Flask(__name__)

DATABASE = 'food_freshness_tracker.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def hello():
    return "Hello World, this is the food freshness tracker made by Cheryl, Harshika, Thaira, Danae, and Tasneem!"

@app.route('/cheryl')
def helloCheryl():
    return "Hello from Cheryl!"


@app.route('/harshika')
def helloHarshika():
    return "Hello from Harshika!"

connection = sqlite3.connect('food_freshness_tracker.db')
cursor = connection.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS users ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL,
    current_streak INTEGER DEFAULT 0
    );
''')

# save changes and close the connection
connection.commit()
connection.close()

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