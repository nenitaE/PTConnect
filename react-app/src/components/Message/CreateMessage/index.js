import { useEffect } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { getPatientLists, getAllPatientLists } from "../../../store/patientList"
import MessageForm from "../MessageForm";

const CreateMessageForm = () => {
  const dispatch = useDispatch();
  const message = {
    clinicianId: '', 
    patientId: '',
    senderIsClinician: '',
    body: ''
};
console.log(message, "+++++++++MESSAGE data from CreateMessageForm line 14")
useEffect(() => {
  dispatch(getAllPatientLists())
}, [dispatch])

let patientLists = useSelector(state => state.patientList.patientLists);
const currUserId = useSelector((state) => state.session.user?.id);
let currUserPatientLists = patientLists?.filter(patientList => patientList.patientId === currUserId | patientList.clinicianId === currUserId)
// const clinicianId = useSelector(state => state.patientList.patientLists[0].clinicianId)
   


  return (
    <MessageForm message={message} patientLists={patientLists} currUserPatientLists={currUserPatientLists} formType="Send a New Message" />
  );
}

export default CreateMessageForm;