from flask import Blueprint, jsonify, session, request
from app.models import User, db, Message
from sqlalchemy import and_, desc
from .auth_routes import validation_errors_to_error_messages
from app.forms.create_message_form import MessageForm
from flask_login import login_required, current_user

message_routes = Blueprint('messages', __name__)


@message_routes.route('/<int:messageId>', methods=['DELETE'])
@login_required
def delete_curr_message(messageId):
    """
    Deletes a message by Id for logged in user
    """
    current_user_id = session['_user_id']
    print('CURRENT USERID', current_user_id)
    user = User.query.get(current_user_id)

    #verify that user is logged in
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    
    message = Message.query.get(messageId)
    userId = session['_user_id']
    print('message**************', message)
    print('userId**************', userId)

    #verify that message exists
    if not message:
       return {'error': 'Message not found'}
    
    #check if current_user is a clinician
    curr_user_is_clinician = User.query.filter(
        and_(
            User.id == current_user_id
        )
    ).filter(User.isClinician.is_(True)).first()

    print(curr_user_is_clinician, "********CURRUSERISCLINICIAN**********")

    #check if senderIsClinician
    senderIsClinician = message.senderIsClinician
    print(senderIsClinician, "********SENDER IS CLINICIAN**********")


    #delete if current user is recipient of message
    if not curr_user_is_clinician and senderIsClinician:
        db.session.delete(message)
        db.session.commit()

        messages = Message.query.filter(Message.clinicianId == userId).all()
        # print('_____________',userId,'----', messages, '________________')
        return {'message': [message.to_dict() for message in messages]}
    
    if curr_user_is_clinician and not senderIsClinician:
        db.session.delete(message)
        db.session.commit()

        messages = Message.query.filter(Message.clinicianId == userId)
        # print('_____________',userId,'----', messages, '________________')
        return {'message': [message.to_dict() for message in messages]}
    
    else:
        return jsonify({'message': 'User not authorized.'}), 404

    # #if current_user is a clinician, allow them to delete messages received
    # if ((curr_user_is_clinician) and (int(message.clinicianId) != int(userId))):
    #     return jsonify({'message': 'Clinician not authorized.'}), 404
    # if curr_user_is_clinician & ((message.senderIsClinician) != True):
    #     db.session.delete(message)
    #     db.session.commit()

    #     messages = Message.query.filter(Message.clinicianId == userId)
    #     # print('_____________',userId,'----', messages, '________________')
    #     return {'Message': [message.to_dict() for message in messages]}

    # #if current_user is a patient, allow them to delete messages received
    # if ((not curr_user_is_clinician) and (int(message.patientId) != int(userId))):
    #     return jsonify({'message': 'Patient not authorized.'}), 404
    
    # if not curr_user_is_clinician & ((message.senderIsClinician) is True):
    #     db.session.delete(message)
    #     db.session.commit()

    #     messages = Message.query.filter(Message.patientId == userId)
    #     # print('_____________',userId,'----', messages, '________________')
    #     return {'Message': [message.to_dict() for message in messages]}




@message_routes.route('/current', methods=['GET'])
@login_required
def get_current_messages():
    """
    Query for all messages of current user
    """
    current_user_id = current_user.get_id()
    print('CURRENT USERID', current_user_id)
    user = User.query.get(current_user_id)

    #verify that user is logged in
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    else:
        messages = Message.query.filter((Message.clinicianId == current_user_id) | (Message.patientId == current_user_id)).order_by(Message.created_at.desc()).all()
        return {'messages': [message.to_dict() for message in messages]}



@message_routes.route('/<int:messageId>', methods=['GET'])
@login_required
def get_message(messageId):
    '''
    Query for a specific message
    '''

    message = Message.query.get(messageId)
    if message is None:
        return jsonify({'error: Message not found'}), 404
    else:
        return jsonify(message.to_dict())
    

    
@message_routes.route('', methods=['POST'])
@login_required
def add_message():
    """
    Creates a new Message 
    """
    current_user_id = current_user.get_id()
    print('**************New Message CURRENT USERID', current_user_id)
   
    form = MessageForm()
    print(form.data, "**********FORM DATA*************")
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        clinicianId = data['clinicianId']
        patientId = data['patientId']
        
        messages = Message.query.filter((Message.clinicianId == current_user_id) | (Message.patientId == current_user_id))

        print(messages, "**********MessageS--inside form**************")

        #Create new message
        new_message = Message(
                            clinicianId=data["clinicianId"],
                            patientId=data["patientId"],
                            body=data["body"],
                            senderIsClinician=data["senderIsClinician"]
                            )
        print(new_message, "*******NEWMessage******")
        db.session.add(new_message)
        db.session.commit()
        return new_message.to_dict()
    return {'Error': validation_errors_to_error_messages(form.errors)}, 401