from flask import Blueprint, request, jsonify
from model.user import User
from config.database import db

user = Blueprint('user', __name__)

@user.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user_id = data['userId']
    user = User.query.filter_by(id=user_id).first()
    if not user:
        user = User(id=user_id)
        db.session.add(user)
        db.session.commit()
    return jsonify({'code': 0, 'message': '登录成功', 'data': user.to_dict()})
