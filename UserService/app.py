from datetime import timedelta

from flask import Flask
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
import os
secret_key = os.urandom(32).hex()
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = \
    f'postgresql://postgres:root@localhost:5432/users_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = "secret-key"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=0.5)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
app.config["JWT_TOKEN_LOCATION"] = ["headers", "json"]
db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

with app.app_context():
    db.create_all()

from model import User
from routes import user

if __name__ == '__main__':
    app.run()
