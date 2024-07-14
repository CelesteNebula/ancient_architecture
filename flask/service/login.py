from model.user import User
from config.database import db
from flask import jsonify

class LoginService:
    def login(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            user = User(id=id)
            db.session.add(user)
            db.session.commit()
        return jsonify({'code': 0, 'message': '登录成功', 'data': user.to_dict()})
