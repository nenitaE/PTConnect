from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class BookedVisit(db.Model):
    __tablename__ = 'bookedvisits'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    visitTime = db.Column(db.String(500), nullable=False)
    visitDate = db.Column(db.Boolean, nullable = False)
    clinicianId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    patientId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    patient = db.relationship('User',  foreign_keys='BookedVisit.patientId', back_populates='bookedvisits')
    clinician = db.relationship('User', foreign_keys='BookedVisit.clinicianId', back_populates='received_bookedvisits')
