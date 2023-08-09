from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from email_validator import validate_email, EmailNotValidError
from app.models import PatientList, User

def email_is_valid(form, field):
    # Checking if email is valid
    email = field.data
    try:
        emailinfo = validate_email(email, check_deliverability=False)
        emailinfo = emailinfo.normalized
    except EmailNotValidError as e:
        print(str(e))
        raise ValidationError('Please use a valid email address.')
    
def user_id_exists(form, field):
    # Checking if user exists
    patientId = field.data
    user = User.query.filter(User.id == patientId).first()
    if not user:
        raise ValidationError('Patient must be a registered user before you can connect.')
    
# def patientId_email_exist_together(form, field):
#     # Checking if user exists with both the patient Id and email matching 
#     patientId = field.data
#     userByPatientId = User.query.filter(User.id == patientId).first()
#     email = field.data
#     if userByPatientId.email & userByPatientId.email != email:
#         raise ValidationError('Patient ID and email must match a single existing user record.')

def user_email_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Patient must be a registered user before you can connect.')
    
def patient_list_exists(form, field):
    # Checking if patient list exists
    email = field.data
    patient = PatientList.query.filter(PatientList.email == email).first()
    if patient:
        raise ValidationError('Patient email is already connected to your patient list.')

def patient_list_patientId_exists(form, field):
    # Checking if patient list patientId exists
    patientId = field.data
    patient = PatientList.query.filter(PatientList.patientId == patientId).first()
    if patient:
        raise ValidationError('PatientId is already connected to your patient list.')

class PatientListForm(FlaskForm):
    clinicianId = IntegerField('clinicianId', validators=[DataRequired()])
    patientId = IntegerField('patientId', validators=[DataRequired(), user_id_exists, patient_list_patientId_exists])
    email = StringField('email', validators=[DataRequired(), email_is_valid, user_email_exists, patient_list_exists])
    status = StringField('status', validators=[DataRequired()])