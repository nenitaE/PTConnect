from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(500), nullable=False)
    senderIsClinician = db.Column(db.Boolean)
    clinicianId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    patientId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    patient = db.relationship('User',  foreign_keys='Message.patientId', back_populates='messages')
    clinician = db.relationship('User', foreign_keys='Message.clinicianId', back_populates='received_messages')

    def to_dict(self):
        return {
            'id': self.id,
            'clinicianId': self.clinicianId,
            'patientId': self.patientId,
            'body': self.body,
            'senderIsClinician': self.senderIsClinician,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }