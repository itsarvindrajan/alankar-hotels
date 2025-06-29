import { Facebook, Twitter, Instagram, Phone, MapPin, Mail, Clock, Utensils, ExternalLink } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-brand-neutral-dark via-brand-primary to-brand-primary-light overflow-hidden">
      {/* Elegant Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                 backgroundSize: '60px 60px'
               }}>
          </div>
        </div>
        
        {/* Subtle Floating Elements */}
        <div className="absolute top-20 left-20 w-24 h-24 bg-brand-accent/10 rounded-full blur-2xl floating"></div>
        <div className="absolute bottom-32 right-32 w-32 h-32 bg-brand-secondary/10 rounded-full blur-2xl floating" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="container-custom py-16">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Brand Section - Takes up more space */}
            <div className="lg:col-span-5">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-accent to-brand-accent-dark rounded-2xl flex items-center justify-center mr-5 shadow-lg">
                  <Utensils className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-baloo-thambi-2 text-4xl font-bold text-white mb-1">அலங்கார</h3>
                  <p className="font-inter text-brand-accent-light font-medium text-sm tracking-wider">PURE VEGETARIAN EXCELLENCE</p>
                </div>
              </div>
              
              <p className="font-crimson text-white/90 text-lg leading-relaxed mb-8 max-w-md">
                Experience the finest pure vegetarian cuisine in Vellore. Where tradition meets taste, 
                and every meal tells a story of authentic South Indian heritage.
              </p>
              
              {/* Social Media */}
              <div className="mb-8">
                <h4 className="font-baskerville text-white font-bold text-lg mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
                  {[
                    { icon: Facebook, label: "Facebook", href: "#", color: "hover:bg-blue-600" },
                    { icon: Instagram, label: "Instagram", href: "#", color: "hover:bg-pink-600" },
                    { icon: Twitter, label: "Twitter", href: "#", color: "hover:bg-blue-500" },
                    { icon: Phone, label: "WhatsApp", href: "#", color: "hover:bg-green-600" },
                  ].map((social) => (
                    <a 
                      key={social.label}
                      href={social.href} 
                      className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center ${social.color} transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-110 hover:shadow-lg`}
                      aria-label={social.label}
              >
                      <social.icon className="w-5 h-5 text-white" />
              </a>
                  ))}
                </div>
                
                {/* 4 Locations - Placed under social icons */}
                <div className="mt-6 p-4 bg-gradient-to-r from-brand-accent/20 to-brand-accent-dark/20 rounded-2xl border border-brand-accent-light/30 backdrop-blur-sm">
                  <div className="flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-brand-accent-light mr-3" />
                    <span className="font-baskerville text-brand-accent-light font-bold text-base">4 Locations Across Vellore Region</span>
                  </div>
                </div>
            </div>
          </div>
          
            {/* Quick Links */}
            <div className="lg:col-span-3">
              <h4 className="font-baskerville text-white font-bold text-xl mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {[
                  { id: "home", label: "Home" },
                  { id: "about", label: "About Us" },
                  { id: "menu", label: "Our Menu" },
                  { id: "gallery", label: "Gallery" },
                  { id: "contact", label: "Contact" },
                ].map((link) => (
                  <li key={link.id}>
                <button 
                      onClick={() => scrollToSection(link.id)}
                      className="group flex items-center text-white/80 hover:text-brand-accent-light transition-all duration-300 font-inter font-medium"
                >
                      <div className="w-2 h-2 bg-brand-accent/60 rounded-full mr-3 group-hover:bg-brand-accent-light group-hover:scale-125 transition-all duration-300"></div>
                      {link.label}
                </button>
              </li>
                ))}
            </ul>
          </div>
          
            {/* Contact Info */}
            <div className="lg:col-span-4">
              <h4 className="font-baskerville text-white font-bold text-xl mb-6">Contact Information</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                  <MapPin className="w-5 h-5 text-brand-accent-light mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-inter text-white font-semibold">Main Location</p>
                    <p className="font-crimson text-white/80 text-sm">Thottapalayam, Vellore</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                  <Phone className="w-5 h-5 text-brand-accent-light mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-inter text-white font-semibold">Phone</p>
                    <p className="font-crimson text-white/80 text-sm">+91 416 420 2013</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                  <Mail className="w-5 h-5 text-brand-accent-light mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-inter text-white font-semibold">Email</p>
                    <p className="font-crimson text-white/80 text-sm">info@alankarhotels.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                  <Clock className="w-5 h-5 text-brand-accent-light mt-0.5 flex-shrink-0" />
          <div>
                    <p className="font-inter text-white font-semibold">Operating Hours</p>
                    <p className="font-crimson text-white/80 text-sm">Daily: 7:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/20 bg-black/20 backdrop-blur-sm">
          <div className="container-custom py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="font-inter text-white/90 font-medium mb-1">
                  &copy; 2024 அலங்கார Hotels. All rights reserved.
                </p>
                <p className="font-crimson text-white/70 text-sm">
                  Pure Vegetarian Restaurant Chain in Vellore | Authentic South Indian Cuisine
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="font-inter text-white/70 text-sm">Powered by</span>
            <a 
              href="https://www.brushandbyte.in" 
              target="_blank" 
              rel="noopener noreferrer"
                  className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-brand-accent/20 to-brand-accent-dark/20 rounded-full border border-brand-accent-light/30 hover:from-brand-accent/30 hover:to-brand-accent-dark/30 transition-all duration-300 hover:scale-105"
            >
                  <span className="font-baskerville text-brand-accent-light font-semibold text-sm group-hover:text-white transition-colors duration-300">
              Brush & Byte
                  </span>
                  <ExternalLink className="w-3 h-3 text-brand-accent-light group-hover:text-white transition-colors duration-300" />
            </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
