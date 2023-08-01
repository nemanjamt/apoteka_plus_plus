from flask import request
from flask_expects_json import expects_json
from flask_jwt_extended import create_access_token

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

    additional_claims = {"role": user.role, "id": user.id}
    access_token = create_access_token(username, additional_claims=additional_claims)
    return generate_response(True, "Successful login", access_token, 200)
