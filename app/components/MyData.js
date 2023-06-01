"use client"
import { useState, useEffect } from "react"
import { useAuth } from "../providers/authContext"
import UserModel from "../db/models/UserModel";
import Spinner from "./Spinner";
import { app } from "../db/firebase";

export default function MyData() {
    const { user, loading } = useAuth();    // มาจาก authContext
    const [isLoading, setIsLoading] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    
    useEffect( () => {
        const loadUserData = async () =>  {
            setIsLoading(true);
            if (user) {
              // User is signed in, get their profile data from Firestore
              const userInstance = new UserModel(app);
              const profileData = await userInstance.getUserByUID(user.uid);
              setUserProfile(profileData);
              setIsLoading(false)
            } else {
              // User is signed out, clear profile data
              setUserProfile(null);
              setIsLoading(false);
            }
        }
        loadUserData();
    }, [user]);

    if (loading || isLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Spinner />
        </div>  
      )
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {userProfile && (
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-2">Welcome, {userProfile.displayName}!</h1>
          <p className="text-gray-600">Email: {userProfile.email}</p>
          {/* Display other profile data as needed */}
        </div>
      )}
      {!user && (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <p className="text-gray-600">Please sign in to view your profile.</p>
        </div>
      )}
    </div>
  )
}
