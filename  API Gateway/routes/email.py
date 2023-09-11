from app import app
from services import email as service


@app.route('/email-send', methods=['POST'])
def send_message():
    return service.send_email()
