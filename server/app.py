from flask import Flask, request, jsonify
from database import create_tables, get_connection

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
    data = request.get_json()
    message = data.get('message')
    return jsonify({
        'received': message,
        'response': 'Flask received your message!'
    })

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
    
if __name__ == '__main__':
    app.run(debug=True, port=5000)