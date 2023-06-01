"use client"
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../db/firebase';
import User from '../db/models/UserModel';
import Spinner from './Spinner';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
      const userInstance = new User(app);
      if (firebaseUser) {
        // User is signed in, get their profile data from Firestore
        const profileData = await userInstance.getUserByUID(firebaseUser.uid);
        setUserProfile(profileData);
        setIsLoading(false)
      } else {
        // User is signed out, clear profile data
        setUserProfile(null);
        setIsLoading(false);
      }
    });

    // Cleanup function to unsubscribe from the auth state listener when the component is unmounted
    return () => unsubscribe();
  }, [auth]);
  if(isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {userProfile ? (
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-2">Welcome, {userProfile.displayName}!</h1>
          <p className="text-gray-600">Email: {userProfile.email}</p>
          {/* Display other profile data as needed */}
        </div>
      ) : (
        <p className="text-gray-600">Please sign in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
