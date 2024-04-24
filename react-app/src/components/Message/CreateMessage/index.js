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
console.log("🚀 ~ CreateMessageForm ~ patientLists:", patientLists)
const currUserId = useSelector((state) => state.session.user?.id);
console.log("🚀 ~ ____Line 21CreateMessageForm ~ currUserId:", currUserId)
let currUserPatientLists = patientLists?.filter(patientList => patientList.patientId === currUserId | patientList.clinicianId === currUserId)
   console.log("🚀 ~ CreateMessageForm ~ currUserPatientLists:", currUserPatientLists)

// const clinicianId = useSelector(state => state.patientList.patientLists[0].clinicianId)
//    console.log("🚀 ~~~~~~~~ CreateMessageForm ~ clinicianId:", clinicianId)
   


  return (
    <MessageForm message={message} patientLists={patientLists} currUserPatientLists={currUserPatientLists} formType="Send a New Message" />
  );
}

export default CreateMessageForm;