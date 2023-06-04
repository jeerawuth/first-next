"use client"
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { app } from '@/app/db/firebase';
import { auth } from '@/app/db/firebase';
import Spinner from '../Spinner';
import UserModel from '@/app/db/models/UserModel';

const RegisterForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setError(null); // reset the error when closing the modal
  };

  const splitNameFromEmail = (email) => {
    var atPosition = email.indexOf("@");
    if (atPosition === -1) {
        throw new Error("Invalid email format");
    }
    var name = email.substring(0, atPosition);
    return name;
  }
  function isValidEmail(email) {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }
  const validateForm = () => {
    if (!email || !password) {
      return 'Both fields are required';
    } else if (!isValidEmail(email)) { 
      return 'Invalid email';
    } else if (password.length < 8) {
      return 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    } else if (!/[!@#$%^&*]/.test(password)) {
      return 'Password must contain at least one special character';
    }
    return null;
  };

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) {
      setError(error);
    } else {
      setIsLoading(true);
      setError('');
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // check displayName if empty use first path of email
        const currentDisplayName = displayName.trim().length !== 0 ? displayName:  `${splitNameFromEmail(email)}`;
        await updateProfile(user, { displayName: currentDisplayName });
        // Store additional profile data in Firestore
        const userObj = new UserModel(app);
        await userObj.createUserWithUid({
          uid: user.uid,
          email: user.email,
          displayName: currentDisplayName,
        }, user.uid);
        setIsOpen(false);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleOpen}>Register</button>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={handleClose}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Register</h3>
                {error && <p className="text-red-500">{error}</p>}
                { !isLoading && (
                <div className="mt-2">
                  <input 
                    className="mt-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="displayname" 
                    type="text" 
                    placeholder="Display Name"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                  />
                  <input 
                    className="mt-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email" 
                    type="text" 
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <input 
                    className="mt-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="password" 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                )}
                { isLoading && <Spinner /> }
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSubmit}
                >
                  Register
                </button>
                <button 
                  type="button" 
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" 
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
