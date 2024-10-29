from pymongo import MongoClient
import mysql.connector
from config import MONGO_URI, MYSQL_CONFIG
from werkzeug.security import generate_password_hash

mongo_client = MongoClient(MONGO_URI)
db_mongo = mongo_client.sms_management
country_operator_collection = db_mongo.country_operator_pairs

mysql_conn = mysql.connector.connect(**MYSQL_CONFIG)

mysql_cursor = mysql_conn.cursor()


def initialize_database_and_table(mysql_cursor=mysql_cursor):
    try:
        mysql_cursor.execute("CREATE DATABASE IF NOT EXISTS sms_db")
        
        mysql_cursor.execute("USE sms_db")

        mysql_cursor.execute("""CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE,
        password VARCHAR(255),  -- hashed password
        role ENUM('admin', 'user') NOT NULL
        );""")

        mysql_cursor.execute("SELECT * FROM users ;")
        
        if len(mysql_cursor.fetchall()) == 0:        
            mysql_cursor.execute("INSERT INTO users (username, password, role) VALUES (%s, %s, %s)", ('admin', generate_password_hash('password'), 'admin'))
        
        create_table_query = """
        CREATE TABLE IF NOT EXISTS sms_metrics (
            id INT AUTO_INCREMENT PRIMARY KEY,
            country VARCHAR(50),
            operator VARCHAR(50),    
            sms_sent INT,
            success_rate DECIMAL(5, 2),
            failure_count INT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        """

        mysql_cursor.execute(create_table_query)

        country_operator_pairs = list(country_operator_collection.find())
        for pair in country_operator_pairs:
            if len(get_sms_metrics_by_country(pair['country'], pair['operator'])) > 0:
                continue
            country = pair['country']
            operator = pair['operator']
            priority = pair['priority']
            query = """
                INSERT INTO sms_metrics (country, operator, sms_sent, success_rate, failure_count) 
                VALUES (%s, %s, 0, 0, 0)
            """
            mysql_cursor.execute(query, (country, operator))
        
        mysql_conn.commit()

    except Exception as e:
        print(e)

def store_sms_metrics(country, operator, sms_sent, success_rate, failure_count):

    if len(get_sms_metrics_by_country(country, operator)) > 0:
        query = """
            UPDATE sms_metrics 
            SET sms_sent = %s, success_rate = %s, failure_count = %s
            WHERE country = %s AND operator = %s
        """
        mysql_cursor.execute(query, (sms_sent, success_rate, failure_count, country, operator))
        mysql_conn.commit()

    else:
        query = """
            INSERT INTO sms_metrics (country, operator, sms_sent, success_rate, failure_count) 
            VALUES (%s, %s, %s, %s, %s)
        """
        initialize_database_and_table(mysql_cursor)
        mysql_cursor.execute(query, (country, operator, sms_sent, success_rate, failure_count))
        mysql_conn.commit()

def get_sms_metrics():
    mysql_cursor.execute("USE sms_db")
    mysql_cursor.execute("SELECT * FROM sms_metrics")
    
    columns = [col[0] for col in mysql_cursor.description]
    data = mysql_cursor.fetchall()

    return [dict(zip(columns, row)) for row in data]

def get_sms_metrics_by_country(country , operator):
    mysql_cursor.execute("USE sms_db")
    mysql_cursor.execute("SELECT * FROM sms_metrics WHERE country=%s and operator=%s", (country,operator))
    
    columns = [col[0] for col in mysql_cursor.description]
    data = mysql_cursor.fetchall()

    return [dict(zip(columns, row)) for row in data]


def add_country_operator(data):
    country_operator_collection.insert_one(data)

def get_high_priority_pairs():
    return list(country_operator_collection.find({"priority": "high_priority"}))

#------------------------------------------------

def check_user(username):
    mysql_cursor.execute("USE sms_db")
    mysql_cursor.execute("SELECT password , role FROM users WHERE username=%s ", (username,))
    return mysql_cursor.fetchone()

def add_user_table(username, password, role):
    mysql_cursor.execute("USE sms_db")
    mysql_cursor.execute("INSERT INTO users (username, password, role) VALUES (%s, %s, %s)", (username, generate_password_hash(password), role))
    mysql_conn.commit()

initialize_database_and_table()