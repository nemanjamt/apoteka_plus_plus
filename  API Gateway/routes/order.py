from flask import request
from app import app
from decorators.auth import jwt_required_custom
from services import order as order_service


@app.route("/order/<int:order_id>", methods=['GET', 'PUT', 'DELETE'])
@jwt_required_custom()
def order(order_id):
    if request.method == 'GET':
        return order_service.get_order(order_id)
    elif request.method == 'PUT':
        return order_service.change_order(order_id)
    elif request.method == 'DELETE':
        return order_service.delete_order(order_id)


@app.route("/order", methods=['POST'])
@jwt_required_custom()
def create_order():
    return order_service.create_order()


@app.route("/order/search", methods=['GET'])
@jwt_required_custom()
def search_order():
    return order_service.search_order()


@app.route("/order/user_ordered_product/<int:user_id>/<int:product_id>", methods=['GET'])
@jwt_required_custom()
def find_user_ordered_product(user_id, product_id):
    return order_service.find_user_ordered_product(user_id, product_id)


@app.route("/order/<int:order_id>/status/<string:status>", methods=['PUT'])
@jwt_required_custom()
def change_order_status(order_id, status):
    return order_service.order_change_status(order_id, status)


@app.route("/order_item/<int:id>/quantity/<int:quantity>", methods=['PUT'])
@jwt_required_custom()
def change_quantity_order_item(id, quantity):
    return order_service.change_order_item_quantity(id, quantity)


@app.route("/order_item", methods=['POST'])
@jwt_required_custom()
def create_order_item():
    return order_service.create_order_item()


@app.route("/order_item/<int:id>", methods=['DELETE'])
@jwt_required_custom()
def delete_order_item(id):
    return order_service.delete_order_item(id)


@app.route("/delivery_request", methods=['POST'])
@jwt_required_custom()
def create_delivery_request():
    return order_service.create_delivery_request()


@app.route("/delivery_request/<int:delivery_request_id>", methods=['DELETE'])
@jwt_required_custom()
def delete_delivery_request(delivery_request_id):
    return order_service.delete_delivery_request(delivery_request_id)


@app.route("/delivery_request/<int:order_id>", methods=['GET'])
@jwt_required_custom()
def find_delivery_request_by_order_id(order_id):
    return order_service.find_delivery_requests_by_order_id(order_id)


@app.route("/delivery_request/exist/<int:order_id>/<int:deliverer_id>", methods=['GET'])
@jwt_required_custom()
def check_exist_delivery_request(order_id, deliverer_id):
    return order_service.exist_delivery_requests_by_order_deliverer(order_id, deliverer_id)


@app.route("/delivery_request/deliverer/<int:deliverer_id>", methods=['GET'])
@jwt_required_custom()
def find_delivery_requests_by_deliverer(deliverer_id):
    return order_service.find_delivery_requests_by_deliverer(deliverer_id)


@app.route("/delivery_requests", methods=['GET'])
@jwt_required_custom()
def find_all_delivery_requests():
    return order_service.find_all_delivery_requests()


@app.route("/delivery_request/<int:id>", methods=['PUT'])
@jwt_required_custom()
def aprove_delivery_request(id):
    return order_service.approve_delivery_request(id)
