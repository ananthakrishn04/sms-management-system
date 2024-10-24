from pymongo import MongoClient
import mysql.connector
from config import MONGO_URI, MYSQL_CONFIG

mongo_client = MongoClient(MONGO_URI)
db_mongo = mongo_client.sms_management
country_operator_collection = db_mongo.country_operator_pairs

mysql_conn = mysql.connector.connect(**MYSQL_CONFIG)
mysql_cursor = mysql_conn.cursor()

def store_sms_metrics(country, operator, sms_sent, success_rate, failure_count):
    query = """
        INSERT INTO sms_metrics (country, operator, sms_sent, success_rate, failure_count) 
        VALUES (%s, %s, %s, %s, %s)
    """
    mysql_cursor.execute(query, (country, operator, sms_sent, success_rate, failure_count))
    mysql_conn.commit()

def add_country_operator(data):
    country_operator_collection.insert_one(data)

def get_high_priority_pairs():
    return list(country_operator_collection.find({"high_priority": True}))
