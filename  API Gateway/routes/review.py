from flask import request
from app import app
from services import review as review_service


@app.route("/review_product/<int:review_id>", methods=['GET', 'PUT', 'DELETE'])
def review_product(review_id):
    if request.method == 'GET':
        return review_service.get_review_product(review_id)
    elif request.method == 'PUT':
        return review_service.change_review_product(review_id)
    elif request.method == 'DELETE':
        return review_service.delete_review_product(review_id)


@app.route("/review_product", methods=['POST'])
def create_review_product():
    return review_service.create_review_product()


@app.route("/review_product/report/<int:review_id>", methods=['PUT'])
def report_review_product(review_id):
    return review_service.report_review_product(review_id)


@app.route("/review_product/unreport/<int:review_id>", methods=['PUT'])
def delete_report_review_product(review_id):
    return review_service.delete_report_review_product(review_id)


@app.route("/reviews_product/<int:product_id>", methods=['GET'])
def get_reviews_product(product_id):
    return review_service.get_reviews_product(product_id)


@app.route("/review_product/reported", methods=['GET'])
def get_reported_review_product():
    return review_service.get_reported_review_product()


@app.route("/review_deliverer/<int:review_id>", methods=['GET', 'PUT', 'DELETE'])
def review_deliverer(review_id):
    if request.method == 'GET':
        return review_service.get_review_deliverer(review_id)
    elif request.method == 'PUT':
        return review_service.change_review_deliverer(review_id)
    elif request.method == 'DELETE':
        return review_service.delete_review_deliverer(review_id)


@app.route("/review_deliverer", methods=['POST'])
def create_review_deliverer():
    return review_service.create_review_deliverer()


@app.route("/review_deliverer/report/<int:review_id>", methods=['PUT'])
def report_review_deliverer(review_id):
    return review_service.report_review_deliverer(review_id)


@app.route("/review_deliverer/unreport/<int:review_id>", methods=['PUT'])
def delete_report_review_deliverer(review_id):
    return review_service.delete_report_review_deliverer(review_id)


@app.route("/reviews_deliverer/<int:deliverer_id>", methods=['GET'])
def get_reviews_deliverer(deliverer_id):
    return review_service.get_reviews_deliverer(deliverer_id)


@app.route("/review_product/find_by_user_and_product/<int:user_id>/<int:product_id>", methods=['GET'])
def get_reviews_product_by_user_and_product(user_id, product_id):
    return review_service.get_reviews_product_by_user_and_product(user_id, product_id)


@app.route("/review_deliverer/<int:deliverer_id>/<int:order_id>", methods=['GET'])
def get_review_deliverer_by_deliverer_order(deliverer_id, order_id):
    return review_service.get_review_deliverer_by_deliverer_order(deliverer_id, order_id)


@app.route("/review_deliverer/reported", methods=['GET'])
def get_reported_review_deliverer():
    return review_service.get_reported_review_deliverer()
