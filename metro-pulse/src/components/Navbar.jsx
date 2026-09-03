import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const navLinks = [
  { label: "All", to: "/" },
  { label: "News", to: "/news" },
  { label: "Sports", to: "/sports" },
  { label: "Travel", to: "/travel" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-slate-300 bg-[#ececec] px-2 py-2 shadow-sm sm:px-4 sm:py-3">
      <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-2 rounded-[20px] border border-slate-500 bg-white/90 px-3 py-2 sm:px-5">
        <NavLink to="/" className="flex min-w-0 items-center">
          <img
            src={logo}
            alt="MetroPulse logo"
            className="h-10 w-auto rounded sm:h-[60px]"
          />
        </NavLink>

        <nav className="hidden items-center justify-center gap-12 md:flex">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `text-base font-medium  text-[23px] transition ${
                  isActive
                    ? "text-blue-600 "
                    : "text-slate-600 hover:text-slate-900"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="flex min-w-0 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-500 sm:px-5">
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
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 sm:h-10 sm:w-10"
          >
            <svg
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

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {menuOpen ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav className="flex basis-full flex-col gap-2 border-t border-slate-200 pt-3 md:hidden">
            {navLinks.map(({ label, to }) => (
              <NavLink
                key={label}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-base font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;
