from flask import request
from services import report as report_service
from app import app


@app.route("/report_orders", methods=['GET'])
def reports():
    return report_service.get_reports()
