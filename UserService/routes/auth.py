from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token

from app import app
import services.auth
from decorators.auth import jwt_required_custom_refresh


@app.route("/auth/login", methods=['POST'])
def login():
    return services.auth.login()


@app.route("/auth/refresh", methods=["POST"])
@jwt_required_custom_refresh()
def refresh():
    return services.auth.refresh()
