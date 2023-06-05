import { doc, getDoc, setDoc, updateDoc, getFirestore } from "firebase/firestore";

import { app } from "../firebase";

class SensorModel  {
  constructor() {
    this.db = getFirestore(app);
  }

  async addSensorData(data, siteId, machineId, portNumber, sensorId) {
    const docRef = doc(
      this.db, 
      'sites', `${siteId}`,'machines', `${machineId}`,'ports', `${portNumber}`
    );
    await setDoc(
        docRef, 
        { 
            sensorId: sensorId, 
            sensorName: data.sensorName,
            sensorPort: data.sensorPort,
            sensorType: data.sensorType,
            sensorUpperLimit: data.sensorUpperLimit,
            sensorLowerLimit: data.sensorLowerLimit,
            sensorReverse: data.sensorReverse
        }
    );
  }
}

export default SensorModel;