import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { getMenuData } from "@/lib/menuService";
import { MenuCategory } from "@/../../shared/schema";
import {
  Heart,
  MapPin,
  Star,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  Award,
  Users,
  Sparkles,
  Loader2,
} from "lucide-react";
import Background from "@assets/home_bg.jpg";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuCategory[]>([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector("nav");
      if (nav) {
        if (window.scrollY > 100) {
          nav.classList.add("backdrop-blur-md", "bg-white/95");
        } else {
          nav.classList.remove("backdrop-blur-md", "bg-white/95");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load menu data from Airtable
  useEffect(() => {
    const loadMenuData = async () => {
      try {
        setIsLoadingMenu(true);
        
        const data = await getMenuData();
        setMenuItems(data);
      } catch (error) {
        console.error('Error loading menu data:', error);
      } finally {
        setIsLoadingMenu(false);
      }
    };

    loadMenuData();
  }, []);

  return (
    <div className="min-h-screen bg-warm-gray">
      <Navigation
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Enhanced Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Background Image with Enhanced Overlay */}
        <div
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage: `url(${Background})`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
        ></div>
        {/* <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-brand-primary/60"></div> */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>

        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-brand-accent/20 rounded-full blur-3xl floating pulse-slow"></div>
        <div
          className="absolute bottom-40 left-20 w-56 h-56 bg-brand-secondary/20 rounded-full blur-3xl floating"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-32 h-32 bg-brand-accent-light/15 rounded-full blur-2xl floating"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="relative container-custom text-center z-10">
          <div className="max-w-6xl mx-auto">
            {/* Enhanced Hero Content */}
            <div className="fade-in-up">
              <div className="mb-6">
                <span className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/30 text-white font-semibold text-sm tracking-wide mb-4">
                  🌿 PURE VEGETARIAN RESTAURANT & HOTEL
                </span>
              </div>
              <h1 className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight text-shadow-lg">
                Authentic South Indian Vegetarian Dining
              </h1>
            </div>
            
            <div className="fade-in-up" style={{ animationDelay: "0.2s" }}>
              <p className="font-crimson text-xl md:text-2xl lg:text-3xl text-white/95 mb-12 leading-relaxed max-w-4xl mx-auto text-shadow">
                Experience the rich heritage of South Indian vegetarian cuisine in the
                heart of Vellore. Where tradition meets innovation in every
                carefully crafted dish.
              </p>
            </div>
            
            <div
              className="fade-in-up flex flex-col sm:flex-row gap-6 justify-center mb-16"
              style={{ animationDelay: "0.4s" }}
            >
              <Button
                onClick={() =>
                  document
                    .getElementById("menu")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group btn-primary text-lg px-12 py-4 font-inter glow-effect"
              >
                <span className="mr-3">Explore Our Menu</span>
                <ChevronDown className="w-5 h-5 inline transform group-hover:translate-y-1 transition-transform duration-300" />
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="glass-effect border-2 border-white/40 text-white hover:bg-white/20 hover:!text-white px-12 py-4 rounded-full font-semibold text-lg transition-all duration-500 backdrop-blur-md font-inter hover:border-brand-accent/60"
              >
                Visit Our Locations
              </Button>
            </div>

            {/* Stats Section */}
            <div
              className="fade-in-up grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
              style={{ animationDelay: "0.6s" }}
            >
              {[
                { icon: Award, label: "Years of Service", value: "20+" },
                { icon: Users, label: "Happy Guests", value: "50K+" },
                { icon: MapPin, label: "Locations", value: "4" },
                { icon: Sparkles, label: "Pure Vegetarian", value: "100%" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center group"
                  style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white/30">
                    <stat.icon className="w-8 h-8 text-brand-accent-light drop-shadow-lg" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2 font-cormorant">
                    {stat.value}
                  </div>
                  <div className="text-white/80 text-sm font-medium font-inter">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 font-inter">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </div> */}
      </section>

      {/* Enhanced Features Section */}
      <section className="section-padding bg-gradient-to-b from-white via-warm-gray/30 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent via-brand-primary to-brand-primary-light"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-brand-secondary-light/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-brand-accent/10 rounded-full blur-3xl"></div>

        <div className="container-custom relative">
          <div className="text-center mb-20">
            <div className="fade-in-up">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-brand-secondary-light/20 to-brand-primary/20 rounded-full border border-brand-primary/30 text-brand-text font-semibold text-sm tracking-wide mb-6">
                WHY CHOOSE US
              </span>
              <h2 className="heading-secondary mb-8">
                Experience the Alankar
                <span className="block text-brand-primary">Difference</span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-brand-accent to-brand-primary mx-auto mb-8"></div>
              <p className="text-body-lg max-w-4xl mx-auto">
                Discover what makes us Vellore's premier destination for
                authentic South Indian vegetarian cuisine. Our commitment to quality,
                tradition, and exceptional service sets us apart.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "100% Pure Vegetarian",
                description: "Committed to serving only the finest vegetarian dishes with authentic South Indian flavors and fresh, locally-sourced ingredients.",
                delay: "0s"
              },
              {
                icon: MapPin,
                title: "4 Strategic Locations",
                description: "Conveniently located across Vellore region, easily accessible for locals and highway travelers seeking quality vegetarian dining.",
                delay: "0.2s"
              },
              {
                icon: Star,
                title: "Exceptional Service",
                description: "Award-winning hospitality with warm Tamil Nadu service that makes every dining experience memorable and authentic.",
                delay: "0.4s"
              }
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="fade-in-up group"
                style={{ animationDelay: feature.delay }}
              >
                <Card className="text-center p-10 rounded-3xl bg-white hover:bg-gradient-to-br hover:from-white hover:to-brand-secondary-light/5 shadow-lg hover:shadow-2xl transition-all duration-500 border-0 card-hover glow-effect-green h-full">
                  <CardContent className="pt-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-brand-primary to-brand-primary-light rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3">
                      <feature.icon className="w-12 h-12 text-white drop-shadow-lg" />
                    </div>
                    <h3 className="heading-tertiary mb-6">
                      {feature.title}
                    </h3>
                    <p className="text-body leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 fade-in-up" style={{ animationDelay: "0.6s" }}>
            <Button
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-secondary text-lg px-10 py-4 font-inter"
            >
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Menu Section */}
      <section id="menu" className="section-padding relative overflow-hidden bg-gradient-to-br from-warm-gray/50 via-white to-brand-secondary-light/5">
        <div
          className="absolute inset-0 parallax-bg opacity-5"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1596797038530-2c107229654b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          }}
        ></div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-brand-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-brand-primary/10 rounded-full blur-3xl"></div>

        <div className="relative container-custom">
          <div className="text-center mb-20">
            <div className="fade-in-up">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-brand-secondary-light/20 to-brand-primary/20 rounded-full border border-brand-primary/30 text-brand-text font-semibold text-sm tracking-wide mb-6">
                OUR SPECIALTIES
              </span>
              <h2 className="heading-secondary mb-8">
                Authentic South Indian
                <span className="block text-brand-primary">Vegetarian Menu</span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-brand-accent to-brand-primary mx-auto mb-8"></div>
              <p className="text-body-lg max-w-4xl mx-auto">
                Discover our carefully crafted selection of traditional and
                contemporary South Indian vegetarian delicacies, prepared with
                authentic spices and fresh ingredients.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {isLoadingMenu ? (
              <div className="col-span-full flex items-center justify-center py-20">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-brand-primary mx-auto mb-4" />
                  <p className="text-body-lg text-brand-text">Loading menu...</p>
                </div>
              </div>
            ) : (
              menuItems.map((category, index) => (
                <div
                  key={category.id}
                  className={`fade-in-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <Card className="group glass-card rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 border-0 card-hover glow-effect-green h-full">
                    <CardContent className="p-0">
                      <div className="flex items-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-brand-primary to-brand-primary-light rounded-3xl flex items-center justify-center mr-6 shadow-xl group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3">
                          {React.createElement(category.icon, { className: "w-10 h-10 text-white drop-shadow-lg" })}
                        </div>
                        <div>
                          <h3 className="heading-tertiary mb-2">
                            {category.name}
                          </h3>
                          <div className="w-16 h-1 bg-gradient-to-r from-brand-accent to-brand-primary"></div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        {category.items?.map((item, itemIndex) => (
                          <div
                            key={item.id}
                            className="group/item flex justify-between items-start p-6 rounded-2xl hover:bg-gradient-to-r hover:from-brand-secondary-light/10 hover:to-brand-accent/5 transition-all duration-300 border border-transparent hover:border-brand-secondary-light/30"
                          >
                            <div className="flex-1">
                              <h4 className="font-inter font-bold text-lg text-brand-text group-hover/item:text-brand-primary transition-colors mb-2">
                                {item.name}
                              </h4>
                              <p className="text-body text-sm leading-relaxed">
                                {item.description}
                              </p>
                              {item.tags && item.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {item.tags.map((tag, tagIndex) => (
                                    <span
                                      key={tagIndex}
                                      className="px-2 py-1 bg-brand-accent/20 text-brand-text text-xs rounded-full font-medium"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="ml-6 text-right">
                              <span className="font-playfair font-bold text-brand-primary text-2xl group-hover/item:text-brand-accent group-hover/item:scale-110 transition-all duration-300">
                                ₹{item.price}
                              </span>
                              {!item.isAvailable && (
                                <div className="text-xs text-red-500 mt-1">
                                  Currently unavailable
                                </div>
                              )}
                            </div>
                          </div>
                        )) || (
                          <div className="text-center py-8 text-body">
                            No items available in this category
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))
            )}
          </div>

          <div
            className="text-center mt-20 fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="rounded-3xl p-8 mb-8 border border-brand-accent">
              <p className="text-body font-medium mb-4">
                All prices are inclusive of taxes • Pure South Indian vegetarian cuisine only
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="px-4 py-2 bg-brand-secondary-light/20 rounded-full text-brand-text font-medium">Fresh Ingredients</span>
                <span className="px-4 py-2 bg-brand-accent/20 rounded-full text-brand-text font-medium">Traditional Recipes</span>
                <span className="px-4 py-2 bg-brand-primary/20 rounded-full text-brand-text font-medium">Authentic Flavors</span>
              </div>
            </div>
            <Button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-primary text-lg px-12 py-4 font-inter"
            >
              Visit Our Locations
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-brand-secondary-light/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-brand-accent/10 rounded-full blur-3xl"></div>
        
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="fade-in-left">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-brand-secondary-light/20 to-brand-primary/20 rounded-full border border-brand-primary/30 text-brand-text font-semibold text-sm tracking-wide mb-6">
                OUR HERITAGE
              </span>
              <h2 className="heading-secondary mb-8">
                Our Story of
                <span className="block text-brand-primary">Culinary Excellence</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-brand-accent to-brand-primary mb-8"></div>
              
              <div className="space-y-6 text-body-lg leading-relaxed">
                <p>
                  Founded with a passion for authentic vegetarian cuisine,
                  Alankar Hotels has been serving the Vellore community for over
                  two decades. Our journey began with a simple belief: that
                  vegetarian food can be both nutritious and extraordinarily
                  delicious.
                </p>
                <p>
                  We take pride in our commitment to pure vegetarian cooking,
                  using only the freshest ingredients sourced locally whenever
                  possible. Our chefs bring together traditional recipes passed
                  down through generations with contemporary culinary
                  techniques.
                </p>
                <p>
                  What sets us apart is our dedication to creating an atmosphere
                  where families and friends can come together to enjoy
                  wholesome meals in a warm, welcoming environment. Every dish
                  is prepared with love and served with genuine hospitality.
                </p>
              </div>
              
              <div className="mt-12">
                <h3 className="heading-tertiary mb-6 text-brand-text">
                  Our Core Values
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "100% Pure Vegetarian Commitment",
                    "Fresh, Quality Ingredients", 
                    "Authentic Traditional Recipes",
                    "Exceptional Customer Service"
                  ].map((value, index) => (
                    <div key={value} className="flex items-center group">
                      <div className="w-3 h-3 bg-gradient-to-r from-gold to-accent-medium rounded-full mr-4 group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="text-body font-medium group-hover:text-accent-medium transition-colors duration-300">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <Button
                  onClick={() =>
                    document
                      .getElementById("gallery")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="btn-secondary text-base px-8 py-3 font-inter"
                >
                  View Our Gallery
                </Button>
              </div>
            </div>
            
            <div className="fade-in-right">
              <div className="grid gap-6">
                <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                    alt="Restaurant interior showcasing warm ambiance"
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="font-playfair text-xl font-semibold mb-1">Warm Ambiance</h4>
                    <p className="text-sm">Perfect for family dining</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1525315526278-e96d97c67c6f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Chef preparing traditional dishes"
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-xs font-medium">Expert Chefs</p>
                    </div>
                  </div>
                  
                  <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1625398407796-82650a8c135f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Traditional vegetarian thali"
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-xs font-medium">Authentic Cuisine</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Gallery Section */}
      <section
        id="gallery"
        className="section-padding bg-gradient-to-br from-accent-light/5 via-warm-gray/30 to-gold/5 relative overflow-hidden"
      >
        <div className="absolute top-20 left-20 w-32 h-32 bg-accent-medium/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-gold/10 rounded-full blur-3xl"></div>
        
        <div className="container-custom relative">
          <div className="text-center mb-20">
            <div className="fade-in-up">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-accent-light/20 to-accent-medium/20 rounded-full border border-accent-medium/30 text-accent-dark font-semibold text-sm tracking-wide mb-6">
                VISUAL EXPERIENCE
              </span>
              <h2 className="heading-secondary mb-8">
                Gallery of
                <span className="block text-accent-medium">Culinary Delights</span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-gold to-accent-medium mx-auto mb-8"></div>
              <p className="text-body-lg max-w-3xl mx-auto">
                A visual feast of our delicious vegetarian creations and warm
                dining atmosphere that makes every visit memorable
              </p>
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center mb-12 fade-in-up">
              <h3 className="heading-tertiary text-accent-dark mb-4">
                Our Signature Dishes
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-gold to-accent-medium mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  src: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "Traditional vegetarian thali with variety of dishes",
                  title: "Traditional Thali",
                  description: "Complete meal experience"
                },
                {
                  src: "https://images.unsplash.com/photo-1680529669043-9a7777b798bc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "Authentic Indian vegetarian curries",
                  title: "Vegetarian Curries",
                  description: "Rich and flavorful"
                },
                {
                  src: "https://images.unsplash.com/photo-1600935926387-12d9b03066f0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "Fresh Indian breads and rotis",
                  title: "Fresh Breads",
                  description: "Made to order"
                },
                {
                  src: "https://images.unsplash.com/photo-1692672166630-0bbbbf30e860?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "South Indian vegetarian street food",
                  title: "Street Food Delights",
                  description: "Authentic street flavors"
                },
                {
                  src: "https://images.unsplash.com/photo-1649053930596-29cb47828d87?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "Traditional Indian desserts and sweets",
                  title: "Indian Sweets",
                  description: "Perfect endings"
                },
                {
                  src: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=810&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "Aromatic vegetable biryani",
                  title: "Vegetable Biryani",
                  description: "Aromatic rice delicacy"
                },
              ].map((image, index) => (
                <div
                  key={index}
                  className="fade-in-up group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 card-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="font-playfair text-xl font-bold mb-2 text-shadow">
                      {image.title}
                    </h4>
                    <p className="text-sm opacity-90 text-shadow">
                      {image.description}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-gold/20 to-accent-medium/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/30">
                    <Sparkles className="w-6 h-6 text-gold" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-center mb-12 fade-in-up">
              <h3 className="heading-tertiary text-accent-dark mb-4">
                Our Restaurant Ambiance
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-gold to-accent-medium mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
                  alt: "Welcoming restaurant entrance",
                  title: "Welcoming Entrance",
                  description: "Warm hospitality awaits"
                },
                {
                  src: "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
                  alt: "Comfortable dining area",
                  title: "Dining Area",
                  description: "Comfortable family seating"
                },
                {
                  src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
                  alt: "Clean modern kitchen",
                  title: "Modern Kitchen",
                  description: "Hygienic food preparation"
                },
                {
                  src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
                  alt: "Private dining room",
                  title: "Private Dining",
                  description: "Special occasions"
                },
              ].map((image, index) => (
                <div
                  key={index}
                  className="fade-in-up group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 card-hover"
                  style={{ animationDelay: `${index * 0.1 + 0.6}s` }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="font-playfair text-lg font-semibold mb-1 text-shadow">
                      {image.title}
                    </h4>
                    <p className="text-xs opacity-90 text-shadow">
                      {image.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 primary-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-5xl font-bold text-white mb-4">
              Visit Our Locations
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Four convenient locations across Vellore region serving authentic
              pure vegetarian cuisine
            </p>
          </div>

          {/* Locations Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-0">
              <CardContent className="p-0">
                <h4 className="font-playfair text-xl font-bold text-accent-dark mb-3">
                  Walajapet Highway
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p className="font-medium">1/220 Chennai Bangalore Hwy</p>
                  <p>Walaja, Nandiyalam, Ratnagiri Kilminnal</p>
                  <p className="font-semibold text-accent-medium">
                    +91 94432 26795
                  </p>
                  <div className="pt-2 text-xs text-gray-600">
                    <span className="bg-accent-light/20 px-2 py-1 rounded mr-1">
                      Dine-in
                    </span>
                    <span className="bg-accent-light/20 px-2 py-1 rounded mr-1">
                      Parking
                    </span>
                    <span className="bg-accent-light/20 px-2 py-1 rounded">
                      Takeout
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-0">
              <CardContent className="p-0">
                <h4 className="font-playfair text-xl font-bold text-accent-dark mb-3">
                  Ratnagiri Temple
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p className="font-medium">Bangalore-Chennai Hwy</p>
                  <p>Near Ratnagiri Murugan Temple, Kilminnal</p>
                  <p className="font-semibold text-accent-medium">
                    +91 74012 34500
                  </p>
                  <div className="pt-2 text-xs text-gray-600">
                    <span className="bg-accent-light/20 px-2 py-1 rounded mr-1">
                      Dine-in
                    </span>
                    <span className="bg-accent-light/20 px-2 py-1 rounded">
                      Self-service
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-0">
              <CardContent className="p-0">
                <h4 className="font-playfair text-xl font-bold text-accent-dark mb-3">
                  Ratnagiri Highway
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p className="font-medium">Ratnagiri Highway</p>
                  <p>Ratnagiri Kilminnal</p>
                  <p className="font-semibold text-accent-medium">
                    +91 99444 46344
                  </p>
                  <div className="pt-2 text-xs text-gray-600">
                    <span className="bg-accent-light/20 px-2 py-1 rounded mr-1">
                      Dine-in
                    </span>
                    <span className="bg-accent-light/20 px-2 py-1 rounded">
                      Highway location
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-0">
              <CardContent className="p-0">
                <h4 className="font-playfair text-xl font-bold text-accent-dark mb-3">
                  Thottapalayam Vellore
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p className="font-medium">New Bus Stand, Ward 59</p>
                  <p>Thottapalayam, Vellore</p>
                  <p className="font-semibold text-accent-medium">
                    +91 416 420 2013
                  </p>
                  <div className="pt-2 text-xs text-gray-600">
                    <span className="bg-accent-light/20 px-2 py-1 rounded mr-1">
                      Dine-in
                    </span>
                    <span className="bg-accent-light/20 px-2 py-1 rounded">
                      Delivery
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Contact Information */}
            <Card className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-0">
              <CardContent className="p-0">
                <h3 className="font-playfair text-3xl font-bold text-accent-dark mb-8 text-center">
                  Contact Information
                </h3>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent-medium to-accent-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Phone className="w-8 h-8 text-brown drop-shadow-lg" />
                    </div>
                    <h4 className="font-semibold text-lg text-accent-dark mb-3">
                      Phone Numbers
                    </h4>
                    <div className="text-gray-700 space-y-1 text-sm">
                      <p>Walajapet: +91 94432 26795</p>
                      <p>Ratnagiri Temple: +91 74012 34500</p>
                      <p>Ratnagiri Highway: +91 99444 46344</p>
                      <p>Thottapalayam: +91 416 420 2013</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent-medium to-accent-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Mail className="w-8 h-8 text-brown drop-shadow-lg" />
                    </div>
                    <h4 className="font-semibold text-lg text-accent-dark mb-3">
                      Email
                    </h4>
                    <div className="text-gray-700 space-y-1">
                      <p>info@alankarhotels.com</p>
                      <p>reservations@alankarhotels.com</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent-medium to-accent-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Clock className="w-8 h-8 text-brown drop-shadow-lg" />
                    </div>
                    <h4 className="font-semibold text-lg text-accent-dark mb-3">
                      Operating Hours
                    </h4>
                    <div className="text-gray-700 space-y-1 text-sm">
                      <p className="font-medium">Daily: 7:00 AM - 10:00 PM</p>
                      <p>Breakfast: 7:00 AM - 11:00 AM</p>
                      <p>Lunch: 11:00 AM - 4:00 PM</p>
                      <p>Dinner: 6:00 PM - 10:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <Card className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-0">
              <CardContent className="p-0">
                <h3 className="font-playfair text-3xl font-bold text-accent-dark mb-8 text-center">
                  Find Us
                </h3>
                <div className="aspect-video bg-gray-200 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">
                      Interactive Map Coming Soon
                    </p>
                    <p className="text-sm text-gray-500">
                      Visit any of our 4 locations across Vellore region
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-5xl font-bold text-accent-dark mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our vegetarian dining
              experience
            </p>
          </div>

          <div className="space-y-6">
            <Card className="border border-accent-light/30">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-accent-dark mb-2">
                  What type of cuisine do you serve?
                </h3>
                <p className="text-gray-700">
                  We serve 100% pure vegetarian cuisine featuring authentic
                  South Indian and North Indian dishes, prepared with the
                  freshest ingredients and traditional recipes.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-accent-light/30">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-accent-dark mb-2">
                  Do you offer home delivery?
                </h3>
                <p className="text-gray-700">
                  Yes, our Thottapalayam Vellore location offers home delivery
                  within the city limits. Please call +91 416 420 2013 to place
                  your order.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-accent-light/30">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-accent-dark mb-2">
                  Are reservations required?
                </h3>
                <p className="text-gray-700">
                  While walk-ins are welcome, we recommend making reservations
                  for dinner and weekends to ensure your preferred seating time.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-accent-light/30">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-accent-dark mb-2">
                  Do you accommodate special dietary requirements?
                </h3>
                <p className="text-gray-700">
                  Absolutely! We can accommodate various dietary preferences
                  including vegan, gluten-free, and Jain food requirements.
                  Please inform us when making your reservation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 bg-gradient-to-br from-accent-light/5 to-accent-medium/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-5xl font-bold text-accent-dark mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Read reviews from our satisfied guests across all locations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white rounded-2xl p-8 shadow-lg border-0">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-accent-medium text-accent-medium"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "Outstanding vegetarian food with authentic flavors. The
                  paneer butter masala is absolutely divine. Highly recommend
                  the Walajapet location for highway travelers."
                </p>
                <div className="font-semibold text-accent-dark">
                  Priya Sharma
                </div>
                <div className="text-sm text-gray-600">Regular Customer</div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl p-8 shadow-lg border-0">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-accent-medium text-accent-medium"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "Clean, hygienic environment with excellent service. The
                  variety in their menu is impressive and everything tastes
                  homemade. Perfect for family dining."
                </p>
                <div className="font-semibold text-accent-dark">
                  Rajesh Kumar
                </div>
                <div className="text-sm text-gray-600">Family Diner</div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl p-8 shadow-lg border-0">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-accent-medium text-accent-medium"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "Been visiting for years and the quality never disappoints.
                  The temple location is especially convenient and the
                  self-service option is great for quick meals."
                </p>
                <div className="font-semibold text-accent-dark">Meera Iyer</div>
                <div className="text-sm text-gray-600">Loyal Customer</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-5xl font-bold text-accent-dark mb-4">
              Latest from Our Kitchen
            </h2>
            <p className="text-xl text-gray-600">
              Discover recipes, stories, and insights from our culinary journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                alt="Traditional spices"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="font-playfair text-xl font-semibold text-accent-dark mb-3">
                  The Art of Vegetarian Cooking
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Discover the secrets behind our flavorful vegetarian dishes
                  and the traditional spices that make them special.
                </p>
                <div className="text-sm text-accent-medium font-medium">
                  December 20, 2024
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                alt="Fresh ingredients"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="font-playfair text-xl font-semibold text-accent-dark mb-3">
                  Farm to Table Philosophy
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Learn about our commitment to sourcing fresh, local
                  ingredients and supporting regional farmers.
                </p>
                <div className="text-sm text-accent-medium font-medium">
                  December 15, 2024
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                alt="Festival celebration"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="font-playfair text-xl font-semibold text-accent-dark mb-3">
                  Celebrating Food Festivals
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Join us in celebrating traditional food festivals and seasonal
                  specialties throughout the year.
                </p>
                <div className="text-sm text-accent-medium font-medium">
                  December 10, 2024
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
