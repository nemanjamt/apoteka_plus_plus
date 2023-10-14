import os
from flask import Flask
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv


app = Flask(__name__)
load_dotenv()
app.config["JWT_TOKEN_LOCATION"] = ["headers", "json"]
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET_KEY')
jwt = JWTManager(app)
import routes

if __name__ == '__main__':
    app.run()


