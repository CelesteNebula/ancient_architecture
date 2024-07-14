from config.database import db

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.String(255), primary_key=True)
    identity = db.Column(db.String(255), nullable=False)
    times = db.Column(db.Integer, nullable=False)

    def __init__(self, id, identity='regular', times=1000):
        self.id = id
        self.identity = identity
        self.times = times

    def to_dict(self):
        return {
            'id': self.id,
            'identity': self.identity,
            'times': self.times
        }
