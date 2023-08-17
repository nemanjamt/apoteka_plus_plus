import requests as requests
from flask import request
import json

from shared import request_helper
from shared.response_helper import generate_response


def get_users():
    url = "http://127.0.0.1:5001/users"
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    return request_helper.send_get_request(url, headers)


def get_user(user_id):
    url = "http://127.0.0.1:5001/users/" + str(user_id)
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    return request_helper.send_get_request(url, headers)


def login():
    url = "http://127.0.0.1:5001/auth/login"
    headers = {"Content-Type": "application/json"}
    data = request.json
    return request_helper.send_post_request(url, headers, data)


def create_user():
    url = "http://127.0.0.1:5001/users"
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    data = request.json
    return request_helper.send_post_request((url, headers, data))


def change_user(user_id):
    url = "http://127.0.0.1:5001/users/"+str(user_id)
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    data = request.json
    return request_helper.send_put_request(url, headers, data)


def delete_user(user_id):
    url = "http://127.0.0.1:5001/users/" + user_id
    headers = {"Content-Type": "application/json"}
    return request_helper.send_delete_request(url, headers)
