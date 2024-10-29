from flask_jwt_extended import JWTManager, create_access_token
from flask import request, jsonify
from config import JWT_SECRET_KEY
from models import check_user
from werkzeug.security import check_password_hash, generate_password_hash

def configure_jwt(app):
    app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
    jwt = JWTManager(app)
    return jwt


def login():
    data = request.json

    if check_user(data['username']):
        pass_hash , role = check_user(data['username'])

        if check_password_hash(pass_hash,data['password']):
            access_token = create_access_token(identity={"username" : data['username'] , role : role})
            return jsonify(access_token=access_token), 200
        else:
            return jsonify({"msg": "Bad credentials"}), 401

    else:
        return jsonify({"msg": "Bad credentials"}), 401


def register():
    data = request.json
    p_hash = generate_password_hash(data['password'])

    if check_user(data['username']):
        return jsonify({"msg": "User already exists"}), 400


def add_admin():
    return "INSERT INTO users (username, password, role) VALUES (%s, %s, %s)", ('admin', generate_password_hash('password'), 'admin')