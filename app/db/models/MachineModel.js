import { doc, getDoc, setDoc, updateDoc, getFirestore } from "firebase/firestore";

import { app } from "../firebase";

class MachineModel  {
  constructor() {
    this.db = getFirestore(app);
  }

  async addMachineData(data, siteId, machineId) {
    const docRef = doc(
      this.db, 
      'sites', `${siteId}`,'machines', `${machineId}`
    );
    await setDoc(
        docRef, 
        { 
            machineName: data.machineName,
            machineSerialNo: data.machineSerialNo,
            machineType: data.machineType,
            machineNote: data.machineNote
        }
    );
  }
}

export default MachineModel;