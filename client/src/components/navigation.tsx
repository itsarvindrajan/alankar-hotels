import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Utensils } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Navigation({ mobileMenuOpen, setMobileMenuOpen }: NavigationProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "menu", "gallery", "contact", "faq", "testimonials", "blog"];
      const scrollPosition = window.scrollY + 100;

      // Update scroll state for navbar styling
      setIsScrolled(window.scrollY > 50);

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: "home", label: "Home", type: "link" },
    { id: "about", label: "About Us", type: "link" },
    { id: "menu", label: "Menu", type: "link" },
    { id: "gallery", label: "Gallery", type: "link" },
  ];

  const contactDropdownItems = [
    { id: "contact", label: "Contact" },
    { id: "faq", label: "FAQ" },
    { id: "testimonials", label: "Testimonials" },
    // { id: "blog", label: "Blog" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-white/30" 
        : "bg-black/30 backdrop-blur-xl shadow-sm border-b border-white/20"
    }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center group cursor-pointer" onClick={() => scrollToSection("home")}>
            <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-primary-light rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-all duration-300">
              <Utensils className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`font-baloo-thambi-2 text-2xl lg:text-3xl font-bold leading-tight transition-colors duration-500 ${
                isScrolled ? "text-brand-text" : "text-white drop-shadow-lg"
              }`}>
                அலங்கார்
              </h1>
              <p className={`font-inter text-xs font-medium tracking-wide transition-colors duration-500 ${
                isScrolled ? "text-brand-accent" : "text-brand-accent-light drop-shadow-md"
              }`}>
                PURE VEGETARIAN DINING
              </p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-6 py-3 text-sm font-semibold transition-all duration-300 rounded-lg ${
                    activeSection === item.id
                      ? "text-white bg-brand-primary shadow-md"
                      : isScrolled 
                        ? "text-brand-text hover:text-brand-primary hover:bg-brand-secondary-light/30"
                        : "text-white hover:text-brand-accent-light hover:bg-white/20 backdrop-blur-sm drop-shadow-md"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`relative px-6 py-3 text-sm font-semibold transition-all duration-300 rounded-lg flex items-center gap-2 ${
                      ["contact", "faq", "testimonials", "blog"].includes(activeSection)
                        ? "text-white bg-brand-primary shadow-md"
                        : isScrolled 
                          ? "text-brand-text hover:text-brand-primary hover:bg-brand-secondary-light/30"
                          : "text-white hover:text-brand-accent-light hover:bg-white/20 backdrop-blur-sm drop-shadow-md"
                    }`}
                  >
                    More
                    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-xl border border-brand-secondary-light/30 shadow-lg">
                  {contactDropdownItems.map((item) => (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="cursor-pointer font-medium text-brand-text hover:text-brand-primary hover:bg-brand-secondary-light/30 focus:bg-brand-secondary-light/30 focus:text-brand-primary"
                    >
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* CTA Button */}
              <Button
                onClick={() => scrollToSection("contact")}
                className="ml-4 bg-gradient-to-r from-brand-accent to-brand-accent-dark hover:from-brand-accent-dark hover:to-brand-accent text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl font-inter hover:scale-105"
              >
                Visit Us
              </Button>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-3 rounded-lg transition-colors duration-500 ${
                isScrolled 
                  ? "text-brand-text hover:text-brand-primary hover:bg-brand-secondary-light/30" 
                  : "text-white hover:text-brand-accent-light hover:bg-white/20 drop-shadow-md"
              }`}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden backdrop-blur-xl border-t shadow-xl ${
          isScrolled 
            ? "bg-white/95 border-brand-secondary-light/30" 
            : "bg-black/30 border-white/20"
        }`}>
          <div className="container-custom py-6">
            <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-6 py-4 text-base font-semibold transition-all duration-300 rounded-xl ${
                  activeSection === item.id
                      ? "text-white bg-brand-primary shadow-md"
                      : isScrolled
                        ? "text-brand-text hover:text-brand-primary hover:bg-brand-secondary-light/30"
                        : "text-white hover:text-brand-accent-light hover:bg-white/20 drop-shadow-md"
                }`}
              >
                {item.label}
              </button>
            ))}
            
              <div className={`mt-4 pt-4 ${isScrolled ? "border-t border-brand-secondary-light/30" : "border-t border-white/20"}`}>
                <div className={`px-6 py-2 text-sm font-bold uppercase tracking-wide ${
                  isScrolled ? "text-brand-accent" : "text-brand-accent-light drop-shadow-md"
                }`}>
                  More Options
                </div>
              {contactDropdownItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-8 py-3 text-base font-medium transition-all duration-300 rounded-xl ${
                    activeSection === item.id
                        ? "text-white bg-brand-primary shadow-md"
                        : isScrolled
                          ? "text-brand-text hover:text-brand-primary hover:bg-brand-secondary-light/30"
                          : "text-white hover:text-brand-accent-light hover:bg-white/20 drop-shadow-md"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              </div>

              <div className={`pt-6 mt-6 ${isScrolled ? "border-t border-brand-secondary-light/30" : "border-t border-white/20"}`}>
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="w-full bg-gradient-to-r from-brand-accent to-brand-accent-dark hover:from-brand-accent-dark hover:to-brand-accent text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-inter text-lg hover:scale-105"
                >
                  Visit Our Locations
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
