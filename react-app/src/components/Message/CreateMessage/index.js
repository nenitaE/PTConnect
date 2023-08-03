import MessageForm from "../MessageForm";

const CreateMessageForm = () => {
  const message = {
    clinicianId: '', 
    patientId: '',
    senderIsClinician: '',
    body: ''
};
  

  return (
    <MessageForm message={message} formType="Send Message" />
  );
}

export default CreateMessageForm;