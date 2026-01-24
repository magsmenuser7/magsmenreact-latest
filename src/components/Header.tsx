// Header.jsx (or Header.tsx)
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// update these asset imports to match your project paths
import logo01 from "/assets/banners/logo-01.svg";


const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Expertise",
    href: "/expertise",
    dropdown: [
      { name: "Brand Consulting", href: "/brand-consulting" },
      { name: "Personal Brand Consulting", href: "/personal-brand-consulting" },
      // { name: "Image Consulting", href: "/image-consulting" },
      { name: "Corporate Rebranding", href: "/corporate-rebranding" },
      { name: "Brand Expresso", href: "/brand-expresso" },
      { name: "Brand Creation", href: "/brand-creation" },
      { name: "Link Fluence", href: "/link-fluence" },
      { name: "Launchpad", href: "/launchpad" },
    ],
  },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Insights", href: "/insights" },
  {name: "Media", href: "/media" },
  { name: "Careers", href: "/careers" },
  { name: "Partner With Us", href: "/partner-with-us" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // name of open dropdown or null
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Scroll effect (keeps from previous implementation if you want to use scrolled)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Header bar */}
      <header className="fixed top-0 left-0 w-full z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6">
          <Link to="/" className="flex items-center">
  <div className="bg-white rounded-full p-2 md:p-3">
    <img
      src={logo01}
      alt="MagsmenLogo"
      className="h-8 sm:h-10 md:h-20 md:w-20 object-contain"
    />
  </div>
</Link>
          {/* hamburger opens side menu */}
          <button
            className="p-2 flex items-end justify-end"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-8 h-8 text-[#5a35a3]" />
          </button>
        </div>
      </header>

      {/* Side Navbar */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.aside
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "tween", duration: 0.28 }}
            className="fixed top-0 right-0 h-full text-right w-full sm:w-[350px] md:w-[400px] bg-[#000000] text-white z-[99] overflow-y-auto"
          >
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                className="p-2"
                onClick={() => {
                  setIsMenuOpen(false);
                  setOpenDropdown(null);
                }}
                aria-label="Close menu"
              >
                <X className="w-8 h-8 text-white" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col space-y-2 px-8 pt-4 font-medium">
              {navigation.map((item) => (
                <div key={item.name} className="text-right">
                  {item.dropdown ? (
                    <>
                      {/* Container for text-link + chevron */}
                      <div className="flex items-center justify-end w-full">
                        {/* TEXT — navigates to item.href */}
                        <Link
                          to={item.href}
                          className="py-2 text-lg font-semibold mr-3"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setOpenDropdown(null);
                          }}
                        >
                          {item.name}
                        </Link>

                        {/* CHEVRON — toggles dropdown only */}
                        <button
                          aria-expanded={openDropdown === item.name}
                          aria-controls={`${item.name}-dropdown`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdown((prev) => (prev === item.name ? null : item.name));
                          }}
                          className="p-2"
                        >
                          <ChevronDown
                            className={`w-5 h-5 text-white transition-transform ${
                              openDropdown === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {/* Dropdown Links (animated) */}
                      <AnimatePresence>
                        {openDropdown === item.name && (
                          <motion.div
                            id={`${item.name}-dropdown`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.18 }}
                            className="mr-5 mb-2"
                          >
                            {item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                to={dropdownItem.href}
                                className="block py-2 text-base text-white/80 hover:text-white text-right"
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setOpenDropdown(null);
                                }}
                              >
                                {dropdownItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={`block py-2 text-lg font-semibold text-white hover:text-gray-100 ${
                        location.pathname === item.href ? "text-white" : ""
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* CTA */}
              <Link
                to=""
                className="mt-8 bg-white text-[#683FBF] px-6 py-3 rounded-lg font-semibold text-center hover:bg-[#5a35a3] hover:text-white transition-colors shadow-lg w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </Link>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

