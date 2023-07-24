from flask import Blueprint, jsonify, session, request
from app.models import User, db, PatientList
from sqlalchemy import and_
from .auth_routes import validation_errors_to_error_messages
from app.forms import LoginForm
from flask_login import login_required, current_user

patient_list_routes = Blueprint('patientLists', __name__)

@patient_list_routes.route('/current', methods=['GET'])
def get_current_patientLists():
    """
    Query for all patientLists of current user-clinician and returns them in a list of patientList dictionaries
    """
    current_user_id = current_user.get_id()
    print('CURRENT USERID', current_user_id)
    user = User.query.get(current_user_id)

    #verify that user is logged in
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    #check if current_user is a clinician
    curr_user_is_clinician = User.query.filter(
        and_(
            User.id == current_user_id
        )
    ).filter(User.isClinician.is_(True))

    print(curr_user_is_clinician, "********CURRUSERISCLINICIAN**********")

    #if current_user is not a clinician, return error msg
    if curr_user_is_clinician is None:
        return jsonify({'message': 'Must be a registered clinician.'}), 404

    else:
        clinicianPatientLists = PatientList.query.filter(PatientList.clinicianId == current_user_id)
        return {'PatientLists': [clinicianPatientList.to_dict() for clinicianPatientList in clinicianPatientLists]}

