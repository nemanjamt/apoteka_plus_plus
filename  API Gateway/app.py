import os

from flask import Flask
from flask_jwt_extended import JWTManager

secret_key = os.urandom(32).hex()
app = Flask(__name__)
app.config["JWT_TOKEN_LOCATION"] = ["headers", "json"]
app.config["JWT_SECRET_KEY"] = "secret-key"

jwt = JWTManager(app)
from routes import user

if __name__ == '__main__':
    app.run()
