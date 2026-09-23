import { Link } from "react-router";

const NavBar = () => {
  return (
    <div
      id="nav-bar"
      className="relative mx-auto mt-4 flex w-full max-w-7xl flex-col items-center gap-4 rounded-lg bg-slate-900  p-4 shadow-lg md:w-[calc(100%-2rem)] md:max-w-none md:flex-row md:gap-6 md:p-6 md:justify-between flex-wrap"
    >
      <div className="flex w-full flex-row justify-between items-center gap-4 md:flex-row md:items-center">
        <h1 className="text-center text-2xl font-bold text-blue-600 md:flex-1 md:text-left">
          <Link to="/" className="hover:text-blue-600 transition-all">
            NextUp
          </Link>
        </h1>
        <ul className="flex flex-wrap justify-center gap-6 md:gap-4  md:pt-0  md:pb-0">
          <li className="text-white">
            <Link to="/" className="hover:text-blue-600 transition-all ">
              Home
            </Link>
          </li>

          <li className="text-white">
            <Link to="/Saves" className="hover:text-blue-600 transition-all">
              Saves
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
