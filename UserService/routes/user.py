from flask import request
from flask_jwt_extended import jwt_required

from app import app
from decorators.auth import role_required, jwt_required_custom
from services import user as user_service
from services.response_helper import generate_response

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


@app.route("/users/block/<int:user_id>", methods=['PUT'])
def block_user(user_id):
    return user_service.block_user(user_id)


@app.route("/users/unblock/<int:user_id>", methods=['PUT'])
def unblock_user(user_id):
    return user_service.unblock_user(user_id)


@app.route("/users/<int:user_id>", methods=['GET', 'PUT', 'DELETE'])
@jwt_required_custom()
def users_by_id(user_id):
    if request.method == 'PUT':
        return user_service.change_user(user_id)
    elif request.method == 'GET':
        return user_service.get_user(user_id)
    else:
        return user_service.delete_user(user_id)


@app.route("/user/basic", methods=['GET'])
def get_basic_user_info():
    user_id = request.args.get('id')
    username = request.args.get('username')

    if user_id:
        return user_service.get_basic_user_info_by_id(int(user_id))
    elif username:
        return user_service.get_basic_user_info_by_username(username)
    else:
        return generate_response(True, 'Invalid request', None, 400)


@app.route("/user/pharmacists", methods=['GET'])
def get_pharmacists():
    return user_service.get_pharmacists()


@app.route("/user/deliverers", methods=['GET'])
def get_deliverers():
    return user_service.get_deliverers()
