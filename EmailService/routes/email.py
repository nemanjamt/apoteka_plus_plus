from mailbox import Message
from app import app

import service.email as service


@app.route('/email-send', methods=['POST'])
def send_message():
    return service.send_message()
