import FirebaseService from '../FirebaseService';

class UserModel extends FirebaseService {
  constructor(firebaseApp) {
    super(firebaseApp);
    this.collectionPath = 'users';
  }

  // Create a new user
  async createUser(data) {
    return super.createDocument(this.collectionPath, data);
  }

  // Create a new user with specific uid
  async createUserWithUid(data, uid) {
    return super.createDocumentWithId(this.collectionPath, data, uid);
  }

  // Get a user
  async getUser(documentId) {
    return super.getDocument(this.collectionPath, documentId);
  }
  
  async getUserByUID(uid) {
    return super.getDocumentByField(this.collectionPath, 'uid', '==', uid);
  }

  // Update a user
  async updateUser(documentId, data) {
    return super.updateDocument(this.collectionPath, documentId, data);
  }

  // Delete a user
  async deleteUser(documentId) {
    return super.deleteDocument(this.collectionPath, documentId);
  }

  // Get all users
  async getAllUsers() {
    return super.getAllDocuments(this.collectionPath);
  }

  // Get users by condition
  async getUsersByCondition(field, operator, value) {
    return super.getDocumentsByCondition(this.collectionPath, field, operator, value);
  }
}

export default UserModel;



// const user = new User(app);

// // Create a new user
// const newUserId = await user.createUser({ email: 'john.doe@example.com', displayName: 'John Doe' });

// // Get a user
// const userData = await user.getUser(newUserId);

// // Update a user
// await user.updateUser(newUserId, { displayName: 'John' });

// // Delete a user
// await user.deleteUser(newUserId);
