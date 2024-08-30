import Navbar from "./Navbar";

export default function Layout({ children }: any) {
  return (
    <div className=" ">
      <Navbar />
      <div className="pl-24 bg-slate-200 min-h-screen p-5">{children}</div>
    </div>
  );
}