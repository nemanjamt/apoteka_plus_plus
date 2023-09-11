from flask import Flask
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv
load_dotenv()
app = Flask(__name__)

mail = Mail(app)
print()
# configuration of mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.getenv("EMAIL_HOST_USER")
app.config['MAIL_PASSWORD'] = os.getenv("EMAIL_HOST_PASSWORD")
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)




from routes import email


if __name__ == '__main__':
    app.run()
