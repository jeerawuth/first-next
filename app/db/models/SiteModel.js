import { doc, getDoc, setDoc, updateDoc, getFirestore } from "firebase/firestore";

import { app } from "../firebase";

class SiteModel  {
  constructor() {
    this.db = getFirestore(app);
  }

  async addSiteData(data, siteId) {
    const docRef = doc(
      this.db, 
      'sites', `${siteId}`
    );
    await setDoc(
        docRef, 
        { 
            siteName: data.siteName,
            siteAddress: data.siteAddress,
            sitePhones: data.sitePhones, // array of contact phone number
            siteOwner: data.siteOwner,
            siteNote: data.siteNote,  
            siteUsers: data.siteUsers   // array of user uid
        }
    );
  }
}

export default SiteModel;