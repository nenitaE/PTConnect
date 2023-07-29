from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, InputRequired

    
class ExerciseForm(FlaskForm):
    exercisePrescriptionId = IntegerField('exercisePrescriptionId', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    exerciseData = StringField('exerciseData', validators=[DataRequired()])
    images = StringField('images', validators=[DataRequired()])
    sets = IntegerField('sets', validators=[DataRequired()])
    reps = IntegerField('reps', validators=[DataRequired()])
    notes = StringField('notes', validators=[DataRequired()])
    holdTime = IntegerField('holdTime')