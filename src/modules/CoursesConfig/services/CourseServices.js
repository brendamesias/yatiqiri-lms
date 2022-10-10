import { getStorage, ref, uploadBytes, list, getDownloadURL } from "firebase/storage";
import {db} from "../../../firebase"
import { addDoc, collection } from "firebase/firestore";
import { async } from "@firebase/util";

export const getImageCourseFromBD =  async(courseName) => {
    const storage = getStorage();
    const listRef = ref(storage, `courses/${courseName}`);
    const firstPage = await list(listRef, { maxResults: 100 });

    return Promise.all(
        firstPage.items.map(async(file) => {
            const reference = ref(storage, `${file.fullPath}`);
            const urlFile = await getDownloadURL(reference);
            return {
                uid: urlFile,
                name: file.name,
                status: 'done',
                url: urlFile
            };
        })
    ).then(file => (file));
}
