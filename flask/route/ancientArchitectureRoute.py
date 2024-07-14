from flask import Blueprint, request, jsonify
from model.user import User
from config.database import db
from service.returnResult import returnResult

ancientArchitecture = Blueprint('ancientArchitecture', __name__)

@ancientArchitecture.route('/recognize', methods=['POST'])
def recognize_architecture():
    user_id = request.form['userId']
    image = request.files['image']

    user = User.query.filter_by(id=user_id).first()
    if user and user.times > 0:
        # 调用识别模型进行识别
        result = returnResult().result(image)
        user.times -= 1
        db.session.commit()
        return jsonify({'result': result, 'remaining_times': user.times})
    else:
        return jsonify({'error': '用户不存在或识别次数不足'}), 400
