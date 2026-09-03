import React from "react";

const footerLinks = ["About Us", "Editorial Policy", "Contact", "Privacy"];

const socialLinks = [
  {
    label: "Website",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 014 9 15 15 0 01-4 9 15 15 0 01-4-9 15 15 0 014-9z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
      >
        <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
      >
        <path d="M4 7.5A2.5 2.5 0 016.5 5h11A2.5 2.5 0 0120 7.5v9A2.5 2.5 0 0117.5 19h-11A2.5 2.5 0 014 16.5v-9z" />
        <path d="M5 7l7 6 7-6" />
      </svg>
    ),
  },
];

function Footer() {
  return (
    <footer className="border-t border-slate-300 bg-[#f3f3f1]">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8 xl:px-10">
        <div className="flex min-w-0 flex-col gap-5">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <span
              className="inline-block h-px w-8 bg-slate-500 sm:w-9"
              aria-hidden="true"
            />
            <h3 className="text-[36px] font-semibold l  text-blue-700 sm:text-[3.2rem]">
              MetroPulse
            </h3>
          </div>

          <p className="max-w-[720px] text-base leading-relaxed text-slate-600 sm:text-[1.1rem] lg:text-[1.25rem]">
            Delivering insightful analysis and compelling stories from the heart
            of the modern metropolis.
          </p>

          <div className="flex items-center gap-3 text-slate-700 sm:gap-4">
            {socialLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white/80 transition hover:border-slate-500 hover:text-slate-900 sm:h-12 sm:w-12"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-col items-start gap-4 lg:items-end">
          <nav
            aria-label="Footer navigation"
            className="flex max-w-full flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-6 lg:flex-nowrap lg:gap-x-8"
          >
            {footerLinks.map((label) => (
              <a
                key={label}
                href="#"
                className="text-base text-slate-700 transition hover:text-slate-900 sm:text-xl"
              >
                {label}
              </a>
            ))}
          </nav>

          <p className="max-w-full text-left text-sm text-slate-600 sm:text-lg lg:text-right lg:text-xl">
            ©2024 MetroPulse Editorial Group. All rights .
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
