import { doc, getDoc, setDoc, updateDoc, getFirestore, Timestamp } from "firebase/firestore";

import { app } from "../firebase";

class TransactionModel  {
  constructor() {
    this.db = getFirestore(app);
  }

  async addDataTransaction(newValue, timestamp) {
    const date = timestamp.toDate(); // Convert to JavaScript Date object
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // JavaScript months are 0-indexed
    const day = date.getDate();
    const docRef = doc(
      this.db, 
      'years', `${year}`,'months', `${month}`, 'days', `${day}`
    );
    const now = Timestamp.now();
    // Step 1: Read the document
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Step 2: Manipulate the document data
      const data = docSnap.data();
      
      // Add newTransaction to transactions
      let transactions = data.transactions;
      
      if (Array.isArray(transactions)) {
        transactions.push({value: newValue, date:timestamp });
      } else {
        transactions = [{value: newValue, date:timestamp }];
      }
      
      // Calculate the average of values

      const averageValue = transactions.map((data) => data.value).reduce((a, b) => a + b, 0) / transactions.length;

      // Step 3: Write the document back
      await updateDoc(docRef, {
        averageValue: averageValue,
        transactions: transactions
      });
    } else {
      
      // Define a newValue in the 'days' subcollection
      const dayDoc = doc(this.db, 'years', `${year}`, 'months', `${month}`, 'days', `${day}`);
      await setDoc(dayDoc, { 
        averageValue: newValue,
        transactions: [{value: newValue, date:now }]
      });
    }
  }

  // async addDataToSubcollections(value, timestamp) {
  //   // Extract the year, month, and day from the timestamp
    
  //   const date = timestamp.toDate(); // Convert to JavaScript Date object
  //   const year = date.getFullYear();
  //   const month = date.getMonth() + 1; // JavaScript months are 0-indexed
  //   const day = date.getDate();
  //   const transactionId = `${timestamp.seconds}-${timestamp.nanoseconds}`;
    
  //   // Define a new document in the 'days' subcollection
  //   const transactionDoc = doc(this.db, 'years', `${year}`, 'months', `${month}`, 'days', `${day}`, 'transactions', `${transactionId}`);
    
  //   await setDoc(transactionDoc, { 
  //     date: timestamp, 
  //     value: value 
  //   });
  //   await this.addDataTransaction(value, timestamp);
  // }

}

export default TransactionModel;


