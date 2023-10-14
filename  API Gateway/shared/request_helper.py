import json
import requests
from shared.response_helper import generate_response


def send_get_request(url, headers):
    try:
        r = requests.get(url, headers=headers)
        try:
            response_data = r.json()
            expected_keys = ['success', 'message', 'data', 'status_code']
            if all(key in response_data for key in expected_keys):
                return generate_response(response_data['success'], response_data['message'], response_data['data'],
                                         response_data['status_code'])
            else:
                return generate_response(False, "Response data is missing expected keys", None, 500)
        except ValueError:
            return generate_response(False, "Invalid JSON response", None, 500)
    except requests.exceptions.RequestException as e:
        return generate_response(False, "Service is currently unavailable", None, 503)


def send_get_request_with_params(url, headers, query_params):
    try:
        import time
        start_time = time.time()
        r = requests.get(url, headers=headers, params=query_params)
        print("--- %s seconds ---" % (time.time() - start_time))
        # response_data = r.json()
        # return generate_response(response_data['success'], response_data['message'], response_data['data'],
        #                          response_data['status_code'])
        try:
            response_data = r.json()

            # Provera da li postoje očekivani ključevi u response_data
            expected_keys = ['success', 'message', 'data', 'status_code']
            if all(key in response_data for key in expected_keys):
                return generate_response(response_data['success'], response_data['message'], response_data['data'],
                                         response_data['status_code'])
            else:
                return generate_response(False, "Response data is missing expected keys", None, 500)
        except ValueError:
            return generate_response(False, "Invalid JSON response", None, 500)
    except requests.exceptions.RequestException as e:
        return generate_response(False, "User service is currently unavailable", None, 503)


def send_post_request(url, headers, data):
    try:
        r = requests.post(url, data=json.dumps(data), headers=headers)
        # response_data = r.json()
        # return generate_response(response_data['success'], response_data['message'], response_data['data'],
        #                          response_data['status_code'])
        try:
            response_data = r.json()

            # Provera da li postoje očekivani ključevi u response_data
            expected_keys = ['success', 'message', 'data', 'status_code']
            if all(key in response_data for key in expected_keys):
                return generate_response(response_data['success'], response_data['message'], response_data['data'],
                                         response_data['status_code'])
            else:
                return generate_response(False, "Response data is missing expected keys", None, 500)
        except ValueError:
            return generate_response(False, "Invalid JSON response", None, 500)
    except requests.exceptions.RequestException as e:
        return generate_response(False, "User service is currently unavailable", None, 503)


def send_put_request(url, headers, data):
    try:
        r = requests.put(url, data=json.dumps(data), headers=headers)
        #response_data = r.json()
        # return generate_response(response_data['success'], response_data['message'], response_data['data'],
        #                          response_data['status_code'])
        try:
            response_data = r.json()

            # Provera da li postoje očekivani ključevi u response_data
            expected_keys = ['success', 'message', 'data', 'status_code']
            if all(key in response_data for key in expected_keys):
                return generate_response(response_data['success'], response_data['message'], response_data['data'],
                                         response_data['status_code'])
            else:
                return generate_response(False, "Response data is missing expected keys", None, 500)
        except ValueError:
            return generate_response(False, "Invalid JSON response", None, 500)
    except requests.exceptions.RequestException as e:
        return generate_response(False, "User service is currently unavailable", None, 503)


def send_delete_request(url, headers):
    try:
        r = requests.delete(url, headers=headers)
        # response_data = r.json()
        # return generate_response(response_data['success'], response_data['message'], response_data['data'],
        #                          response_data['status_code'])
        try:
            response_data = r.json()

            # Provera da li postoje očekivani ključevi u response_data
            expected_keys = ['success', 'message', 'data', 'status_code']
            if all(key in response_data for key in expected_keys):
                return generate_response(response_data['success'], response_data['message'], response_data['data'],
                                         response_data['status_code'])
            else:
                return generate_response(False, "Response data is missing expected keys", None, 500)
        except ValueError:
            return generate_response(False, "Invalid JSON response", None, 500)
    except requests.exceptions.RequestException as e:
        return generate_response(False, "User service is currently unavailable", None, 503)
