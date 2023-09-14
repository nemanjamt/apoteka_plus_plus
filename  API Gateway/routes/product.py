from flask import request

from decorators.auth import jwt_required_custom
from services import product as product_service
from app import app


@app.route("/product/<int:product_id>", methods=['GET', 'PUT', 'DELETE'])
def product_by_id(product_id):
    if request.method == 'PUT':
        return product_service.change_product(product_id)
    elif request.method == 'GET':
        return product_service.get_product(product_id)
    else:
        return product_service.delete_product(product_id)


@app.route("/product", methods=['POST'])
@jwt_required_custom()
def create_product():
    return product_service.create_product()


@app.route("/product/search", methods=['GET'])
def search_products():
    return product_service.search_products()


@app.route("/product/basic/<int:product_id>", methods=['GET'])
def find_basic_product(product_id):
    return product_service.find_basic_product(product_id)
