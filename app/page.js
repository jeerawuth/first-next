import { AuthProvider } from "./providers/authContext";
import MainNav from "./components/MainNav";
import MyData from "./components/MyData";

export default function Home() {
  return (
    <div className="text-5xl flex col-auto justify-center text-red-500">
      <AuthProvider>
        <div className="container">
          <MainNav />
          <MyData />
        </div>
      </AuthProvider>
    </div>
  )
}
