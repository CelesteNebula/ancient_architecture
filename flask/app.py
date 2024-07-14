from flask import Flask
from config.database import app, db
from route.userRoute import user
from route.ancientArchitectureRoute import ancientArchitecture

app.register_blueprint(user, url_prefix="/user")
app.register_blueprint(ancientArchitecture, url_prefix="/ancientArchitecture")

@app.route('/')
def ping():
    return 'ok'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
