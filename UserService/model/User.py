from app import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(50), unique=True)
    username = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(50))
    deleted = db.Column(db.Boolean, default=False)
    role = db.Column(db.String(20), default="CUSTOMER")

    def __init__(self, first_name, last_name, email, username, password, role):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.username = username
        self.password = password
        self.role = role

    def __repr__(self):
        return f'User {self.first_name} {self.last_name} - username:{self.username} email:{self.email} password: {self.password}'

    def __str__(self):
        return f'User {self.first_name} {self.last_name} - id: {self.id} username:{self.username} email:{self.email} password: {self.password}'

    def to_json(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'username': self.username,
        }
