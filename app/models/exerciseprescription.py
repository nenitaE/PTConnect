from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class ExercisePrescription(db.Model):
    __tablename__ = 'exerciseprescriptions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40), nullable=False)
    dailyFrequency = db.Column(db.Integer)
    weeklyFrequency = db.Column(db.Integer)
    status = db.Column(db.String(40), nullable=False)
    clinicianId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    patientId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    patient = db.relationship('User',foreign_keys='ExercisePrescription.patientId', back_populates='exerciseprescriptions')
    clinician = db.relationship('User', foreign_keys='ExercisePrescription.clinicianId', back_populates='prescribed_exerciseprescriptions')

    exercises = db.relationship('Exercise', back_populates='exerciseprescription')

    def to_dict(self):
        return {
            'id': self.id,
            'clinicianId': self.clinicianId,
            'patientId': self.patientId,
            'title': self.title,
            'status': self.status,
            'dailyFrequency': self.dailyFrequency,
            'weeklyFrequency': self.weeklyFrequency,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }