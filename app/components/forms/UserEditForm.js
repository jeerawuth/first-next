"use client"
import { useState, useEffect } from 'react';
import { app } from '@/app/db/firebase';
import UserModel from '@/app/db/models/UserModel';
import { useAuth } from '@/app/providers/authContext';

const userObj = new UserModel(app);

function UserEditForm() {
  const { user, loading } = useAuth();
  const [uid, setUid] = useState(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [userType, setUserType] = useState('');
  const [phones, setPhones] = useState([]);
  const [newPhone, setNewPhone] = useState('');
  const userTypes = ['user', 'powerUser', 'manager', 'admin'];

  useEffect(() => {
    const fetchUser = async () => {
      if(isValidEmail(email)) {
        setMessage('');
        setDisplayName('');
        setUserType('');
        setPhones([]);
        setUid(null);
        const userDocs = await userObj.getUsersByCondition('email', '==', email);
        if(userDocs[0]) {
          console.log(userDocs[0]);
          setDisplayName(userDocs[0].displayName);
          setUserType(userDocs[0].userType || 'user');
          setPhones(userDocs[0].phones || []);
          setUid(userDocs[0].uid);
        }
      }
    };
    fetchUser()
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await userObj.updateUser(uid, { displayName, userType, phones });
    setMessage('User updated successfully');
    setEmail('');
    setDisplayName('');
    setUserType('');
    setPhones([]);
    setUid(null);
  };

  const handleAddPhone = (e) => {
    e.preventDefault();
    setPhones([...phones, newPhone]);
    setNewPhone('');
  };

  const handleRemovePhone = (phone) => {
    setPhones(phones.filter(item => item !== phone));
  };

  function isValidEmail(email) {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }
  if (!user) {
    return <div>Please login!</div>
  }

  return (
  <div className="flex flex-col items-center px-4 sm:px-0 text-sm">
    {message && <div>{message}</div>}
    <form onSubmit={handleSubmit} className="w-full sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
    {/* <form onSubmit={handleSubmit} className="w-full sm:max-w-sm"> */}
      <div className="flex flex-col sm:flex-row sm:items-center mb-6">
        <div className="w-full sm:w-1/3 mb-2 sm:mb-0">
          <label className="block text-gray-500 font-bold sm:text-right mb-1 sm:mb-0 pr-4" htmlFor="email">
            Email
          </label>
        </div>
        <div className="w-full sm:w-2/3">
          <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="email" 
          type="email" placeholder="Email" 
          value={email} onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center mb-6">
        <div className="w-full sm:w-1/3 mb-2 sm:mb-0">
          <label className="block text-gray-500 font-bold sm:text-right mb-1 sm:mb-0 pr-4" htmlFor="displayName">
            Display Name
          </label>
        </div>
        <div className="w-full sm:w-2/3">
          <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
          id="displayName" type="text" placeholder="Display name" value={displayName} 
          onChange={(e) => setDisplayName(e.target.value)} 
          disabled={!uid}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center mb-6">
        <div className="w-full sm:w-1/3 mb-2 sm:mb-0">
          <label className="block text-gray-500 font-bold sm:text-right mb-1 sm:mb-0 pr-4" htmlFor="userType">
            User Type
          </label>
        </div>
        <div className="w-full sm:w-2/3">
          <div className="relative">
            <select required className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
              {userTypes.map((type, index) => (
                <option value={type} key={index} disabled={!uid} >{type}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M14.7 9.3l-5-5c-.4-.4-1-.4-1.4 0l-5 5c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0L8 6.42l4.3 4.3c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.42z"/></svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center">
        <div className="w-full sm:w-1/3"></div>
        <div className="w-full sm:w-2/3">
          <button className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit" disabled={!uid}>
            Update User
          </button>
        </div>
      </div>
    </form>
    <form onSubmit={handleAddPhone} className="w-full sm:align-middle sm:max-w-lg sm:w-full">
      <div className="flex flex-col sm:flex-row sm:items-center mb-6">
        <div className="w-full sm:w-1/3 mb-2 sm:mb-0">
          <label className="block text-gray-500 font-bold sm:text-right mb-1 sm:mb-0 pr-4" htmlFor="newPhone">
            New Phone
          </label>
        </div>
        <div className="w-full sm:w-2/3 flex sm:justify-between">
          <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full sm:w-auto py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mb-2 sm:mb-0 sm:mr-2" id="newPhone" type="tel" placeholder="Phone number" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} disabled={!uid} />
          <button className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full sm:w-auto" type="submit" disabled={!uid}>
            Add Phone
          </button>
        </div>
      </div>
      <div className="w-full sm:my-1 sm:align-middle sm:max-w-lg sm:w-full">
        <hr />
      </div>
    </form>
    {Array.isArray(phones) && phones.map((phone, index) => {
      return (
      <div key={index} className="flex items-center justify-between py-1 w-full sm:my-1 sm:align-right sm:max-w-lg sm:w-full">
        <div className="w-full sm:w-1/3"></div>
        <div className="w-full sm:w-1/3 mb-2 sm:mb-0"><p className="text-gray-800">{phone}</p></div>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={() => handleRemovePhone(phone)}>
          Remove
        </button>
      </div>
    )})}
  </div>
  );
}

export default UserEditForm;
