from flask import make_response, jsonify


def generate_response(success, message, data, status_code):
    return make_response(jsonify({'success': success,
                                  'message': message,
                                  'data': data,
                                  'status_code': status_code}),
                         status_code)
