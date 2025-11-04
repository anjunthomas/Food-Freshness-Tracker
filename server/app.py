from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello World, this is the food freshness tracker made by Cheryl, Harshika, Thaira, Danae, and Tasneem!"

@app.route('/cheryl')
def helloCheryl():
    return "Hello from Cheryl!"

#backend developers, create a new route here with your name that returns a similar message
# Ex route. '/anju' 
# push to your branch to verify flask is working


if __name__ == '__main__':
    app.run(debug=True)