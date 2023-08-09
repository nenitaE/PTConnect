from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from email_validator import validate_email, EmailNotValidError
from app.models import PatientList

def email_is_valid(form, field):
    # Checking if email is valid
    email = field.data
    print(email, "***********************EMAIL***********************")
    try:
        emailinfo = validate_email(email, check_deliverability=False)
        print(emailinfo, "*****EMAILINFO******")
        emailinfo = emailinfo.normalized
    except EmailNotValidError as e:
        print(str(e))
        raise ValidationError('Please use a valid email address.')
    
def patient_exists(form, field):
    # Checking if patientlist exists
    email = field.data
    patient = PatientList.query.filter(PatientList.email == email).first()
    if patient:
        raise ValidationError('Patient is already connected to your patient list.')

def patientId_exists(form, field):
    # Checking if patientlist exists
    patientId = field.data
    patient = PatientList.query.filter(PatientList.patientId == patientId).first()
    if patient:
        raise ValidationError('Patient is already connected to your patient list.')

class PatientListForm(FlaskForm):
    clinicianId = IntegerField('clinicianId', validators=[DataRequired()])
    patientId = IntegerField('patientId', validators=[DataRequired(), patientId_exists])
    email = StringField('email', validators=[DataRequired(), email_is_valid, patient_exists])
    status = StringField('status', validators=[DataRequired()])