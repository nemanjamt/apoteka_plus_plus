import re

from flask import request, make_response, jsonify
from flask_expects_json import expects_json
from jsonschema.exceptions import ValidationError

from app import app
from model.User import User

create_user_schema = {
    "type": "object",
    "properties": {
        "first_name": {"type": "string", "minLength": 2, "maxLength": 80},
        "last_name": {"type": "string", "minLength": 2, "maxLength": 80},
        "username": {"type": "string", "minLength": 3, "maxLength": 20},
        "email": {"type": "string", "format": "email"},
        "password": {"type": "string", "minLength": 6, "maxLength": 80}
    },
    "required": ["first_name", "last_name", "username", "email", "password"]
}


def check_email_format(email):
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    return re.match(regex, email)


@expects_json(create_user_schema)
def create_user():
    from app import db
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']

    if not check_email_format(email):
        return generate_response(False, 'Bad email format', None, 400)
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return generate_response(False, 'User with email already exists', None, 400)
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return generate_response(False, 'User with specified username already exists', None, 400)
    new_user = User(first_name, last_name, email, username, password)
    db.session.add(new_user)
    db.session.commit()
    return generate_response(True, 'Successful created new user', new_user.to_json(), 201)


change_user_schema = {
    "type": "object",
    "properties": {
        "first_name": {"type": "string", "minLength": 2, "maxLength": 80},
        "last_name": {"type": "string", "minLength": 2, "maxLength": 80},
    },
    "required": ["first_name", "last_name"]
}


@expects_json(create_user_schema)
def change_user(user_id):
    from app import db
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    user = User.query.get(user_id)
    if not user or user.deleted:
        return generate_response(False, 'User with specified id does not exists', None, 404)
    user.first_name = first_name
    user.last_name = last_name
    db.session.commit()
    return generate_response(True, 'Successful changed user data', user.to_json(), 200)


def get_user(user_id):
    user = User.query.get(user_id)
    if not user or user.deleted:
        return generate_response(False, 'User with specified id does not exists', None, 404)
    return generate_response(True, 'successful user found', user.to_json(), 200)


def get_users():
    users = User.query.filter_by(deleted=False).all()
    users_json = [user.to_json() for user in users]
    return generate_response(True, 'success', users_json, 200)


def delete_user(user_id):
    from app import db
    user = User.query.get(user_id)
    if not user or user.deleted:
        return generate_response(False, 'User with specified id does not exists', None, 404)
    user.deleted = True
    db.session.commit()
    return generate_response(True, 'Successful user deleted', user.to_json(), 200)


@app.errorhandler(400)
def bad_request(error):
    if isinstance(error.description, ValidationError):
        original_error = error.description
        return generate_response(False, original_error.message, None, 400)

    # handle other "Bad Request"-errors
    return generate_response(False, "Bad Request", None, 400)


def generate_response(success, message, data, status_code):
    return make_response(jsonify({'success': success,
                                  'message': message,
                                  'data': data}),
                         status_code)
