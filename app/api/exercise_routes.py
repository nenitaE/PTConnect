from flask import Blueprint, jsonify, session, request
from app.models import User, db, Exercise, ExercisePrescription
from sqlalchemy import and_, or_
from .auth_routes import validation_errors_to_error_messages
from app.forms.create_exercise_form import ExerciseForm
from flask_login import login_required, current_user

exercise_routes = Blueprint('exercises', __name__)

@exercise_routes.route('/<int:exerciseId>', methods=['PUT'])
@login_required
def edit_curr_exercise(exerciseId):
    """
    Edit an exercisePrescription 
    """

    form = ExerciseForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    #query the single exercisePrescription to edit
    exercisePrescription = ExercisePrescription.query.get(exerciseId)
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



@exercise_routes.route('/<int:exerciseId>', methods=['DELETE'])
@login_required
def delete_curr_exercise_rx(exerciseId):
    """
    Deletes an exercisePrescription by Id for logged in user
    """
    exercisePrescription = ExercisePrescription.query.get(exerciseId)
    userId = session['_user_id']

    if not exercisePrescription:
       return {'Error': 'Patient List not found'}

    if int(exercisePrescription.clinicianId) != int(userId):
        return {'Error': 'User is not authorized'}

    db.session.delete(exercisePrescription)
    db.session.commit()

    exercisePrescriptions = ExercisePrescription.query.filter(ExercisePrescription.clinicianId == userId).all()
   
    return {'exercisePrescription': [exercisePrescription.to_dict() for exercisePrescription in exercisePrescriptions]}




@exercise_routes.route('/current', methods=['GET'])
@login_required
def get_current_exercises():
    """
    Query for all exercises of current user
    """
    userId = session['_user_id']
    print(userId, "**********userID*************")
    print(type(userId), "**********userIDTYPE*************")
    exercise_prescriptions = ExercisePrescription.query.filter(
            and_(
                ExercisePrescription.clinicianId == userId
            )
        ).all()
    
    #verify that user is logged in
    if exercise_prescriptions is None:
        return jsonify({'error': 'Exercise not found'}), 404

    else:
        return {'Exercise Prescriptions': [exercise_prescription.to_dict_with_exercises() for exercise_prescription in exercise_prescriptions]}
        # return jsonify(exercisePrescription.to_dict_with_exercises())


@exercise_routes.route('/<int:exerciseId>', methods=['GET'])
@login_required
def get_exercise(exerciseId):
    '''
    Query for a specific exercise by Id
    '''

    exercise = Exercise.query.get(exerciseId)
    print(exercise, "**********EXERCISE***********")
    if exercise is None:
        return jsonify({'error: Exercise not found'}), 404
    
    else:
        return jsonify(exercise.to_dict())
    
@exercise_routes.route('', methods=['POST'])
@login_required
def add_exercises():
    """
    Creates a new exercise
    """
    current_user_id = current_user.get_id()
    # print('CURRENT USERID*******************', current_user_id)
    #check if current_user is a clinician
    curr_user_is_clinician = User.query.filter(
        and_(
            User.id == current_user_id
        )
    ).filter(User.isClinician.is_(True)).first()
    # print(curr_user_is_clinician, "***********CURRUSERISCLINICIAN?*********")
    form = ExerciseForm()
    
    form['csrf_token'].data = request.cookies['csrf_token']

    # if form.validate_on_submit():
    if curr_user_is_clinician and form.validate_on_submit():
        data = form.data
        exercisePrescriptionId = data['exercisePrescriptionId']
        exercises = Exercise.query.filter(Exercise.exercisePrescriptionId == exercisePrescriptionId).all()

        for exercise in exercises:
            if data["sets"] <= 0:
                return {'errors': 'Sets must be greater than 0.'}, 400
            if data["reps"] <= 0:
                return {'errors': 'Reps frequency must be greater than 0.'}, 400


        #Create new exercise
        new_exercise = Exercise(
                            exercisePrescriptionId=data["exercisePrescriptionId"],
                            name=data["name"],
                            exerciseData=data["exerciseData"],
                            images=data["images"],
                            sets=data["sets"],
                            reps=data["reps"],
                            notes=data["notes"],
                            holdTime=data["holdTime"],
                            )
        
        db.session.add(new_exercise)
        db.session.commit()
        return new_exercise.to_dict()
    return {'Error': 'Bad Data.'}, 401
