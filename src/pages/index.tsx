import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="fixed flex flex-col w-full h-full">
      <nav className="px-5 py-3 bg-blue-400">
        <h1 className="text-white font-bold tracking-widest">CodingDestro</h1>
      </nav>
      <Outlet />
    </div>
  );
};

export default Home;
