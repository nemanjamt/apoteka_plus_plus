from flask import request
from app import app
from shared import request_helper


def get_order(order_id):
    url = "http://127.0.0.1:8001/api/order/" + str(order_id)
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    return request_helper.send_get_request(url, headers)


def change_order(order_id):
    url = "http://127.0.0.1:8001/api/order/" + str(order_id)
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    data = request.json
    return request_helper.send_put_request(url, headers, data)


def delete_order(order_id):
    url = "http://127.0.0.1:8001/api/order/" + str(order_id)
    headers = {"Content-Type": "application/json"}
    return request_helper.send_delete_request(url, headers)


def create_order():
    url = "http://127.0.0.1:8001/api/order"
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    data = request.json
    return request_helper.send_post_request(url, headers, data)


def order_change_status(order_id, status):
    url = "http://127.0.0.1:8001/api/order/" + str(order_id) + "/status/" + str(status)
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    data = request.json
    return request_helper.send_put_request(url, headers, data)


def change_order_item_quantity(id, quantity):
    url = "http://127.0.0.1:8001/api/order_item/" + str(id) + "/quantity/" + str(quantity)
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    data = {}
    return request_helper.send_put_request(url, headers, data)


def create_order_item():
    url = "http://127.0.0.1:8001/api/order_item"
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    data = request.json
    return request_helper.send_post_request(url, headers, data)


def delete_order_item(order_item_id):
    url = "http://127.0.0.1:8001/api/order_item/" + str(order_item_id)
    headers = {"Content-Type": "application/json"}
    return request_helper.send_delete_request(url, headers)


def approve_delivery_request(delivery_request_id):
    url = "http://127.0.0.1:8001/api/delivery_request/" + str(delivery_request_id)
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    data = {}
    return request_helper.send_put_request(url, headers, data)


def exist_delivery_requests_by_order_deliverer(order_id, deliverer_id):
    url = "http://127.0.0.1:8001/api/delivery_request/exist/" + str(order_id) + "/" + str(deliverer_id)
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    return request_helper.send_get_request(url, headers)


def find_delivery_requests_by_order_id(order_id):
    url = "http://127.0.0.1:8001/api/delivery_request/" + str(order_id)
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    return request_helper.send_get_request(url, headers)


def delete_delivery_request(delivery_request_id):
    url = "http://127.0.0.1:8001/api/delivery_request/" + str(delivery_request_id)
    headers = {"Content-Type": "application/json"}
    return request_helper.send_delete_request(url, headers)


def create_delivery_request():
    url = "http://127.0.0.1:8001/api/delivery_request"
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    data = request.json
    return request_helper.send_post_request(url, headers, data)
