"use client"
import { useAuth } from '@/app/providers/authContext';

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <div>Welcome, {user.displayName}!</div>;
  } 
};

export default Profile;
