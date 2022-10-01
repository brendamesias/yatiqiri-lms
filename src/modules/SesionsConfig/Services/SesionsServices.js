import { getStorage, ref, uploadBytes } from "firebase/storage";
import {db} from "../../../firebase"
import { addDoc, collection } from "firebase/firestore";


export const uploadFileToSesion = async(courseName, sessionName, doc) => {
    //specificar en el name, si es documento, o imagen por ejemplo: doc_test-hooks o img-hooks
    const storage = getStorage();
    console.log(doc)
    const storageRef = ref(storage, `courses/${courseName}/${sessionName}/${doc.file.name}`);
    uploadBytes(storageRef, doc.file.originFileObj).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    });
}

export const createNewSessionInBD = async(courseId, sessionInfo) => {
    const docRef = await addDoc(collection(db, "courses", courseId, "sessions"), sessionInfo);
    console.log(docRef);  
}