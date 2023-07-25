from flask import Blueprint, jsonify, session, request
from app.models import User, db, Message
from sqlalchemy import and_
from .auth_routes import validation_errors_to_error_messages
from app.forms.create_message_form import MessageForm
from flask_login import login_required, current_user

message_routes = Blueprint('messages', __name__)


@message_routes.route('/clinicians/<int:messageId>', methods=['DELETE'])
@login_required
def delete_curr_message(messageId):
    """
    Deletes a message by Id for logged in user
    """
    message = Message.query.get(messageId)
    userId = session['_user_id']
    # print('message', message)

    if not message:
       return {'Error': 'Message not found'}

    # if int(message.clinicianId) != int(userId):
    #     return {'Error': 'User is not authorized'}

    # print(session, "________DIR SESSION_______")
    db.session.delete(message)
    db.session.commit()

    messages = Message.query.filter(Message.clinicianId == userId)
    # print('_____________',userId,'----', messages, '________________')
    return {'Message': [message.to_dict() for message in messages]}


@message_routes.route('/current', methods=['GET'])
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

    # #check if current_user is a clinician
    # curr_user_is_clinician = User.query.filter(
    #     and_(
    #         User.id == current_user_id
    #     )
    # ).filter(User.isClinician.is_(True))

    # print(curr_user_is_clinician, "********CURRUSERISCLINICIAN**********")

    # #if current_user is not a clinician, return error msg
    # if curr_user_is_clinician is None:
    #     return jsonify({'message': 'Must be a registered clinician.'}), 404

    else:
        messages = Message.query.filter((Message.clinicianId == current_user_id) | (Message.patientId == current_user_id))
        return {'Messages': [message.to_dict() for message in messages]}



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
    print('CURRENT USERID', current_user_id)
    user = User.query.get(current_user_id)

    #verify that user is logged in
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    
    form = MessageForm()
    # print(form.data, "**********FORM*************")
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        clinicianId = data['clinicianId']
        patientId = data['patientId']
        
        messages = Message.query.filter((Message.clinicianId == current_user_id) | (Message.patientId == current_user_id))

        # print(messages, "**********MessageS**************")

        #Create new message
        newMessage = Message(
                            clinicianId=data["clinicianId"],
                            patientId=data["patientId"],
                            senderIsClinician=data["senderIsClinician"],
                            body=data["body"]
                            )
        # print(newMessage, "*******NEWMessage******")
        db.session.add(newMessage)
        db.session.commit()
        return newMessage.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401