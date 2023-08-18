from flask import request
from app import app
from shared import request_helper


def get_product(product_id):
    url = "http://127.0.0.1:8000/product/" + str(product_id)
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    return request_helper.send_get_request(url, headers)


def change_product(product_id):
    url = "http://127.0.0.1:8000/product/" + str(product_id)
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    data = request.json
    return request_helper.send_put_request(url, headers, data)


def delete_product(product_id):
    url = "http://127.0.0.1:8000/product/" + str(product_id)
    headers = {"Content-Type": "application/json"}
    return request_helper.send_delete_request(url, headers)


def search_products():
    url = "http://127.0.0.1:8000/product/search"
    headers = {"Content-Type": "application/json"}
    query_params = dict(request.args)
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    return request_helper.send_get_request_with_params(url, headers, query_params)


def create_product():
    url = "http://127.0.0.1:8000/product"
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    data = request.json
    return request_helper.send_post_request(url, headers, data)


def find_basic_product(product_id):
    url = "http://127.0.0.1:8000/product/basic/" + str(product_id)
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    return request_helper.send_get_request(url, headers)
