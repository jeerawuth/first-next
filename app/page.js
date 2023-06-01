import { AuthProvider } from "./providers/authContext";
import Profile from "./components/Profile";
import MainNav from "./components/MainNav";

export default function Home() {
  return (
    <div className="text-5xl flex col-auto justify-center text-red-500">
      <AuthProvider>
        <div className="flex flex-col">
          <MainNav />
          <Profile />
        </div>
      </AuthProvider>
    </div>
  )
}
