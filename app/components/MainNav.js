"use client"
import { useAuth } from '@/app/providers/authContext';
import Spinner from './Spinner';
import { logOut } from '@/app/auth/action';
import NewLoginForm from './forms/LoginForm';
import RegisterForm from './forms/RegisterForm';

const MainNav = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div><Spinner /></div>;
  }

    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">My Website</span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          { !user && (
          <div className="text-sm lg:flex-grow">
            <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            <RegisterForm />
            </div>
            <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            <NewLoginForm />
            </div>
          </div>
          )}
          {user && (
          <div className="text-sm lg:flex-grow">
            <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                <button onClick={() => logOut()}>Logout</button>
            </div>
          </div>
          )}
        </div>
      </nav>
    );

};

export default MainNav;
