from flask import Blueprint, jsonify, session, request
from app.models import User, db, PatientList
from sqlalchemy import and_
from .auth_routes import validation_errors_to_error_messages
from app.forms.create_patient_list_form import PatientListForm
from app.forms.edit_patient_list_form import EditPatientListForm
from flask_login import login_required, current_user

patient_list_routes = Blueprint('patientLists', __name__)


@patient_list_routes.route('/<int:patientListId>', methods=['PUT'])
@login_required
def edit_curr_patient_list(patientListId):
    """
    Edit a patientList 
    """
    print("IN ROUTE******************")
    form = EditPatientListForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    #query the patientList to edit
    patientList = PatientList.query.get(patientListId)
    print ('_____patientList______', vars(patientList))

    # verify that patientList exists for this user
    if patientList is None:
        print("********************line 27")
        return jsonify({'message': 'Patient List not found'}), 404

    #check to make sure the user is authorized to change this patientList
    print("********************ON line 31")
    print(type(patientList.clinicianId), "************ln32")
    print(int(session['_user_id']), "************ln33")
    print(type(session['_user_id']), "************ln34")
    print(patientList.clinicianId != int(session['_user_id']), "*******ln35")
    if patientList.clinicianId != int(session['_user_id']):
        print("********************line 32")
        return {'Error': 'User is not authorized'}

    if form.validate_on_submit():
        print("********************in form")
        data = form.data
        print("******FORM DATA FROM FRONTEND", data)
        clinicianId = data['clinicianId']
        print(clinicianId, "**********clinicianId IN form validate on submit backend**************")
        patientLists = PatientList.query.filter(PatientList.clinicianId == clinicianId).all()
        
        if 'patientId' in data:
            patientList.patientId = data["patientId"]
        if 'clinicianId' in data:
            patientList.clinicianId = data["clinicianId"]
        if 'email' in data:
            patientList.email = data["email"]
        if 'status' in data:
            patientList.status = data["status"]

        db.session.commit()
        print("********************line 58")
        return patientList.to_dict()
    print("********************line 27")
    return {'Error': validation_errors_to_error_messages(form.errors)}, 401


@patient_list_routes.route('/<int:patientListId>', methods=['DELETE'])
@login_required
def delete_curr_patientList(patientListId):
    """
    Deletes a patientList by Id
    """
    patientList = PatientList.query.get(patientListId)
    userId = session['_user_id']
    # print('patientList', patientList)

    if not patientList:
       return {'Error': 'Patient List not found'}

    if int(patientList.clinicianId) != int(userId):
        return {'Error': 'User is not authorized'}

    # print(session, "________DIR SESSION_______")
    db.session.delete(patientList)
    db.session.commit()

    patientLists = PatientList.query.filter(PatientList.clinicianId == userId).all()
    # print('_____________',userId,'----', patientLists, '________________')
    return {'patientList': [patientList.to_dict() for patientList in patientLists]}


@patient_list_routes.route('/current', methods=['GET'])
def get_current_patientLists():
    """
    Query for all patientLists of current user-clinician and returns them in a list of patientList dictionaries
    """
    # current_user_id = current_user.get_id()
    # print('CURRENT USERID', current_user_id)
    # user = User.query.get(current_user_id)

    # #verify that user is logged in
    # if user is None:
    #     return jsonify({'error': 'User not found'}), 404

    # #check if current_user is a clinician
    # curr_user_is_clinician = User.query.filter(
    #     and_(
    #         User.id == current_user_id
    #     )
    # ).filter(User.isClinician.is_(True)).first()

    # print(curr_user_is_clinician, "********CURRUSERISCLINICIAN**********")

    # #if current_user is not a clinician, return error msg
    # if curr_user_is_clinician is None:
    #     return {'message': 'Must be a registered clinician.'}, 404

    # else:
    #     clinicianPatientLists = PatientList.query.filter(PatientList.clinicianId == current_user_id).all()
    #     return {'PatientLists': [clinicianPatientList.to_dict() for clinicianPatientList in clinicianPatientLists]}
    current_user_id = current_user.get_id()
    # print('CURRENT USERID', current_user_id)
    user = User.query.get(current_user_id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    else:
        return jsonify(user.to_dict_with_patientLists())
    


@patient_list_routes.route('/', methods=['GET'])
@login_required
def get_all_patientLists():
    '''
    Query for all Patient Lists
    '''

    patientLists = PatientList.query.all()
    if patientLists:
        return {'patientLists': [patientList.to_dict() for patientList in patientLists]}
    else:
        return {'error': 'PatientLists not found'}, 404
        
@patient_list_routes.route('/<int:patientListId>', methods=['GET'])
@login_required
def get_patientList(patientListId):
    '''
    Query for a specific PatientList and return is as a dictionary
    '''

    patientList = PatientList.query.get(patientListId)
    print(patientList, "********patientList********")
    print(type(patientList), "********patientListTYPE********")
    if patientList:
        return patientList.to_dict()
    else:
        return {'error': 'PatientList not found'}, 404
        
    
@patient_list_routes.route('', methods=['POST'])
@login_required
def add_patientList():
    """
    Creates a new patient List entry in current clinician's patient Lists
    """
    form = PatientListForm()
    # print(form.data, "**********FORM*************")
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        clinicianId = data['clinicianId']
        
        patientLists = PatientList.query.filter(PatientList.clinicianId == clinicianId).all()

        # print(patientLists, "**********PATIENTLISTS**************")

        for patientList in patientLists:
            print("🚀 ~ file: patient_list_routes.py:150 ~ patientList:", patientList)
            if data["patientId"] == patientList.patientId:
                return {'errors': 'Patient is already assigned to this clinician\'s patient list'}, 400
            if data["email"] == patientList.email:
                return {'errors': 'Patient is already assigned to this clinician\'s patient list'}, 400


        #Create new patient list
        newPatientList = PatientList(
                                    clinicianId=data["clinicianId"],
                                    patientId=data["patientId"],
                                    email=data["email"],
                                    status=data["status"]
                                    )
        # print(newPatientList, "*******NEWPATIENTLIST******")
        db.session.add(newPatientList)
        db.session.commit()
        return newPatientList.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401