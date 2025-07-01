import Airtable from "airtable";
import {
  MenuItem,
  MenuCategory,
  AmbianceImage,
  AmbianceType,
  Location,
  Testimonial,
  ContactInfo,
} from "@/../../shared/schema";
import { Utensils, Coffee, Heart, Sparkles, ChefHat, Soup } from "lucide-react";

// Icon mapping for categories
const iconMap: Record<string, any> = {
  Utensils: Utensils,
  Coffee: Coffee,
  Heart: Heart,
  Sparkles: Sparkles,
  ChefHat: ChefHat,
  Soup: Soup,
};

// Airtable configuration with debug logging
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;

// Initialize Airtable
const base =
  AIRTABLE_API_KEY && AIRTABLE_BASE_ID
    ? new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID)
    : null;

// Cache for menu data
let menuCache: {
  categories: MenuCategory[];
  items: MenuItem[];
  lastFetch: number;
} | null = null;
let ambianceCache: {
  images: AmbianceImage[];
  groupedByType: AmbianceType[];
  lastFetch: number;
} | null = null;
let locationsCache: { locations: Location[]; lastFetch: number } | null = null;
let testimonialsCache: {
  testimonials: Testimonial[];
  lastFetch: number;
} | null = null;
let contactInfoCache: { contactInfo: ContactInfo[]; lastFetch: number } | null =
  null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Fallback menu data (your current static data)
const fallbackMenuData: MenuCategory[] = [
  {
    id: "appetizers",
    name: "Appetizers",
    icon: "Utensils",
    displayOrder: 1,
    isActive: true,
    items: [
      {
        id: "paneer-tikka",
        name: "Paneer Tikka",
        description:
          "Marinated cottage cheese cubes grilled to perfection with aromatic spices",
        price: 180,
        category: "appetizers",
        isAvailable: true,
        isSignature: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "samosa-chat",
        name: "Samosa Chat",
        description:
          "Crispy samosas topped with tangy chutneys and fresh herbs",
        price: 120,
        category: "appetizers",
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "veg-spring-rolls",
        name: "Vegetable Spring Rolls",
        description:
          "Crispy rolls filled with fresh vegetables and served with sweet chili sauce",
        price: 150,
        category: "appetizers",
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "mushroom-65",
        name: "Mushroom 65",
        description:
          "Spicy and tangy mushroom preparation, a South Indian favorite",
        price: 170,
        category: "appetizers",
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: "main-courses",
    name: "Main Courses",
    icon: "Heart",
    displayOrder: 2,
    isActive: true,
    items: [
      {
        id: "paneer-butter-masala",
        name: "Paneer Butter Masala",
        description:
          "Rich and creamy tomato-based curry with soft cottage cheese",
        price: 220,
        category: "main-courses",
        isAvailable: true,
        isSignature: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "dal-tadka",
        name: "Dal Tadka",
        description: "Traditional lentil curry tempered with aromatic spices",
        price: 160,
        category: "main-courses",
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "veg-biryani",
        name: "Vegetable Biryani",
        description:
          "Fragrant basmati rice cooked with mixed vegetables and spices",
        price: 280,
        category: "main-courses",
        isAvailable: true,
        isSignature: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "chole-bhature",
        name: "Chole Bhature",
        description: "Spicy chickpeas served with fluffy deep-fried bread",
        price: 200,
        category: "main-courses",
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    icon: "Sparkles",
    displayOrder: 3,
    isActive: true,
    items: [
      {
        id: "gulab-jamun",
        name: "Gulab Jamun",
        description:
          "Soft milk dumplings soaked in cardamom-flavored sugar syrup",
        price: 80,
        category: "desserts",
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "ras-malai",
        name: "Ras Malai",
        description: "Delicate cottage cheese dumplings in saffron milk",
        price: 100,
        category: "desserts",
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "kulfi",
        name: "Kulfi",
        description:
          "Traditional Indian ice cream with cardamom and pistachios",
        price: 90,
        category: "desserts",
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "payasam",
        name: "Payasam",
        description: "South Indian rice pudding with jaggery and coconut",
        price: 85,
        category: "desserts",
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: "beverages",
    name: "Beverages",
    icon: "Coffee",
    displayOrder: 4,
    isActive: true,
    items: [
      {
        id: "masala-chai",
        name: "Masala Chai",
        description: "Traditional spiced tea with aromatic herbs and spices",
        price: 40,
        category: "beverages",
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "fresh-lime-soda",
        name: "Fresh Lime Soda",
        description: "Refreshing lime drink with soda and mint",
        price: 60,
        category: "beverages",
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "mango-lassi",
        name: "Mango Lassi",
        description: "Creamy yogurt drink blended with sweet mango",
        price: 80,
        category: "beverages",
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "filter-coffee",
        name: "Filter Coffee",
        description: "Authentic South Indian coffee brewed with chicory",
        price: 50,
        category: "beverages",
        isAvailable: true,
        isLatest: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  },
];

// Fetch categories from Airtable
async function fetchCategoriesFromAirtable(): Promise<MenuCategory[]> {
  if (!base) return [];

  try {
    const records = await base("Menu_Categories")
      .select({
        filterByFormula: "{Is_Active} = TRUE()",
        sort: [{ field: "Display_Order", direction: "asc" }],
      })
      .all();

    return records.map((record) => ({
      id: record.id,
      name: record.get("Name") as string,
      description: (record.get("Description") as string) || undefined,
      icon: record.get("Icon") as string,
      displayOrder: record.get("Display_Order") as number,
      isActive: record.get("Is_Active") as boolean,
    }));
  } catch (error) {
    console.error("Error fetching categories from Airtable:", error);
    return [];
  }
}

// Fetch menu items from Airtable
async function fetchMenuItemsFromAirtable(): Promise<MenuItem[]> {
  if (!base) return [];

  try {
    const records = await base("Menu_Items")
      .select({
        filterByFormula: "{isAvailable} = TRUE()",
        sort: [{ field: "Name", direction: "asc" }],
      })
      .all();

    const items = records.map((record) => {
      const categoryValue = record.get("Category");

      // Handle both linked record and string category values
      let categoryId: string;
      if (Array.isArray(categoryValue) && categoryValue.length > 0) {
        // Linked record - get the record ID
        categoryId = categoryValue[0];
      } else if (typeof categoryValue === "string") {
        // String value
        categoryId = categoryValue;
      } else {
        console.warn(
          "Unknown category format for item:",
          record.get("Name"),
          categoryValue
        );
        categoryId = "unknown";
      }

      return {
        id: record.id,
        name: record.get("Name") as string,
        description: record.get("Description") as string,
        price: record.get("Price") as number,
        category: categoryId,
        isAvailable: record.get("isAvailable") as boolean,
        image: (record.get("Image") as string) || undefined,
        tags: (record.get("Tags") as string[]) || [],
        isSignature: (record.get("isSignature") as boolean) || false,
        isLatest: (record.get("isLatest") as boolean) || false,
        createdAt:
          (record.get("createdAt") as string) || new Date().toISOString(),
        updatedAt:
          (record.get("updatedAt") as string) || new Date().toISOString(),
      };
    });

    return items;
  } catch (error) {
    console.error("Error fetching menu items from Airtable:", error);
    return [];
  }
}

// Main function to get menu data
export async function getMenuData(): Promise<MenuCategory[]> {
  // Check cache first
  if (menuCache && Date.now() - menuCache.lastFetch < CACHE_DURATION) {
    return menuCache.categories;
  }

  try {
    // Try to fetch from Airtable
    if (base) {
      const [categories, items] = await Promise.all([
        fetchCategoriesFromAirtable(),
        fetchMenuItemsFromAirtable(),
      ]);

      if (categories.length > 0) {
        // Group items by category
        const categoriesWithItems = categories.map((category) => {
          const categoryItems = items.filter(
            (item) => item.category === category.id
          );

          return {
            ...category,
            icon: iconMap[category.icon] || Utensils,
            items: categoryItems,
          };
        });

        // Update cache
        menuCache = {
          categories: categoriesWithItems,
          items,
          lastFetch: Date.now(),
        };

        return categoriesWithItems;
      }
    }
  } catch (error) {
    console.error("Error fetching menu data:", error);
  }

  // Fallback to static data
  return fallbackMenuData.map((category) => ({
    ...category,
    icon: iconMap[category.icon] || Utensils,
  }));
}

// Function to refresh menu cache
export function refreshMenuCache(): void {
  menuCache = null;
}

// Function to get a specific menu item
export async function getMenuItem(itemId: string): Promise<MenuItem | null> {
  const menuData = await getMenuData();
  for (const category of menuData) {
    const item = category.items?.find((item) => item.id === itemId);
    if (item) return item;
  }
  return null;
}

// Function to get items by category
export async function getMenuItemsByCategory(
  categoryId: string
): Promise<MenuItem[]> {
  const menuData = await getMenuData();
  const category = menuData.find((cat) => cat.id === categoryId);
  return category?.items || [];
}

// Function to get signature dishes
export async function getSignatureDishes(): Promise<MenuItem[]> {
  const menuData = await getMenuData();
  return menuData
    .flatMap((category) => category.items || [])
    .filter((item) => item.isSignature);
}

// Function to get latest dishes
export async function getLatestDishes(): Promise<MenuItem[]> {
  const menuData = await getMenuData();
  return menuData
    .flatMap((category) => category.items || [])
    .filter((item) => item.isLatest);
}

// Fetch ambiance images from Airtable
async function fetchAmbianceImagesFromAirtable(): Promise<AmbianceImage[]> {
  if (!base) return [];

  try {
    const records = await base("Restaurant_Ambiance")
      .select({
        filterByFormula: "{Is_Active} = TRUE()",
        sort: [{ field: "Display_Order", direction: "asc" }],
      })
      .all();

    return records.map((record) => ({
      id: record.id,
      title: record.get("Title") as string,
      description: (record.get("Description") as string) || undefined,
      image: record.get("Image") as string,
      type: record.get("Type") as string,
      displayOrder: record.get("Display_Order") as number,
      isActive: record.get("Is_Active") as boolean,
      createdAt:
        (record.get("createdAt") as string) || new Date().toISOString(),
      updatedAt:
        (record.get("updatedAt") as string) || new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching ambiance images from Airtable:", error);
    return [];
  }
}

// Fallback ambiance data
const fallbackAmbianceData: AmbianceImage[] = [
  {
    id: "entrance-1",
    title: "Welcoming Entrance",
    description: "Warm hospitality awaits",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    type: "entrance",
    displayOrder: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "dining-1",
    title: "Dining Area",
    description: "Comfortable family seating",
    image:
      "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    type: "dining",
    displayOrder: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "kitchen-1",
    title: "Modern Kitchen",
    description: "Hygienic food preparation",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    type: "kitchen",
    displayOrder: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "private-1",
    title: "Private Dining",
    description: "Special occasions",
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    type: "private",
    displayOrder: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Function to group ambiance images by type
function groupAmbianceImagesByType(images: AmbianceImage[]): AmbianceType[] {
  const grouped = images.reduce((acc, image) => {
    if (!acc[image.type]) {
      acc[image.type] = [];
    }
    acc[image.type].push(image);
    return acc;
  }, {} as Record<string, AmbianceImage[]>);

  return Object.entries(grouped).map(([type, images]) => ({
    type,
    images: images.sort((a, b) => a.displayOrder - b.displayOrder),
  }));
}

// Main function to get ambiance data
export async function getAmbianceData(): Promise<AmbianceType[]> {
  // Check cache first
  if (ambianceCache && Date.now() - ambianceCache.lastFetch < CACHE_DURATION) {
    return ambianceCache.groupedByType;
  }

  try {
    // Try to fetch from Airtable
    if (base) {
      const images = await fetchAmbianceImagesFromAirtable();

      if (images.length > 0) {
        const groupedByType = groupAmbianceImagesByType(images);

        // Update cache
        ambianceCache = {
          images,
          groupedByType,
          lastFetch: Date.now(),
        };

        return groupedByType;
      }
    }
  } catch (error) {
    console.error("Error fetching ambiance data:", error);
  }

  // Fallback to static data
  return groupAmbianceImagesByType(fallbackAmbianceData);
}

// Function to get all ambiance images
export async function getAllAmbianceImages(): Promise<AmbianceImage[]> {
  // Check cache first
  if (ambianceCache && Date.now() - ambianceCache.lastFetch < CACHE_DURATION) {
    return ambianceCache.images;
  }

  const groupedData = await getAmbianceData();
  return groupedData.flatMap((group) => group.images);
}

// Function to refresh ambiance cache
export function refreshAmbianceCache(): void {
  ambianceCache = null;
}

// Fallback location data
const fallbackLocationsData: Location[] = [
  {
    id: "walajapet",
    name: "Walajapet Highway",
    address: "1/220 Chennai Bangalore Hwy",
    area: "Walaja, Nandiyalam, Ratnagiri Kilminnal",
    phone: "+91 94432 26795",
    email: "walajapet@alankarhotels.com",
    services: ["Dine-in", "Parking", "Takeout"],
    description:
      "Our flagship location on the Chennai-Bangalore highway, perfect for travelers.",
    displayOrder: 1,
    isActive: true,
    operatingHours: {
      open: "07:00",
      close: "22:00",
      breaks: [
        { start: "11:00", end: "16:00", label: "Lunch" },
        { start: "18:00", end: "22:00", label: "Dinner" },
      ],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "ratnagiri-temple",
    name: "Ratnagiri Temple",
    address: "Bangalore-Chennai Hwy",
    area: "Near Ratnagiri Murugan Temple, Kilminnal",
    phone: "+91 74012 34500",
    email: "ratnagiri@alankarhotels.com",
    services: ["Dine-in", "Self-service"],
    description:
      "Conveniently located near the famous Ratnagiri Murugan Temple.",
    displayOrder: 2,
    isActive: true,
    operatingHours: {
      open: "07:00",
      close: "22:00",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "ratnagiri-highway",
    name: "Ratnagiri Highway",
    address: "Ratnagiri Highway",
    area: "Ratnagiri Kilminnal",
    phone: "+91 99444 46344",
    email: "highway@alankarhotels.com",
    services: ["Dine-in", "Highway location"],
    description:
      "Strategic highway location for quick stops and quality meals.",
    displayOrder: 3,
    isActive: true,
    operatingHours: {
      open: "07:00",
      close: "22:00",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "thottapalayam",
    name: "Thottapalayam Vellore",
    address: "New Bus Stand, Ward 59",
    area: "Thottapalayam, Vellore",
    phone: "+91 416 420 2013",
    email: "vellore@alankarhotels.com",
    services: ["Dine-in", "Delivery"],
    description:
      "Our city center location with delivery services within Vellore.",
    displayOrder: 4,
    isActive: true,
    operatingHours: {
      open: "07:00",
      close: "22:00",
      breaks: [
        { start: "07:00", end: "11:00", label: "Breakfast" },
        { start: "11:00", end: "16:00", label: "Lunch" },
        { start: "18:00", end: "22:00", label: "Dinner" },
      ],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Fallback testimonials data
const fallbackTestimonialsData: Testimonial[] = [
  {
    id: "testimonial-1",
    customerName: "Priya Sharma",
    customerTitle: "Regular Customer",
    rating: 5,
    comment:
      "Outstanding vegetarian food with authentic flavors. The paneer butter masala is absolutely divine. Highly recommend the Walajapet location for highway travelers.",
    location: "Walajapet Highway",
    date: "2024-12-15",
    isActive: true,
    isFeatured: true,
    displayOrder: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "testimonial-2",
    customerName: "Rajesh Kumar",
    customerTitle: "Family Diner",
    rating: 5,
    comment:
      "Clean, hygienic environment with excellent service. The variety in their menu is impressive and everything tastes homemade. Perfect for family dining.",
    location: "Thottapalayam Vellore",
    date: "2024-12-10",
    isActive: true,
    isFeatured: true,
    displayOrder: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "testimonial-3",
    customerName: "Meera Iyer",
    customerTitle: "Loyal Customer",
    rating: 5,
    comment:
      "Been visiting for years and the quality never disappoints. The temple location is especially convenient and the self-service option is great for quick meals.",
    location: "Ratnagiri Temple",
    date: "2024-12-05",
    isActive: true,
    isFeatured: true,
    displayOrder: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "testimonial-4",
    customerName: "Ankit Patel",
    customerTitle: "Business Traveler",
    rating: 4,
    comment:
      "Great food quality and quick service. The location on the highway makes it perfect for travelers. Will definitely visit again.",
    location: "Ratnagiri Highway",
    date: "2024-12-01",
    isActive: true,
    isFeatured: false,
    displayOrder: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Fallback contact info data
const fallbackContactInfoData: ContactInfo[] = [
  {
    id: "phone-walajapet",
    type: "Phone",
    label: "Walajapet",
    value: "+91 94432 26795",
    icon: "Phone",
    displayOrder: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "phone-ratnagiri-temple",
    type: "Phone",
    label: "Ratnagiri Temple",
    value: "+91 74012 34500",
    icon: "Phone",
    displayOrder: 2,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "phone-ratnagiri-highway",
    type: "Phone",
    label: "Ratnagiri Highway",
    value: "+91 99444 46344",
    icon: "Phone",
    displayOrder: 3,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "phone-thottapalayam",
    type: "Phone",
    label: "Thottapalayam",
    value: "+91 416 420 2013",
    icon: "Phone",
    displayOrder: 4,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "email-info",
    type: "Email",
    label: "General Inquiries",
    value: "info@alankarhotels.com",
    icon: "Mail",
    displayOrder: 5,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "email-reservations",
    type: "Email",
    label: "Reservations",
    value: "reservations@alankarhotels.com",
    icon: "Mail",
    displayOrder: 6,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "hours-daily",
    type: "Hours",
    label: "Daily Operating Hours",
    value: "7:00 AM - 10:00 PM",
    icon: "Clock",
    displayOrder: 7,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Fetch locations from Airtable
async function fetchLocationsFromAirtable(): Promise<Location[]> {
  if (!base) {
    console.warn("Airtable not configured, using fallback locations data");
    return fallbackLocationsData;
  }

  try {
    const records = await base("Locations")
      .select({
        view: "Grid view", // Use your actual view name
        filterByFormula: "{Is_Active} = TRUE()",
        sort: [{ field: "Display_Order", direction: "asc" }],
      })
      .all();

    const locations: Location[] = records.map((record) => {
      const fields = record.fields as any;

      // Parse services from comma-separated string or array
      let services: string[] = [];
      if (fields.Services) {
        if (Array.isArray(fields.Services)) {
          services = fields.Services;
        } else if (typeof fields.Services === "string") {
          services = fields.Services.split(",").map((s: string) => s.trim());
        }
      }

      // Parse operating hours if available
      let operatingHours;
      if (fields.Operating_Hours) {
        try {
          operatingHours =
            typeof fields.Operating_Hours === "string"
              ? JSON.parse(fields.Operating_Hours)
              : fields.Operating_Hours;
        } catch (e) {
          console.warn(
            "Failed to parse operating hours for location:",
            record.id
          );
        }
      }

      // Parse coordinates if available
      let coordinates;
      if (fields.Coordinates) {
        try {
          coordinates =
            typeof fields.Coordinates === "string"
              ? JSON.parse(fields.Coordinates)
              : fields.Coordinates;
        } catch (e) {
          console.warn("Failed to parse coordinates for location:", record.id);
        }
      }

      return {
        id: record.id,
        name: fields.Name || "",
        address: fields.Address || "",
        area: fields.Area || "",
        phone: fields.Phone || "",
        email: fields.Email,
        services,
        description: fields.Description,
        coordinates,
        image: fields.Image?.[0]?.url, // Airtable attachment field
        displayOrder: fields.Display_Order || 0,
        isActive: fields.Is_Active !== false,
        operatingHours: fields.Operating_Hours,
        createdAt: fields.Created_At || new Date().toISOString(),
        updatedAt: fields.Updated_At || new Date().toISOString(),
      };
    });

    console.log(`Fetched ${locations.length} locations from Airtable`);
    return locations;
  } catch (error) {
    console.error("Error fetching locations from Airtable:", error);
    return fallbackLocationsData;
  }
}

// Fetch testimonials from Airtable
async function fetchTestimonialsFromAirtable(): Promise<Testimonial[]> {
  if (!base) {
    console.warn("Airtable not configured, using fallback testimonials data");
    return fallbackTestimonialsData;
  }

  try {
    const records = await base("Testimonials")
      .select({
        view: "Grid view", // Use your actual view name
        filterByFormula: "{Is_Active} = TRUE()",
        sort: [{ field: "Display_Order", direction: "asc" }],
      })
      .all();

    const testimonials: Testimonial[] = records.map((record) => {
      const fields = record.fields as any;

      return {
        id: record.id,
        customerName: fields.Customer_Name || "",
        customerTitle: fields.Customer_Title || "",
        rating: fields.Rating || 5,
        comment: fields.Comment || "",
        location: fields.Location || "",
        date: fields.Date || new Date().toISOString().split("T")[0],
        isActive: fields.Is_Active !== false,
        isFeatured: fields.Is_Featured === true,
        avatar: fields.avatar?.[0]?.url, // Airtable attachment field
        displayOrder: fields.Display_Order || 0,
        createdAt: fields.Created_At || new Date().toISOString(),
        updatedAt: fields.Updated_At || new Date().toISOString(),
      };
    });

    console.log(`Fetched ${testimonials.length} testimonials from Airtable`);
    return testimonials;
  } catch (error) {
    console.error("Error fetching testimonials from Airtable:", error);
    return fallbackTestimonialsData;
  }
}

// Fetch contact info from Airtable
async function fetchContactInfoFromAirtable(): Promise<ContactInfo[]> {
  if (!base) {
    console.warn("Airtable not configured, using fallback contact info data");
    return fallbackContactInfoData;
  }

  try {
    const records = await base("ContactInfo")
      .select({
        view: "Grid view", // Use your actual view name
        filterByFormula: "{Is_Active} = TRUE()",
        sort: [{ field: "Display_Order", direction: "asc" }],
      })
      .all();

    const contactInfo: ContactInfo[] = records.map((record) => {
      const fields = record.fields as any;

      return {
        id: record.id,
        type: fields.Type || "phone",
        label: fields.Label || "",
        value: fields.Value || "",
        icon: fields.Icon,
        displayOrder: fields.Display_Order || 0,
        isActive: fields.Is_Active !== false,
        createdAt: fields.Created_At || new Date().toISOString(),
        updatedAt: fields.Updated_At || new Date().toISOString(),
      };
    });

    console.log(
      `Fetched ${contactInfo.length} contact info items from Airtable`
    );
    return contactInfo;
  } catch (error) {
    console.error("Error fetching contact info from Airtable:", error);
    return fallbackContactInfoData;
  }
}

// Get locations data with caching
export async function getLocationsData(): Promise<Location[]> {
  const now = Date.now();

  // Return cached data if available and fresh
  if (locationsCache && now - locationsCache.lastFetch < CACHE_DURATION) {
    console.log("Returning cached locations data");
    return locationsCache.locations;
  }

  console.log("Fetching fresh locations data...");

  try {
    const locations = await fetchLocationsFromAirtable();

    // Update cache
    locationsCache = {
      locations,
      lastFetch: now,
    };

    return locations;
  } catch (error) {
    console.error("Error in getLocationsData:", error);

    // Return cached data if available, otherwise fallback
    if (locationsCache) {
      console.log("Returning stale cached locations data due to error");
      return locationsCache.locations;
    }

    console.log("Returning fallback locations data due to error");
    return fallbackLocationsData;
  }
}

// Get testimonials data with caching
export async function getTestimonialsData(): Promise<Testimonial[]> {
  const now = Date.now();

  // Return cached data if available and fresh
  if (testimonialsCache && now - testimonialsCache.lastFetch < CACHE_DURATION) {
    console.log("Returning cached testimonials data");
    return testimonialsCache.testimonials;
  }

  console.log("Fetching fresh testimonials data...");

  try {
    const testimonials = await fetchTestimonialsFromAirtable();

    // Update cache
    testimonialsCache = {
      testimonials,
      lastFetch: now,
    };

    return testimonials;
  } catch (error) {
    console.error("Error in getTestimonialsData:", error);

    // Return cached data if available, otherwise fallback
    if (testimonialsCache) {
      console.log("Returning stale cached testimonials data due to error");
      return testimonialsCache.testimonials;
    }

    console.log("Returning fallback testimonials data due to error");
    return fallbackTestimonialsData;
  }
}

// Get contact info data with caching
export async function getContactInfoData(): Promise<ContactInfo[]> {
  const now = Date.now();

  // Return cached data if available and fresh
  if (contactInfoCache && now - contactInfoCache.lastFetch < CACHE_DURATION) {
    console.log("Returning cached contact info data");
    return contactInfoCache.contactInfo;
  }

  console.log("Fetching fresh contact info data...");

  try {
    const contactInfo = await fetchContactInfoFromAirtable();

    // Update cache
    contactInfoCache = {
      contactInfo,
      lastFetch: now,
    };

    return contactInfo;
  } catch (error) {
    console.error("Error in getContactInfoData:", error);

    // Return cached data if available, otherwise fallback
    if (contactInfoCache) {
      console.log("Returning stale cached contact info data due to error");
      return contactInfoCache.contactInfo;
    }

    console.log("Returning fallback contact info data due to error");
    return fallbackContactInfoData;
  }
}

// Get featured testimonials
export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const testimonials = await getTestimonialsData();
  return testimonials.filter((testimonial) => testimonial.isFeatured);
}

// Get testimonials by location
export async function getTestimonialsByLocation(
  locationName: string
): Promise<Testimonial[]> {
  const testimonials = await getTestimonialsData();
  return testimonials.filter((testimonial) =>
    testimonial.location?.toLowerCase().includes(locationName.toLowerCase())
  );
}

// Get contact info by type
export async function getContactInfoByType(
  type: ContactInfo["type"]
): Promise<ContactInfo[]> {
  const contactInfo = await getContactInfoData();
  return contactInfo.filter((info) => info.type === type);
}

// Refresh all caches
export function refreshAllCaches(): void {
  menuCache = null;
  ambianceCache = null;
  locationsCache = null;
  testimonialsCache = null;
  contactInfoCache = null;
}
