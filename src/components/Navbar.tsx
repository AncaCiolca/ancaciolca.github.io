import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getHomeData } from "@/lib/homeData";

const navLinks = [
  { to: "/", label: "Acasă" },
  { to: "/poezii", label: "Poezii" },
  { to: "/despre-mine", label: "Despre mine" },
];

const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className="w-6 h-5 relative flex flex-col justify-between">
    <motion.span
      animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="block h-[2px] w-full bg-foreground rounded-full origin-center"
    />
    <motion.span
      animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.2 }}
      className="block h-[2px] w-4 bg-foreground rounded-full ml-auto"
    />
    <motion.span
      animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="block h-[2px] w-full bg-foreground rounded-full origin-center"
    />
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved !== "light";
    }
    return true;
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") setDark(false);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const home = getHomeData();

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "bg-background/90 border-border/60 backdrop-blur"
            : "bg-transparent border-transparent"
        } rounded-none`}
      >
        <div className="mx-auto max-w-6xl lg:max-w-7xl px-5 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="group md:ml-0">
              <span className="font-handwriting text-[2.0625rem] md:text-4xl text-primary">
                Anca Ciolca
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative font-body text-base tracking-wide transition-colors duration-300 hover:text-primary py-1"
                >
                  <span className={location.pathname === link.to ? "text-primary font-medium" : "text-muted-foreground dark:text-foreground/85"}>
                    {link.label}
                  </span>
                  {location.pathname === link.to && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              ))}

              <button
                onClick={() => setDark(d => !d)}
                className="p-2 rounded-full text-muted-foreground dark:text-foreground/85 hover:text-primary hover:bg-muted/50 transition-colors"
                aria-label="Schimbă tema"
              >
                {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile buttons */}
            <div className="flex md:hidden items-center gap-1">
              <button
                onClick={() => setDark(d => !d)}
                className="p-2 text-muted-foreground dark:text-foreground/85 hover:text-primary transition-colors"
                aria-label="Schimbă tema"
              >
                {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 mr-[-4px] text-foreground"
                aria-label="Meniu"
              >
                <HamburgerIcon isOpen={isOpen} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Fullscreen mobile overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/95 backdrop-blur-md" />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex-1 flex flex-col items-center justify-center gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className="relative block py-3 px-6"
                    >
                      <span className={`font-display text-3xl tracking-wide transition-colors ${
                        location.pathname === link.to
                          ? "text-primary"
                          : "text-foreground/70 dark:text-foreground/85"
                      }`}>
                        {link.label}
                      </span>
                      {location.pathname === link.to && (
                        <motion.div
                          layoutId="mobile-nav-dot"
                          className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8"
                >
                  <div className="decorative-line" />
                </motion.div>
              </div>

              {/* Social icons at bottom */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="pb-10 flex items-center justify-center gap-5"
              >
                <a href={home.facebook || "#"} className="text-muted-foreground dark:text-foreground/85 hover:text-primary transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href={home.instagram || "#"} className="text-muted-foreground dark:text-foreground/85 hover:text-primary transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href={home.youtube || "#"} className="text-muted-foreground dark:text-foreground/85 hover:text-primary transition-colors" aria-label="YouTube">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.5 6.2s-.2-1.7-.9-2.5c-.9-.9-1.9-.9-2.4-1C16.6 2.5 12 2.5 12 2.5h0s-4.6 0-8.2.2c-.5.1-1.5.1-2.4 1-.7.8-.9 2.5-.9 2.5S0 8.3 0 10.4v1.1c0 2.1.1 4.2.1 4.2s.2 1.7.9 2.5c.9.9 2.1.9 2.7 1 2 .2 8.3.2 8.3.2s4.6 0 8.2-.2c.5-.1 1.5-.1 2.4-1 .7-.8.9-2.5.9-2.5s.1-2.1.1-4.2v-1.1c0-2.1-.1-4.2-.1-4.2zM9.6 14.3V7.7l6.2 3.3-6.2 3.3z" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
