import { Utensils, Coffee, Heart, Sparkles } from "lucide-react";

export const menuItems = [
  {
    name: "Appetizers",
    icon: Utensils,
    items: [
      {
        name: "Paneer Tikka",
        description: "Marinated cottage cheese cubes grilled to perfection with aromatic spices",
        price: 180,
      },
      {
        name: "Samosa Chat",
        description: "Crispy samosas topped with tangy chutneys and fresh herbs",
        price: 120,
      },
      {
        name: "Vegetable Spring Rolls",
        description: "Crispy rolls filled with fresh vegetables and served with sweet chili sauce",
        price: 150,
      },
      {
        name: "Mushroom 65",
        description: "Spicy and tangy mushroom preparation, a South Indian favorite",
        price: 170,
      },
    ],
  },
  {
    name: "Main Courses",
    icon: Heart,
    items: [
      {
        name: "Paneer Butter Masala",
        description: "Rich and creamy tomato-based curry with soft cottage cheese",
        price: 220,
      },
      {
        name: "Dal Tadka",
        description: "Traditional lentil curry tempered with aromatic spices",
        price: 160,
      },
      {
        name: "Vegetable Biryani",
        description: "Fragrant basmati rice cooked with mixed vegetables and spices",
        price: 280,
      },
      {
        name: "Chole Bhature",
        description: "Spicy chickpeas served with fluffy deep-fried bread",
        price: 200,
      },
    ],
  },
  {
    name: "Desserts",
    icon: Sparkles,
    items: [
      {
        name: "Gulab Jamun",
        description: "Soft milk dumplings soaked in cardamom-flavored sugar syrup",
        price: 80,
      },
      {
        name: "Ras Malai",
        description: "Delicate cottage cheese dumplings in saffron milk",
        price: 100,
      },
      {
        name: "Kulfi",
        description: "Traditional Indian ice cream with cardamom and pistachios",
        price: 90,
      },
      {
        name: "Payasam",
        description: "South Indian rice pudding with jaggery and coconut",
        price: 85,
      },
    ],
  },
  {
    name: "Beverages",
    icon: Coffee,
    items: [
      {
        name: "Masala Chai",
        description: "Traditional spiced tea with aromatic herbs and spices",
        price: 40,
      },
      {
        name: "Fresh Lime Soda",
        description: "Refreshing lime drink with soda and mint",
        price: 60,
      },
      {
        name: "Mango Lassi",
        description: "Creamy yogurt drink blended with sweet mango",
        price: 80,
      },
      {
        name: "Filter Coffee",
        description: "Authentic South Indian coffee brewed with chicory",
        price: 50,
      },
    ],
  },
];
