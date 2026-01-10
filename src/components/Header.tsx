import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#articles", label: "Articles" },
    { href: "/wellness", label: "Wellness" },
    { href: "/travel", label: "Travel" },
    { href: "/creativity", label: "Creativity" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className={`sticky top-0 z-50 py-3 transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav 
          className={`
            flex items-center justify-between h-14 sm:h-16 
            glass-strong rounded-full px-4 sm:px-6
            transition-all duration-500
            ${isScrolled ? 'shadow-glass-lg' : 'shadow-glass'}
          `}
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a 
            href="/" 
            className="flex items-center gap-2 sm:gap-3 group"
            aria-label="Perspective Magazine Home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <span className="text-primary-foreground font-bold text-lg sm:text-xl">P</span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            <span className="text-lg sm:text-xl font-bold font-display tracking-tight">
              Perspective
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-full hover:bg-secondary/50 transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button */}
            <button
              className="hidden sm:flex p-2.5 rounded-full hover:bg-secondary/50 transition-all duration-300"
              aria-label="Search articles"
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-secondary/50 transition-all duration-300"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>
            
            {/* Subscribe Button */}
            <Button 
              className="hidden md:flex glass-button bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-2 text-sm font-medium"
            >
              Subscribe
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            className="lg:hidden mt-3 glass-strong rounded-3xl p-6 animate-scale-in"
            role="menu"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium py-3 px-4 rounded-xl hover:bg-secondary/50 transition-all duration-300 animate-slide-up`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  role="menuitem"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 mt-2 border-t border-border/50">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-3 font-medium">
                  Subscribe
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
