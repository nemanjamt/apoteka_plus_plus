from flask import request
from app import app
from services import user as user_service


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


@app.route("/auth/login", methods=['POST'])
def auth():
    print(request.headers)
    return user_service.login()
