from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

# def daily_frequency_invalid(form, field):
#     # Checking if input is valid
#     dailyFrequency = field.data
#     if 6 <= dailyFrequency <= 0:
#         raise ValidationError('Please enter a value greater than 0 and less than 6.')

# def weekly_frequency_invalid(form, field):
#     # Checking if input is valid
#     weeklyFrequency = field.data
#     if 8 <= weeklyFrequency <= 0:
#         raise ValidationError('Please enter a value greater than 0 and less than 8.')



class ExerciseRxForm(FlaskForm):
    clinicianId = IntegerField('clinicianId', validators=[DataRequired()])
    patientId = IntegerField('patientId', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    dailyFrequency = IntegerField('dailyFrequency', validators=[DataRequired()])
    weeklyFrequency = IntegerField('weeklyFrequency', validators=[DataRequired()])
    status = StringField('status', validators=[DataRequired()])