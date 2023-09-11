from flask import request
from app import app
from services import user as user_service
from shared.response_helper import generate_response


@app.route("/user/basic", methods=['GET'])
def get_user_info_basic():
    user_id = request.args.get('id')
    username = request.args.get('username')

    if user_id:
        return user_service.get_basic_info_by_id(int(user_id))
    elif username:
        return user_service.get_basic_info_by_username(username)
    else:
        return generate_response(True, 'Invalid request', None, 400)


@app.route("/users", methods=['GET', 'POST'])
def find_all_users():
    if request.method == 'GET':
        return user_service.get_users()
    elif request.method == 'POST':
        return user_service.create_user()


@app.route("/users/<int:user_id>", methods=['GET', 'PUT', 'DELETE'])
def users_by_id(user_id):
    if request.method == 'PUT':
        return user_service.change_user(user_id)
    elif request.method == 'GET':
        return user_service.get_user(user_id)
    else:
        return user_service.delete_user(user_id)


@app.route("/users/block/<int:user_id>", methods=['PUT'])
def block_user(user_id):
    return user_service.block_user(user_id)


@app.route("/users/unblock/<int:user_id>", methods=['PUT'])
def unblock_user(user_id):
    return user_service.unblock_user(user_id)


@app.route("/user/pharmacists", methods=['GET'])
def get_pharmacists():
    return user_service.get_pharmacists()


@app.route("/user/deliverers", methods=['GET'])
def get_deliverers():
    return user_service.get_deliverers()


@app.route("/auth/login", methods=['POST'])
def auth():
    return user_service.login()


@app.route("/auth/refresh", methods=['POST'])
def auth_refresh():
    return user_service.refresh()
