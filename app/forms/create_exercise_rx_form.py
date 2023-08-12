from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange


class ExerciseRxForm(FlaskForm):
    clinicianId = IntegerField('clinicianId', validators=[DataRequired()])
    patientId = IntegerField('patientId', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired(), Length(min=4, max=20, message='Title must be between 4 and 20 characters.')])
    dailyFrequency = IntegerField('dailyFrequency', validators=[DataRequired(), NumberRange(min=1, max=6, message='Daily Frequency should be between 1 and 6.')])
    weeklyFrequency = IntegerField('weeklyFrequency', validators=[DataRequired(), NumberRange(min=1, max=7, message='Weekly Frequency should be between 1 and 6.')])
    status = StringField('status', validators=[DataRequired()])