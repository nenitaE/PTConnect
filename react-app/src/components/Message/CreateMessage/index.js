import { useEffect } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { getAllPatientLists } from "../../../store/patientList"
import MessageForm from "../MessageForm";

const CreateMessageForm = () => {
  const dispatch = useDispatch();
  const message = {
    clinicianId: '', 
    patientId: '',
    senderIsClinician: '',
    body: ''
};
useEffect(() => {
  dispatch(getAllPatientLists())
}, [dispatch])

let patientLists = useSelector(state => state.patientList.patientLists);
const currUserId = useSelector((state) => state.session.user?.id);
let currUserPatientLists = patientLists?.filter(patientList => patientList.patientId === currUserId | patientList.clinicianId === currUserId)
   console.log("🚀 ~ CreateMessageForm ~ currUserPatientLists:", currUserPatientLists)

const clinicianId = currUserPatientLists?.clinicianId
   
  

  return (
    <MessageForm message={message} patientLists={patientLists} currUserPatientLists={currUserPatientLists} clinicianId={clinicianId} formType="Send a New Message" />
  );
}

export default CreateMessageForm;