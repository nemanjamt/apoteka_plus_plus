from app import app
from decorators.auth import jwt_required_custom
from services import email as service


@app.route('/email-send', methods=['POST'])
@jwt_required_custom()
def send_message():
    return service.send_email()
