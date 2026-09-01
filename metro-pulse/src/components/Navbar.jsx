import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const navLinks = [
  { label: "All", to: "/" },
  { label: "News", to: "/news" },
  { label: "Sports", to: "/sports" },
  { label: "Travel", to: "/travel" },
];

function Navbar() {
  return (
    <header className="w-full border-b border-slate-300 bg-[#f3f3f1] px-4 py-3 shadow-sm">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between  rounded-[50px] border border-slate-500 bg-white/90 px-5 py-2  ">
        <NavLink to="/" className="flex min-w-[220px] items-center">
          <img src={logo} alt="MetroPulse logo" className="h-[100px] w-auto " />
        </NavLink>

        <nav className="hidden items-center justify-center gap-8 md:flex">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `text-base font-medium transition ${
                  isActive
                    ? "text-slate-900"
                    : "text-slate-600 hover:text-slate-900"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500 shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="hidden text-sm text-slate-500 sm:inline">
              Search articles...
            </span>
          </div>

          <button
            type="button"
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12.79A9 9 0 0111.21 3a9 9 0 109.79 9.79z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
