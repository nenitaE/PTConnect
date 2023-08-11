from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    print("*************LINE15 USERS", users)
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/clinicians')

def user_clinicians():
    """
    Query for all user-clinicians and returns them in a list of user dictionaries
    """
    clinicians = User.query.filter(User.isClinician.is_(True)).all()
    print("*************LINE24 CLINICIANS", clinicians)
    return {'users': [clinicians.to_dict() for clinician in clinicians]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()