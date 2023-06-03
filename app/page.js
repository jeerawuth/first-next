import { AuthProvider } from "./providers/authContext";
import MainNav from "./components/MainNav";
import SampleData from "./components/SampleData";
import GraphDaily from "./components/GraphDaily";

export default function Home() {
  return (
    <div className="text-5xl flex col-auto justify-center text-red-500">
      <AuthProvider>
        <div className="container">
          <MainNav />
          <SampleData />
          <GraphDaily />
        </div>
      </AuthProvider>
    </div>
  )
}
