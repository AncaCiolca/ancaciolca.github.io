import { Link } from "react-router-dom";
import { getHomeData } from "@/lib/homeData";

const Footer = () => {
  const home = getHomeData();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto px-5 md:px-8 py-12">
        <div className="flex flex-col items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-handwriting text-2xl text-foreground">
              {home.footerTitle}
            </span>
          </Link>

          <div className="decorative-line-wide" />

          <p className="font-elegant text-lg md:text-lg text-muted-foreground italic text-center max-w-md">
            {`„${home.footerQuote}”`}
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            <a href={home.facebook || "#"} className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href={home.instagram || "#"} className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href={home.youtube || "#"} className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.5 6.2s-.2-1.7-.9-2.5c-.9-.9-1.9-.9-2.4-1C16.6 2.5 12 2.5 12 2.5h0s-4.6 0-8.2.2c-.5.1-1.5.1-2.4 1-.7.8-.9 2.5-.9 2.5S0 8.3 0 10.4v1.1c0 2.1.1 4.2.1 4.2s.2 1.7.9 2.5c.9.9 2.1.9 2.7 1 2 .2 8.3.2 8.3.2s4.6 0 8.2-.2c.5-.1 1.5-.1 2.4-1 .7-.8.9-2.5.9-2.5s.1-2.1.1-4.2v-1.1c0-2.1-.1-4.2-.1-4.2zM9.6 14.3V7.7l6.2 3.3-6.2 3.3z" />
              </svg>
            </a>
          </div>

          <p className="text-sm md:text-xs text-muted-foreground">
            {home.footerCopyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
