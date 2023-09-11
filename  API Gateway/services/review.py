from flask import request
from app import app
from shared import request_helper


def get_review_product(review_id):
    url = "http://127.0.0.1:8002/api/review_product/" + str(review_id)
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    return request_helper.send_get_request(url, headers)


def change_review_product(review_id):
    url = "http://127.0.0.1:8002/api/review_product/" + str(review_id)
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    data = request.json
    return request_helper.send_put_request(url, headers, data)


def delete_review_product(review_id):
    url = "http://127.0.0.1:8002/api/review_product/" + str(review_id)
    headers = {"Content-Type": "application/json"}
    return request_helper.send_delete_request(url, headers)


def create_review_product():
    url = "http://127.0.0.1:8002/api/review_product"
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    data = request.json
    return request_helper.send_post_request(url, headers, data)


def get_reviews_product(product_id):
    url = "http://127.0.0.1:8002/api/reviews_product/" + str(product_id)
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    return request_helper.send_get_request(url, headers)


def report_review_product(review_id):
    url = "http://127.0.0.1:8002/api/review_product/report/" + str(review_id)
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    data = {}
    return request_helper.send_put_request(url, headers, data)


def delete_report_review_product(review_id):
    url = "http://127.0.0.1:8002/api/review_product/unreport/" + str(review_id)
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    data = {}
    return request_helper.send_put_request(url, headers, data)


def get_reported_review_product():
    url = "http://127.0.0.1:8002/api/review_product/reported"
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    return request_helper.send_get_request(url, headers)


def get_review_deliverer(review_id):
    url = "http://127.0.0.1:8002/api/review_deliverer/" + str(review_id)
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    return request_helper.send_get_request(url, headers)


def change_review_deliverer(review_id):
    url = "http://127.0.0.1:8002/api/review_deliverer/" + str(review_id)
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    data = request.json
    return request_helper.send_put_request(url, headers, data)


def delete_review_deliverer(review_id):
    url = "http://127.0.0.1:8002/api/review_deliverer/" + str(review_id)
    headers = {"Content-Type": "application/json"}
    return request_helper.send_delete_request(url, headers)


def get_reviews_product_by_user_and_product(user_id, product_id):
    url = "http://127.0.0.1:8002/api/review_product/find_by_user_and_product/" + str(user_id) + "/" + str(product_id)
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    return request_helper.send_get_request(url, headers)


def create_review_deliverer():
    url = "http://127.0.0.1:8002/api/review_deliverer"
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    data = request.json
    return request_helper.send_post_request(url, headers, data)


def report_review_deliverer(review_id):
    url = "http://127.0.0.1:8002/api/review_deliverer/report/" + str(review_id)
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    data = {}
    return request_helper.send_put_request(url, headers, data)


def delete_report_review_deliverer(review_id):
    url = "http://127.0.0.1:8002/api/review_deliverer/unreport/" + str(review_id)
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    data = {}
    return request_helper.send_put_request(url, headers, data)


def get_reviews_deliverer(deliverer_id):
    url = "http://127.0.0.1:8002/api/reviews_deliverer/" + str(deliverer_id)
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    return request_helper.send_get_request(url, headers)


def get_review_deliverer_by_deliverer_order(deliverer_id, order_id):
    url = f"http://127.0.0.1:8002/api/review_deliverer/{deliverer_id}/{order_id}"
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    return request_helper.send_get_request(url, headers)


def get_reported_review_deliverer():
    url = "http://127.0.0.1:8002/api/review_deliverer/reported"
    headers = {"Content-Type": "application/json"}
    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    return request_helper.send_get_request(url, headers)
