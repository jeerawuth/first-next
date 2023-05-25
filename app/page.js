import nextConfig from "@/next.config";

export default function Home() {
  console.log(nextConfig.env.ACCESS_TOKEN);
  return (
    <div className="text-5xl flex col-auto justify-center">
      <div>Home Page</div>
    </div>
  )
}
