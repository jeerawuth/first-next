import { AuthProvider } from "./providers/authContext";
import MainNav from "./components/MainNav";
import SampleData from "./components/SampleData";
import GraphDaily from "./components/graphs/GraphDaily";
import AddSensorForm from "./components/forms/AddSensorForm";
import UserEditForm from "./components/forms/UserEditForm";
import RegisterForm from "./components/forms/RegisterForm";

export default function Home() {
  return (
    <div className="text-5xl flex col-auto justify-center text-red-500">
      <AuthProvider>
        <div className="container">
          <MainNav />
          <UserEditForm />
        </div>
      </AuthProvider>
    </div>
  )
}
