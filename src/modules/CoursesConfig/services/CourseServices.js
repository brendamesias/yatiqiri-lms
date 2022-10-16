import { getStorage, ref, uploadBytes, list, getDownloadURL } from "firebase/storage";
import {db} from "../../../firebase"
import { addDoc, collection } from "firebase/firestore";

export const getImageCourseFromBD =  async(courseName) => {
    const storage = getStorage();
    const listRef = ref(storage, `courses/${courseName}`);
    const firstPage = await list(listRef, { maxResults: 100 });

    return Promise.all(
        firstPage.items.map(async(file) => {
            console.log("file", file);
            const reference = ref(storage, `${file.fullPath}`);
            const urlFile = await getDownloadURL(reference)
            console.log("urlFile",urlFile);
            return {
                uid: urlFile,
                name: file.name,
                status: 'done',
                url: urlFile
            };
        })
    ).then(file => (file));
}

export const uploadFileToCourse = async(courseName, doc) => {
    //specificar en el name, si es documento, o imagen por ejemplo: doc_test-hooks o img-hooks
    const storage = getStorage();
    console.log(doc)
    const storageRef = ref(storage, `courses/${courseName}/${doc.file.name}`);
    uploadBytes(storageRef, doc.file.originFileObj).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    });
}

export const createNewCourseInBD = async(courseInfo) => {
    const { uid } = JSON.parse(sessionStorage.getItem('user'));
    const docRef = await addDoc(collection(db,"users", uid, "courses"), courseInfo);
    console.log(docRef);  
}
