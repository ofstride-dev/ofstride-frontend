import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { siteContent } from "../data/siteContent";
import hrImage from "../assets/img/service/service-01.png";
import financeImage from "../assets/img/service/service-02.png";
import legalImage from "../assets/img/service/service-03.png";
import itImage from "../assets/img/service/service-04.png";

const serviceMenu = [
  {
    title: "HR Consulting",
    href: "/hr-consulting",
    description: "Hiring, people ops, and workforce enablement.",
    image: hrImage,
  },
  {
    title: "Financial Consulting",
    href: "/financial-consulting",
    description: "Planning, compliance, and financial clarity.",
    image: financeImage,
  },
  {
    title: "Legal Consulting",
    href: "/legal-consulting",
    description: "Contracts, compliance, and risk guidance.",
    image: legalImage,
  },
  {
    title: "IT Consulting",
    href: "/it-consulting",
    description: "AI, cloud modernization, and security.",
    image: itImage,
  },
];

const inquireMenu = [
  {
    title: "Consulting inquiry",
    href: "/contact",
    description: "General consultation or advisory request.",
    image: itImage,
  },
  {
    title: "Hire through Ofstride",
    href: "/hire-through-ofstride",
    description: "Submit role requirements for hiring support.",
    image: hrImage,
  },
  {
    title: "Apply for jobs",
    href: "/apply-for-jobs",
    description: "Upload your profile for open roles.",
    image: legalImage,
  },
];

export function Header() {
  const [openMenu, setOpenMenu] = useState<"services" | "inquire" | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const cancelClose = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimeoutRef.current = window.setTimeout(() => setOpenMenu(null), 140);
  };

  const closeMenu = () => {
    cancelClose();
    setOpenMenu(null);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container-page flex items-center justify-between py-4">
        <NavLink to="/" className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-soft">
          <img src={siteContent.brand.logo} alt={siteContent.brand.name} className="h-9" />
        </NavLink>
        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition hover:text-slate-900 ${isActive ? "text-slate-900" : "text-slate-600"}`
            }
          >
            Home
          </NavLink>
          <div
            className="relative"
            onMouseEnter={() => {
              cancelClose();
              setOpenMenu("services");
            }}
            onMouseLeave={scheduleClose}
            onFocus={() => setOpenMenu("services")}
            onBlur={scheduleClose}
          >
            <button type="button" className="cursor-pointer transition hover:text-slate-900">
              Services
            </button>
            <div
              className={`absolute left-1/2 mt-4 w-[720px] max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-3xl border border-slate-200 bg-white p-5 shadow-strong transition ${
                openMenu === "services"
                  ? "opacity-100 translate-y-0"
                  : "pointer-events-none opacity-0 translate-y-2"
              }`}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Services</p>
                  <p className="mt-1 text-sm text-slate-600">Explore our core consulting tracks.</p>
                </div>
                <NavLink className="text-xs font-semibold text-primary-600" to="/services" onClick={closeMenu}>
                  View all services
                </NavLink>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {serviceMenu.map((service) => (
                  <NavLink
                    key={service.title}
                    to={service.href}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 p-3 transition hover:border-primary-200 hover:bg-slate-50"
                    onClick={closeMenu}
                  >
                    <img src={service.image} alt={service.title} className="h-14 w-14 rounded-xl object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{service.title}</p>
                      <p className="text-xs text-slate-500">{service.description}</p>
                    </div>
                  </NavLink>
                ))}
              </div>
              <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-xs text-slate-600">
                Not sure which service fits? Start with a brief consult and we’ll guide you.
              </div>
            </div>
          </div>
          <div
            className="relative"
            onMouseEnter={() => {
              cancelClose();
              setOpenMenu("inquire");
            }}
            onMouseLeave={scheduleClose}
            onFocus={() => setOpenMenu("inquire")}
            onBlur={scheduleClose}
          >
            <button type="button" className="cursor-pointer transition hover:text-slate-900">
              Inquire
            </button>
            <div
              className={`absolute left-1/2 mt-4 w-[420px] -translate-x-1/2 rounded-3xl border border-slate-200 bg-white p-4 shadow-strong transition ${
                openMenu === "inquire"
                  ? "opacity-100 translate-y-0"
                  : "pointer-events-none opacity-0 translate-y-2"
              }`}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Inquire</p>
              <div className="mt-3 grid gap-3">
                {inquireMenu.map((item) => (
                  <NavLink
                    key={item.title}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 p-3 transition hover:border-primary-200 hover:bg-slate-50"
                    to={item.href}
                    onClick={closeMenu}
                  >
                    <img src={item.image} alt={item.title} className="h-12 w-12 rounded-xl object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500">{item.description}</p>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `transition hover:text-slate-900 ${isActive ? "text-slate-900" : "text-slate-600"}`
            }
          >
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
