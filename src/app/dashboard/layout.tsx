
import { Navbar } from "./components/ui/Navbar";
import { Sidebar } from "./components/ui/Sidebar";

export default function Page({
  children,
}: {
  children: React.ReactNode
}) {


  return (<div className="flex flex-row w-auto h-auto">
    <Sidebar />
    <div className="flex flex-col grow">
      <Navbar />
      <div className="grow p-5">{children}</div>
    </div>
  </div>
  )
}
