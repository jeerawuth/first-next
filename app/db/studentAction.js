import db from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export const createDocument = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "your-collection"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export const readDocuments = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "your-collection"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => `, doc.data());
    });
  } catch (error) {
    console.error("Error reading documents: ", error);
  }
}

export const updateDocument = async (docId, data) => {
  try {
    const docRef = doc(db, "your-collection", docId);
    await updateDoc(docRef, data);
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

export const deleteDocument = async (docId) => {
  try {
    const docRef = doc(db, "your-collection", docId);
    await deleteDoc(docRef);
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error removing document: ", error);
  }
}
