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
    Edit an exercise 
    """

    form = ExerciseForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    userId = session['_user_id']
    #query the single exercise to edit
    exercise = Exercise.query.get(exerciseId)
    print(exercise, "EXERCISE**************************")
    # verify that exercise exists 
    if exercise is None:
        return {'message': 'Exercise not found'}, 404

    print(exercise.exercisePrescriptionId, "exercise.exercisePrescriptionId**************************")
    exercise_prescription = ExercisePrescription.query.get(exercise.exercisePrescriptionId)
    print(exercise_prescription, "EXERCISEPRESCRIPTION**************************")
    
    clinicianId = exercise_prescription.clinicianId
    # print(clinicianId, "CLINICIANID**************************")
    if (clinicianId) != (int(userId)):
        return {'Error': 'User is not authorized'}

    if form.validate_on_submit():
        data = form.data
        exercisePrescriptionId = data['exercisePrescriptionId']
        exercises = Exercise.query.filter(Exercise.exercisePrescriptionId == exercisePrescriptionId).all()

        for exercise in exercises:
            if data["sets"] <= 0:
                return {'errors': 'Sets must be greater than 0.'}, 400
            if data["reps"] <= 0:
                return {'errors': 'Reps frequency must be greater than 0.'}, 400

        #Edit exercise
        if 'exercisePrescriptionId' in data:
            exercise.exercisePrescriptionId = data["exercisePrescriptionId"]
        if "name" in data:
            exercise.name = data["name"]
        if "exerciseData" in data:
            exercise.exerciseData = data["exerciseData"]
        if "images" in data:
            exercise.images = data["images"]
        if "sets" in data:
            exercise.sets = data["sets"]
        if "reps" in data:
            exercise.reps = data["reps"]
        if "notes" in data:
            exercise.notes = data["notes"]
        if "holdTime" in data:
            exercise.holdTime = data["holdTime"]
        
        db.session.commit()
        return exercise.to_dict()
    return {'Error': 'Bad Data.'}, 401


@exercise_routes.route('/<int:exerciseId>', methods=['DELETE'])
@login_required
def delete_curr_exercise(exerciseId):
    """
    Deletes an exercise by Id for logged in user
    """
    exercise = Exercise.query.get(exerciseId)
    print(exercise, "****************exercise***************")
    userId = session['_user_id']

    if not exercise:
       return {'Error': 'Exercise not found'}

    # exercise_prescription = ExercisePrescription.query.filter(ExercisePrescription.id == exercise.exercisePrescriptionId).first()
    exercise_prescription = ExercisePrescription.query.get(exercise.exercisePrescriptionId)
    
    clinicianId = exercise_prescription.clinicianId
    print(clinicianId, "*********CLINICIAN ID********")
    print(type(clinicianId), "**************type")
    if (clinicianId) != (int(userId)):
        return {'Error': 'User is not authorized'}

    db.session.delete(exercise)
    db.session.commit()

    exercise_prescriptions = ExercisePrescription.query.filter(ExercisePrescription.clinicianId == userId).all()
   
    return {'Exercise Prescriptions': [exercise_prescription.to_dict_with_exercises() for exercise_prescription in exercise_prescriptions]}


@exercise_routes.route('/current', methods=['GET'])
@login_required
def get_current_exercises():
    """
    Query for all exercises of current user
    """
    userId = session['_user_id']
    exercise_prescriptions = ExercisePrescription.query.filter(
            and_(
                ExercisePrescription.clinicianId == userId
            )
        ).all()
    
    #verify that user is logged in
    if exercise_prescriptions is None:
        return {'error': 'Exercise not found'}, 404

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
    print(type(exercise), "**********EXERCISE***********")
    if exercise is None:
        return {'errors': 'Exercise not found.'}, 404
    
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
