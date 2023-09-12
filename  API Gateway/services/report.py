from urllib.parse import urlencode, urlunparse

from flask import request

from shared import request_helper


def get_reports():
    url = "http://127.0.0.1:8003/api/report_orders"
    headers = {"Content-Type": "application/json"}

    if request.headers.__contains__('Authorization'):
        headers["Authorization"] = request.headers['Authorization']
    query_params = dict(request.args)

    # Dodajemo query parametre u URL
    query_string = urlencode(query_params)

    return request_helper.send_get_request_with_params(url, headers, query_params)

