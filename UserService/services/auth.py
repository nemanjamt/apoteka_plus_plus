from flask import request, jsonify
from flask_expects_json import expects_json
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity

from model.User import User
from services.response_helper import generate_response

login_schema = {
    "type": "object",
    "properties": {
        "username": {"type": "string"},
        "password": {"type": "string"}
    },
    "required": ["username", "password"]
}


@expects_json(login_schema)
def login():
    username = request.json['username']
    password = request.json['password']
    user = User.query.filter_by(username=username).first()
    if user is None:
        return generate_response(False, "There is no user with provided username", [], 401)
    if user.password != password:
        return generate_response(False, "Password incorrect", [], 401)
    if user.blocked:
        return generate_response(False, "User is blocked", [], 401)
    if user.deleted:
        return generate_response(False, "User is deleted", [], 401)
    additional_claims = {"role": user.role, "id": user.id}
    access_token = create_access_token(username, additional_claims=additional_claims)
    refresh_token = create_refresh_token(username)
    data = {'access_token': access_token, 'refresh_token': refresh_token}
    return generate_response(True, "Successful login", data, 200)


def refresh():
    print(request.json)
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    data = {'access_token': access_token}
    return generate_response(True, "Successful login", data, 201)
