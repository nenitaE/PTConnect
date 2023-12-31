from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm

booked_visit_routes = Blueprint('bookedVisits', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages