from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class PatientListForm(FlaskForm):
    clinicianId = IntegerField('clinicianId', validators=[DataRequired()])
    patientId = IntegerField('patientId', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    status = StringField('status', validators=[DataRequired()])