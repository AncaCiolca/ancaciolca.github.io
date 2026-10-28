import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { getHomeData } from "@/lib/homeData";
import { MobileMenu, Burger, ThemeSwitch } from "./MobileMenu";

const navLinks = [
  { to: "/", label: "Acasă" },
  { to: "/poezii", label: "Poezii" },
  { to: "/despre-mine", label: "Despre mine" },
];

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

  const closeMenu = useCallback(() => setIsOpen(false), []);

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
          <div className="flex items-center justify-between h-[78px] md:h-20">
            <Link to="/" className="group md:ml-0 min-w-[170px] md:min-w-[220px]">
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
              <ThemeSwitch onToggle={() => setDark(d => !d)} />
              <Burger open={isOpen} onToggle={() => setIsOpen(o => !o)} />
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu
        open={isOpen}
        onClose={closeMenu}
        links={navLinks}
        isActive={to => location.pathname === to}
        socials={[
          { href: home.facebook, label: "Facebook" },
          { href: home.instagram, label: "Instagram" },
          { href: home.youtube, label: "YouTube" },
        ].filter(s => s.href) as { href: string; label: string }[]}
      />
    </>
  );
};

export default Navbar;
