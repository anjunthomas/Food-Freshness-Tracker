import sqlite3

# defining connection and cursor to connect to a database
connection = sqlite3.connect('food_freshness_tracker.db')
cursor = connection.cursor()

# create users table
cursor.execute('''
    CREATE TABLE users ( 
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

