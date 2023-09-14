from flask import request

from decorators.auth import jwt_required_custom
from services import report as report_service
from app import app


@app.route("/report_orders", methods=['GET'])
@jwt_required_custom()
def reports():
    return report_service.get_reports()
