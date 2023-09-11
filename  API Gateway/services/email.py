from flask import request

from shared import request_helper


def send_email():
    url = "http://127.0.0.1:5002/email-send"
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    data = request.json
    return request_helper.send_post_request(url, headers, data)
