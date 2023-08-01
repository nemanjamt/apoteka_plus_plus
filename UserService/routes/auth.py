from app import app
import services.auth


@app.route("/auth/login", methods=['POST'])
def login():
    return services.auth.login()
