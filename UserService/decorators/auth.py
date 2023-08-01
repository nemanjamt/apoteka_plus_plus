from functools import wraps

from flask import jsonify
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import verify_jwt_in_request

from services.response_helper import generate_response


def role_required(roles):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            try:
                verify_jwt_in_request()
            except:
                return generate_response(False, "Invalid token", [], 401)
            claims = get_jwt()
            user_role = claims["role"]
            if user_role in roles.split("|"):
                return fn(*args, **kwargs)
            else:
                return generate_response(False, "No permission", [], 403)
        return decorator
    return wrapper
