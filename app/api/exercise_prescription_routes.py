from flask import Blueprint, jsonify, session, request
from app.models import User, db, ExercisePrescription
from sqlalchemy import and_, or_
from .auth_routes import validation_errors_to_error_messages
from app.forms.create_exercise_rx_form import ExerciseRxForm
from flask_login import login_required, current_user

exercise_prescription_routes = Blueprint('exercisePrescriptions', __name__)


@exercise_prescription_routes.route('/<int:exercisePrescriptionId>', methods=['PUT'])
@login_required
def edit_curr_exercise_prescription(exercisePrescriptionId):
    """
    Edit an exercisePrescription 
    """
    print("**********IN EDIT EXRX ROUTE******************")
    form = ExerciseRxForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    #query the single exercisePrescription to edit
    exercisePrescription = ExercisePrescription.query.get(exercisePrescriptionId)
    
    # verify that exercisePrescription exists 
    if exercisePrescription is None:
        print("********************line 26")
        return jsonify({'message': 'Exercise Prescription not found'}), 404

    #check to make sure the user is authorized to change this exercisePrescription
    if (exercisePrescription.clinicianId) != int(session['_user_id']):
        return {'Error': 'User is not authorized'}

    if form.validate_on_submit():
        print("********************in EDIT EXRX form")
        data = form.data
        print("******FORM DATA FROM FRONTEND", data)
        # print(data)
        clinicianId = data['clinicianId']
        print(clinicianId, "**********clinicianId**************")
        exercisePrescriptions = ExercisePrescription.query.filter(ExercisePrescription.clinicianId == clinicianId).all()
        
        if 'patientId' in data:
            exercisePrescription.patientId = data["patientId"]
        if 'clinicianId' in data:
            exercisePrescription.clinicianId = data["clinicianId"]
        if 'title' in data:
            exercisePrescription.title = data["title"]
        if 'status' in data:
            exercisePrescription.status = data["status"]
        if 'dailyFrequency' in data:
            exercisePrescription.dailyFrequency = data["dailyFrequency"]
        if 'weeklyFrequency' in data:
            exercisePrescription.weeklyFrequency = data["weeklyFrequency"]

        db.session.commit()
        print("********************line 56 AFTER COMMIT")
        return exercisePrescription.to_dict()

    return {'Error': validation_errors_to_error_messages(form.errors)}, 401



@exercise_prescription_routes.route('/<int:exercisePrescriptionId>', methods=['DELETE'])
@login_required
def delete_curr_exercise_rx(exercisePrescriptionId):
    """
    Deletes an exercisePrescription by Id for logged in user
    """
    exercisePrescription = ExercisePrescription.query.get(exercisePrescriptionId)
    print("***********exercisePrescription", exercisePrescription)
    userId = session['_user_id']
    print("******USERID*****", userId)
    if not exercisePrescription:
       return {'Error': 'Exercise Prescription not found'}

    if int(exercisePrescription.clinicianId) != int(userId):
        return {'Error': 'User is not authorized'}

    db.session.delete(exercisePrescription)
    db.session.commit()

    exercisePrescriptions = ExercisePrescription.query.filter(ExercisePrescription.clinicianId == userId).all()
   
    return {'exercisePrescription': [exercisePrescription.to_dict_with_exercises() for exercisePrescription in exercisePrescriptions]}



@exercise_prescription_routes.route('/patient/<int:patientId>', methods=['GET'])
@login_required
def get_patient_exercise_prescriptions(patientId):
    """
    Query for all exercise prescriptions of current user's patient by patient ID
    """
    current_user_id = int(current_user.get_id())
    print('******line95********TYPE CURRENT USERID', type(current_user_id))
    patient = User.query.get(int(patientId))
    print('**************patientIdTYPE', type(patientId))
    print('*******LINE98*******patientId', patientId)

    #verify that user is logged in
    if current_user_id is None:
        print('**************line101')
        return {'error': 'User not found'}, 404
    
    else:
        print('**************line105')
        exercise_prescriptions = ExercisePrescription.query.filter((ExercisePrescription.clinicianId == current_user_id) & (ExercisePrescription.patientId == patient.id)).all()
        return {'exercisePrescriptions': [exercise_prescription.to_dict_with_exercises() for exercise_prescription in exercise_prescriptions]}
        


@exercise_prescription_routes.route('/current', methods=['GET'])
@login_required
def get_current_exercise_prescriptions():
    """
    Query for all exercise prescriptions of current user
    """
    current_user_id = int(current_user.get_id())
    print('**************TYPE CURRENT USERID', type(current_user_id))
    user = User.query.get(current_user_id)
    print('**************USERTYPE', type(user))

    #verify that user is logged in
    if user is None:
        print('**************line101')
        return {'error': 'User not found'}, 404
    
    else:
        print('**************line105')
        exercise_prescriptions = ExercisePrescription.query.filter((ExercisePrescription.clinicianId == current_user_id) | (ExercisePrescription.patientId == current_user_id)).all()
        print("**********LINE131 EXRX", exercise_prescriptions)
        # exercise_prescriptions = ExercisePrescription.query.filter(ExercisePrescription.clinicianId == current_user_id or ExercisePrescription.patientId == current_user_id).all()
        return {'exercisePrescriptions': [exercise_prescription.to_dict_with_exercises() for exercise_prescription in exercise_prescriptions]}
        # return jsonify(user.to_dict_with_exercisePrescriptions)


@exercise_prescription_routes.route('/<int:exercisePrescriptionId>', methods=['GET'])
@login_required
def get_exercise_prescription(exercisePrescriptionId):
    '''
    Query for a specific exercise_prescription by Id
    '''

    exercise_prescription = ExercisePrescription.query.get(int(exercisePrescriptionId))
    print(exercise_prescription, "**********EX RX***********")
    if not exercise_prescription:
        return {'error': 'Exercise Prescription not found'}, 404
    
    else:
        return jsonify(exercise_prescription.to_dict_with_exercises())
    

@exercise_prescription_routes.route('', methods=['POST'])
@login_required
def add_exercise_prescriptions():
    """
    Creates a new exercise_prescription 
    """
    form = ExerciseRxForm()
    # print(form.data, "**********FORM*************")
    form['csrf_token'].data = request.cookies['csrf_token']
    
    current_user_id = current_user.get_id()
    print('CURRENT USERID', current_user_id)
    #check if current_user is a clinician
    curr_user_is_clinician = User.query.filter(User.id == current_user_id).filter(User.isClinician.is_(True)).first()
    print("***********CURRUSERISCLINICIAN?*********", curr_user_is_clinician )

    

    # if curr_user_is_clinician and form.validate_on_submit():
    if form.validate_on_submit():
        data = form.data
        clinicianId = data['clinicianId']
        patientId = data['patientId']
        print(clinicianId, "**********CREATE EXRX clinicianId**************")
        print(patientId, "**********CREATE EXRX patientId**************")
        exercisePrescriptions = ExercisePrescription.query.filter(ExercisePrescription.clinicianId == clinicianId).all()
        print("*********CREATEEXRX, exPrescriptions", exercisePrescriptions)
        # print(exercise_prescriptions, "**********exercise_prescriptionS**************")

        for exercisePrescription in exercisePrescriptions:
            if int(data["dailyFrequency"]) <= 0:
                return {'errors': 'Daily frequency must be greater than 0.'}, 400
            if int(data["weeklyFrequency"]) <= 0:
                return {'errors': 'Weekly frequency must be greater than 0.'}, 400


        #Create new exercise rx
        newExercisePrescription = ExercisePrescription(
                                            patientId=data["patientId"],
                                            clinicianId=data["clinicianId"],
                                            title=data["title"],
                                            dailyFrequency=data["dailyFrequency"],
                                            weeklyFrequency=data["weeklyFrequency"],
                                            status=data["status"]
                                            )
        print(newExercisePrescription, "*******LN198 IN CREATE EXRX ROUTE--NEWEXRX******")
        db.session.add(newExercisePrescription)
        db.session.commit()
        return newExercisePrescription.to_dict_with_exercises()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

