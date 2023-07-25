from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

    
class ExerciseRxForm(FlaskForm):
    clinicianId = IntegerField('clinicianId', validators=[DataRequired()])
    patientId = IntegerField('patientId', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    dailyFrequency = IntegerField('dailyFrequency', validators=[DataRequired()])
    weeklyFrequency = IntegerField('weeklyFrequency', validators=[DataRequired()])
    status = StringField('status', validators=[DataRequired()])