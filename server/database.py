import sqlite3

# defining connection and cursor to connect to a database
def create_tables():
    connection = sqlite3.connect('food_freshness_tracker.db')
    cursor = connection.cursor()

    # create users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL, 
        password TEXT NOT NULL,
        current_streak INTEGER DEFAULT 0
    );
    ''')

    # create items table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS items ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        user_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        quantity INTEGER, 
        date_purchased TEXT,
        expiration_date TEXT,
        category TEXT,
        brand TEXT
    );
    ''')

    # save changes and close the connection
    connection.commit()
    connection.close()

# function for database connection
def get_connection():
    connect = sqlite3.connect('food_freshness_tracker.db')
    connect.row_factory = sqlite3.Row
    return connect
