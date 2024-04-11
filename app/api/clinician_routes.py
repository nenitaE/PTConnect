from flask import Blueprint, jsonify, session, request
from app.models import User, db, PatientList

clinician_routes = Blueprint('clinicians', __name__)

@clinician_routes.route('')
def clinicians():
    """
    Query for all clinicians and return them in a list of clinician dictionaries
    """
    clinicians = User.query.filter(User.isClinician.is_(True)).all()
    return jsonify({'clinicians': [clinician.to_dict() for clinician in clinicians]})