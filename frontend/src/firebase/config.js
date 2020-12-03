import firebase from "firebase";
import "firebase/storage";
import { v1 as uuidv1 } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  authDomain: "classyblog-react.firebaseapp.com",
  databaseURL: "https://classyblog-react.firebaseio.com",
  projectId: "classyblog-react",
  storageBucket: "classyblog-react.appspot.com",
  messagingSenderId: "1094420218395",
  appId: "1:1094420218395:web:64dab7d6eea500043aeebe",
  measurementId: "G-19BYW949QH",
};

// Initialize Firebase
const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const storage = firebaseApp.storage();

async function uploadImage(file) {
  const id = uuidv1();
  const uploadTask = storage.ref(`images/${file.name}-${id}`).put(file);
  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => console.log("image uploading", snapshot),
      reject,
      () => {
        storage
          .ref("images")
          .child(`${file.name}-${id}`)
          .getDownloadURL()
          .then(resolve);
      }
    );
  });
}

export { uploadImage };
