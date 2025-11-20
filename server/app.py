from flask import Flask, request, jsonify
from database import create_tables, get_connection
import sqlite3
from datetime import datetime

create_tables()

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

#this is how a basic POST request would be defined
@app.route('/api/test', methods=['POST'])
def test():
    data = request.get_json()
    message = data.get('message')
    return jsonify({
        'received': message,
        'response': 'Flask received your message!'
    })

@app.route('/registerUser', methods=['POST'])
def registerUser():
    data = request.get_json(silent=True) or {}
    firstname = data.get('firstName')
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # check required fields
    missing = [name for name, val in (('firstName', firstname), ('username', username), ('email', email), ('password', password)) if not val]
    if missing:
        return jsonify({'error': 'Missing required fields', 'missing': missing}), 400

    try:
        connect = get_connection()
        cursor = connect.cursor()
        cursor.execute('''
                INSERT INTO users(name, email, password)
                VALUES (?, ?, ?)
        ''', (firstname, email, password))
        connect.commit()
        connect.close()

        return jsonify({
            'message': f'User {username} ({firstname}) registered successfully!',
            'email': email
        }), 201
    except sqlite3.IntegrityError: # this is to handle duplicate emails
        return jsonify({'error': 'Email already exists'}), 409
    except Exception as e:
        return jsonify({'error': 'Registration failed', 'details': str(e)}), 500


#backend developers, create a new route here with your name that returns a similar message
# Ex route. '/anju' 
# push to your branch to verify flask is working

# login route
@app.route('/api/login', methods=['POST'])
def login():
    # get the request
    data = request.get_json()
    # accept an email and password
    email = data.get('email')
    password = data.get('password')

    # connect to the database
    connect = get_connection()
    cursor = connect.cursor()

    # check if the user exists in the database
    cursor.execute('SELECT id, name, email, password FROM users WHERE email = ?', (email,))
    user = cursor.fetchone()

    connect.close() # needing to close this

    # if not found, return HTTP 401
    # check user
    if user is None: 
        return jsonify({'error': 'Invalid email or password'}), 401
    # check that password matches user
    if password != user["password"]:
        return jsonify({'error': 'Invalid email or password'}), 401
    
    # if found, return HTTP 200 & the user info: the id, name, and email
    user_info = {
        'id': user["id"],
        'name': user["name"],
        'email': user["email"]
    }
    return jsonify(user_info), 200

@app.route('/api/add-item', methods=['POST'])
def addItem():
    data = request.get_json(silent=True) or {}
    user_id = data.get('user_id')
    name = data.get('name')
    quantity = data.get('quantity')
    date_purchased = data.get('date_purchased')
    expiration_date = data.get('expiration_date')
    category = data.get('category')
    brand = data.get('brand')
    missing = [
        field_name for field_name, val in (
                ('user_id', user_id), 
                ('name', name), 
                ('quantity', quantity), 
                ('expiration_date', expiration_date),
                ('category', category),
                # didn't add brand and date_purchased here because we're making those optional
            ) if not val
        ]
    if missing:
        return jsonify({'error': 'Missing required fields', 'missing': missing}), 400
    
    try:
        if date_purchased:
            datetime.fromisoformat(date_purchased)
        if expiration_date:
            datetime.fromisoformat(expiration_date)
    except ValueError:
        return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400

    try:    
        connect = get_connection()
        cursor = connect.cursor()
        cursor.execute('''
                INSERT INTO items(user_id, name, quantity, date_purchased, expiration_date, category, brand)
                VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (user_id, name, quantity, date_purchased, expiration_date, category, brand))
        connect.commit()
        connect.close()

        return jsonify({
            'message': f'{name} added successfully'
            }), 201

    except Exception as e:
        return jsonify({'error': 'adding item failed', 'details': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True, port=5000)