from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from email_validator import validate_email, EmailNotValidError
from app.models import User


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
    
def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), Length(min=4, max=20, message='Username must be between 4 and 20 characters.'), username_exists])
    firstName = StringField('firstName', validators=[DataRequired(), Length(min=4, max=20, message='First name must be between 4 and 20 characters.')])
    lastName = StringField('lastName', validators=[DataRequired(), Length(min=4, max=20, message='Last name must be between 4 and 20 characters.')])
    city = StringField('city', validators=[DataRequired(), Length(min=4, max=20, message='City must be between 4 and 20 characters.')])
    state = StringField('state', validators=[DataRequired(), Length(min=4, max=20, message='State must be between 4 and 20 characters.')])
    profileImage = StringField('profileImage')
    email = StringField('email', validators=[DataRequired(), user_exists, email_is_valid, Length(max=20, message='Email can not exceed 50 characters.')])
    isClinician = BooleanField('isClinician')
    password = StringField('password', validators=[DataRequired()])