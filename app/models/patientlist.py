from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class PatientList(db.Model):
    __tablename__ = 'patientlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(40), nullable=False)
    clinicianId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    patientId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    patient = db.relationship('User', foreign_keys='PatientList.patientId', back_populates='patientlists')
    clinician = db.relationship('User', foreign_keys='PatientList.clinicianId', back_populates='created_patientlists')
