from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Exercise(db.Model):
    __tablename__ = 'exercises'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    exerciseData = db.Column(db.String(500), nullable=False)
    images = db.Column(db.String(500), nullable=False)
    sets = db.Column(db.Integer)
    reps = db.Column(db.Integer)
    notes = db.Column(db.String(250), nullable=False)
    holdTime = db.Column(db.Integer)
    exercisePrescriptionId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('exerciseprescriptions.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    exerciseprescriptions = db.relationship('ExercisePrescription', back_populates='exercises')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'exerciseData': self.exerciseData,
            'images': self.images,
            'sets': self.sets,
            'reps': self.reps,
            'notes': self.notes,
            'holdTime': self.holdTime,
            'exercisePrescriptionId': self.exercisePrescriptionId,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
