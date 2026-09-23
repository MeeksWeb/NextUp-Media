import { Link } from "react-router";

const NavBar = () => {
  return (
    <div
      id="nav-bar"
      className="fixed top-4 left-1/2 z-10 flex w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 flex-col items-center gap-4 rounded-lg bg-slate-900 p-4 shadow-lg md:flex-row md:flex-wrap md:justify-between md:gap-6 md:p-6"
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
