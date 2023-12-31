from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(20), nullable=False)
    lastName = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    city = db.Column(db.String(20), nullable=False)
    state = db.Column(db.String(20), nullable=False)
    profileImage = db.Column(db.String(200))
    isClinician = db.Column(db.Boolean, nullable = False)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    exerciseprescriptions = db.relationship('ExercisePrescription', foreign_keys='ExercisePrescription.patientId',back_populates='patient',  cascade="all, delete-orphan")
    prescribed_exerciseprescriptions = db.relationship('ExercisePrescription', foreign_keys='ExercisePrescription.clinicianId', back_populates='clinician',  cascade="all, delete-orphan")
    messages = db.relationship('Message', foreign_keys='Message.patientId', back_populates='patient', cascade="all, delete-orphan")
    received_messages = db.relationship('Message', foreign_keys='Message.clinicianId', back_populates='clinician', cascade="all, delete-orphan")
    bookedvisits = db.relationship('BookedVisit', foreign_keys='BookedVisit.patientId', back_populates='patient', cascade="all, delete-orphan")
    received_bookedvisits = db.relationship('BookedVisit', foreign_keys='BookedVisit.clinicianId', back_populates='clinician', cascade="all, delete-orphan")
    patientlists = db.relationship('PatientList', foreign_keys='PatientList.patientId', back_populates='patient', cascade="all, delete-orphan")
    created_patientlists = db.relationship('PatientList', foreign_keys='PatientList.clinicianId', back_populates='clinician', cascade="all, delete-orphan")
    
    # assigned_patientlists = db.relationship('PatientList', back_populates='user')
    
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.firstName,
            'username': self.username,
            'email': self.email,
            'isClinician': self.isClinician,
            'profileImage': self.profileImage
        }
    def to_dict_with_exercisePrescriptions(self):
        return {
            'id': self.id,
            'firstName': self.firstName,
            'username': self.username,
            'email': self.email,
            'isClinician': self.isClinician,
            'profileImage': self.profileImage,
            'exercisePrescriptions': [prescribed_exerciseprescription.to_dict() for prescribed_exerciseprescription in self.prescribed_exerciseprescriptions]
        }
    def to_dict_with_patientLists(self):
        return {
            'id': self.id,
            'firstName': self.firstName,
            'username': self.username,
            'email': self.email,
            'isClinician': self.isClinician,
            'profileImage': self.profileImage,
            'patientLists': [created_patientlist.to_dict() for created_patientlist in self.created_patientlists]
        }
