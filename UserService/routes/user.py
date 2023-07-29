from flask import request

from app import app
from services import user as user_service

schema = {
    "type": "object",
    "properties": {
        "first_name": {"type": "string"},
        "last_name": {"type": "string"}
    },
    "required": ["first_name"]
}


@app.route("/users", methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        return user_service.get_users()
    else:
        return user_service.create_user()


@app.route("/users/<int:user_id>", methods=['GET', 'PUT', 'DELETE'])
def users_by_id(user_id):
    if request.method == 'PUT':
        return user_service.change_user(user_id)
    elif request.method == 'GET':
        return user_service.get_user(user_id)
    else:
        return user_service.delete_user(user_id)
