from flask import Blueprint, jsonify, session, request
from app.models import User, db, ExercisePrescription
from sqlalchemy import and_, or_
from .auth_routes import validation_errors_to_error_messages
from app.forms.create_exercise_rx_form import ExerciseRxForm
from flask_login import login_required, current_user

exercise_rx_routes = Blueprint('exercisePrescriptions', __name__)


@exercise_rx_routes.route('/<int:exercisePrescriptionId>', methods=['PUT'])
@login_required
def edit_curr_exercise_prescription(exercisePrescriptionId):
    """
    Edit an exercisePrescription 
    """
    # current_user_id = current_user.get_id()
    # print('CURRENT USERID', current_user_id)
    # #check if current_user is a clinician
    # curr_user_is_clinician = User.query.filter(
    #     and_(
    #         User.id == current_user_id
    #     )
    # ).filter(User.isClinician.is_(True)).first()

    form = ExerciseRxForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    #query the single exercisePrescription to edit
    exercisePrescription = ExercisePrescription.query.get(exercisePrescriptionId)
    # print ('_____exercisePrescription______', vars(exercisePrescription))

    # verify that exercisePrescription exists 
    if exercisePrescription is None:
        return jsonify({'message': 'Exercise Prescription not found'}), 404

    #check to make sure the user is authorized to change this exercisePrescription
    if (exercisePrescription.clinicianId) != int(session['_user_id']):
        return {'Error': 'User is not authorized'}

    if form.validate_on_submit():
        data = form.data
        print(data)
        clinicianId = data['clinicianId']
        # print(clinicianId, "**********clinicianId**************")
        exercisePrescriptions = ExercisePrescription.query.filter(
            and_(
                ExercisePrescription.clinicianId == clinicianId
            )
        ).all()
       
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

        return exercisePrescription.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@exercise_rx_routes.route('/<int:exercisePrescriptionId>', methods=['DELETE'])
@login_required
def delete_curr_exercise_rx(exercisePrescriptionId):
    """
    Deletes an exercisePrescription by Id for logged in user
    """
    exercisePrescription = ExercisePrescription.query.get(exercisePrescriptionId)
    userId = session['_user_id']

    if not exercisePrescription:
       return {'Error': 'Patient List not found'}

    if int(exercisePrescription.clinicianId) != int(userId):
        return {'Error': 'User is not authorized'}

    db.session.delete(exercisePrescription)
    db.session.commit()

    exercisePrescriptions = ExercisePrescription.query.filter(ExercisePrescription.clinicianId == userId)
   
    return {'exercisePrescription': [exercisePrescription.to_dict() for exercisePrescription in exercisePrescriptions]}



@exercise_rx_routes.route('/current', methods=['GET'])
@login_required
def get_current_exercise_prescriptions():
    """
    Query for all exercise prescriptions of current user
    """
    current_user_id = current_user.get_id()
    print('CURRENT USERID', current_user_id)
    user = User.query.get(current_user_id)

    #verify that user is logged in
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    else:
        exercise_prescriptions = ExercisePrescription.query.filter((ExercisePrescription.clinicianId == current_user_id) | (ExercisePrescription.patientId == current_user_id))
        return {'Exercise Prescriptions': [exercise_prescription.to_dict() for exercise_prescription in exercise_prescriptions]}



@exercise_rx_routes.route('/<int:exercisePrescriptionId>', methods=['GET'])
@login_required
def get_exercise_prescription(exercisePrescriptionId):
    '''
    Query for a specific exercise_prescription by Id
    '''

    exercise_prescription = ExercisePrescription.query.get(exercisePrescriptionId)
    print(exercise_prescription, "**********EX RX***********")
    if exercise_prescription is None:
        return jsonify({'error: Exercise Prescription not found'}), 404
    
    else:
        return jsonify(exercise_prescription.to_dict())
    

@exercise_rx_routes.route('', methods=['POST'])
@login_required
def add_exercise_prescriptions():
    """
    Creates a new exercise_prescription 
    """
    current_user_id = current_user.get_id()
    print('CURRENT USERID', current_user_id)
    #check if current_user is a clinician
    curr_user_is_clinician = User.query.filter(
        and_(
            User.id == current_user_id
        )
    ).filter(User.isClinician.is_(True)).first()

    form = ExerciseRxForm()
    # print(form.data, "**********FORM*************")
    form['csrf_token'].data = request.cookies['csrf_token']

    if curr_user_is_clinician and form.validate_on_submit():
        data = form.data
        clinicianId = data['clinicianId']
        patientId = data['patientId']
        print(clinicianId, "**********clinicianId**************")
        print(patientId, "**********patientId**************")
        exercise_prescriptions = ExercisePrescription.query.filter(
            and_(
                ExercisePrescription.clinicianId == clinicianId
            )
        ).all()

        # print(exercise_prescriptions, "**********exercise_prescriptionS**************")

        for exercisePrescription in exercise_prescriptions:
            if data["dailyFrequency"] <= 0:
                return {'errors': 'Daily frequency must be greater than 0.'}, 400
            if data["weeklyFrequency"] <= 0:
                return {'errors': 'Weekly frequency must be greater than 0.'}, 400


        #Create new exercise rx
        new_exercise_prescription = ExercisePrescription(
                                            patientId=data["patientId"],
                                            clinicianId=data["clinicianId"],
                                            title=data["title"],
                                            dailyFrequency=data["dailyFrequency"],
                                            weeklyFrequency=data["weeklyFrequency"],
                                            status=data["status"],
                                            )
        # print(new_exercisePrescription, "*******NEWEXRX******")
        db.session.add(new_exercise_prescription)
        db.session.commit()
        return new_exercise_prescription.to_dict()
    return {'Error': 'User must be a clinician to use this feature.'}, 401
