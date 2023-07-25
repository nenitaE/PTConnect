from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, TextAreaField
from wtforms.validators import DataRequired

class MessageForm(FlaskForm):
    clinicianId = IntegerField('clinicianId', validators=[DataRequired()])
    patientId = IntegerField('patientId', validators=[DataRequired()])
    body = TextAreaField('body', validators=[DataRequired()])
    senderIsClinician = BooleanField('senderIsClinician')