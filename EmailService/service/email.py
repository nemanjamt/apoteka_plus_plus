from flask_mail import Message
from app import mail
from flask import request, jsonify
from flask_expects_json import expects_json

from service.response_helper import generate_response

mail_schema = {
    "type": "object",
    "properties": {
        "recipient": {"type": "string"},
        "message": {"type": "string"}

    },
    "required": ["recipient", "message"]
}


@expects_json(mail_schema)
def send_message():
    message_text = request.json['message']
    recipient = request.json['recipient']
    msg = Message(
        sender='uberovicuber9@gmail.com',
        recipients=[recipient]
    )
    msg.body = message_text
    mail.send(msg)
    return generate_response(True, "email successful sent", None, 201)
