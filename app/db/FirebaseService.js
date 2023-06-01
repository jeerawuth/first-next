import { 
  getFirestore, doc, getDoc, addDoc, updateDoc, deleteDoc, collection, getDocs, query, where 
} from 'firebase/firestore';

class FirebaseService {
  constructor(firebaseApp) {
    this.db = getFirestore(firebaseApp);
  }

  // Create a new document
  async createDocument(collectionPath, data) {
    const docRef = await addDoc(collection(this.db, collectionPath), data);
    return docRef.id;
  }

  // Get a single document
  async getDocument(collectionPath, documentId) {
    const docRef = doc(this.db, collectionPath, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error(`No document exists at the path: ${collectionPath}/${documentId}`);
    }
  }

  // Update a document
  async updateDocument(collectionPath, documentId, data) {
    const docRef = doc(this.db, collectionPath, documentId);
    await updateDoc(docRef, data);
  }

  // Delete a document
  async deleteDocument(collectionPath, documentId) {
    const docRef = doc(this.db, collectionPath, documentId);
    await deleteDoc(docRef);
  }

  // Get all documents from a collection
  async getAllDocuments(collectionPath) {
    const querySnapshot = await getDocs(collection(this.db, collectionPath));
    const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return documents;
  }

  // Get documents by condition
  async getDocumentsByCondition(collectionPath, field, operator, value) {
    const q = query(collection(this.db, collectionPath), where(field, operator, value));
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return documents;
  }
}

export default FirebaseService;
