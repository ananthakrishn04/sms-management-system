from flask_jwt_extended import JWTManager, create_access_token
from flask import request, jsonify
from config import JWT_SECRET_KEY

def configure_jwt(app):
    app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
    jwt = JWTManager(app)
    return jwt

def valid_user(username, password):
    return username == "admin" and password == "password"

def login():
    data = request.json
    if valid_user(data['username'], data['password']):
        access_token = create_access_token(identity=data['username'])
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Bad credentials"}), 401
