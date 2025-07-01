import Airtable from 'airtable';
import { MenuItem, MenuCategory, AmbianceImage, AmbianceType } from '@/../../shared/schema';
import { Utensils, Coffee, Heart, Sparkles, ChefHat, Soup } from 'lucide-react';

// Icon mapping for categories
const iconMap: Record<string, any> = {
  'Utensils': Utensils,
  'Coffee': Coffee,
  'Heart': Heart,
  'Sparkles': Sparkles,
  'ChefHat': ChefHat,
  'Soup': Soup,
};

// Airtable configuration with debug logging
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;

// Initialize Airtable
const base = AIRTABLE_API_KEY && AIRTABLE_BASE_ID 
  ? new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID)
  : null;

// Cache for menu data
let menuCache: { categories: MenuCategory[]; items: MenuItem[]; lastFetch: number } | null = null;
let ambianceCache: { images: AmbianceImage[]; groupedByType: AmbianceType[]; lastFetch: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Fallback menu data (your current static data)
const fallbackMenuData: MenuCategory[] = [
  {
    id: 'appetizers',
    name: 'Appetizers',
    icon: 'Utensils',
    displayOrder: 1,
    isActive: true,
    items: [
      {
        id: 'paneer-tikka',
        name: 'Paneer Tikka',
        description: 'Marinated cottage cheese cubes grilled to perfection with aromatic spices',
        price: 180,
        category: 'appetizers',
        isAvailable: true,
        isSignature: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'samosa-chat',
        name: 'Samosa Chat',
        description: 'Crispy samosas topped with tangy chutneys and fresh herbs',
        price: 120,
        category: 'appetizers',
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'veg-spring-rolls',
        name: 'Vegetable Spring Rolls',
        description: 'Crispy rolls filled with fresh vegetables and served with sweet chili sauce',
        price: 150,
        category: 'appetizers',
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'mushroom-65',
        name: 'Mushroom 65',
        description: 'Spicy and tangy mushroom preparation, a South Indian favorite',
        price: 170,
        category: 'appetizers',
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: 'main-courses',
    name: 'Main Courses',
    icon: 'Heart',
    displayOrder: 2,
    isActive: true,
    items: [
      {
        id: 'paneer-butter-masala',
        name: 'Paneer Butter Masala',
        description: 'Rich and creamy tomato-based curry with soft cottage cheese',
        price: 220,
        category: 'main-courses',
        isAvailable: true,
        isSignature: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'dal-tadka',
        name: 'Dal Tadka',
        description: 'Traditional lentil curry tempered with aromatic spices',
        price: 160,
        category: 'main-courses',
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'veg-biryani',
        name: 'Vegetable Biryani',
        description: 'Fragrant basmati rice cooked with mixed vegetables and spices',
        price: 280,
        category: 'main-courses',
        isAvailable: true,
        isSignature: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'chole-bhature',
        name: 'Chole Bhature',
        description: 'Spicy chickpeas served with fluffy deep-fried bread',
        price: 200,
        category: 'main-courses',
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: 'desserts',
    name: 'Desserts',
    icon: 'Sparkles',
    displayOrder: 3,
    isActive: true,
    items: [
      {
        id: 'gulab-jamun',
        name: 'Gulab Jamun',
        description: 'Soft milk dumplings soaked in cardamom-flavored sugar syrup',
        price: 80,
        category: 'desserts',
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'ras-malai',
        name: 'Ras Malai',
        description: 'Delicate cottage cheese dumplings in saffron milk',
        price: 100,
        category: 'desserts',
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'kulfi',
        name: 'Kulfi',
        description: 'Traditional Indian ice cream with cardamom and pistachios',
        price: 90,
        category: 'desserts',
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'payasam',
        name: 'Payasam',
        description: 'South Indian rice pudding with jaggery and coconut',
        price: 85,
        category: 'desserts',
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: 'beverages',
    name: 'Beverages',
    icon: 'Coffee',
    displayOrder: 4,
    isActive: true,
    items: [
      {
        id: 'masala-chai',
        name: 'Masala Chai',
        description: 'Traditional spiced tea with aromatic herbs and spices',
        price: 40,
        category: 'beverages',
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'fresh-lime-soda',
        name: 'Fresh Lime Soda',
        description: 'Refreshing lime drink with soda and mint',
        price: 60,
        category: 'beverages',
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'mango-lassi',
        name: 'Mango Lassi',
        description: 'Creamy yogurt drink blended with sweet mango',
        price: 80,
        category: 'beverages',
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'filter-coffee',
        name: 'Filter Coffee',
        description: 'Authentic South Indian coffee brewed with chicory',
        price: 50,
        category: 'beverages',
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
    const records = await base('Menu_Categories').select({
      filterByFormula: '{Is_Active} = TRUE()',
      sort: [{ field: 'Display_Order', direction: 'asc' }]
    }).all();

    return records.map(record => ({
      id: record.id,
      name: record.get('Name') as string,
      description: record.get('Description') as string || undefined,
      icon: record.get('Icon') as string,
      displayOrder: record.get('Display_Order') as number,
      isActive: record.get('Is_Active') as boolean,
    }));
  } catch (error) {
    console.error('Error fetching categories from Airtable:', error);
    return [];
  }
}

// Fetch menu items from Airtable
async function fetchMenuItemsFromAirtable(): Promise<MenuItem[]> {
  if (!base) return [];
  
  try {
    const records = await base('Menu_Items').select({
      filterByFormula: '{isAvailable} = TRUE()',
      sort: [{ field: 'Name', direction: 'asc' }]
    }).all();

    const items = records.map(record => {
      const categoryValue = record.get('Category');
      
      // Handle both linked record and string category values
      let categoryId: string;
      if (Array.isArray(categoryValue) && categoryValue.length > 0) {
        // Linked record - get the record ID
        categoryId = categoryValue[0];
      } else if (typeof categoryValue === 'string') {
        // String value
        categoryId = categoryValue;
      } else {
        console.warn('Unknown category format for item:', record.get('Name'), categoryValue);
        categoryId = 'unknown';
      }

      return {
        id: record.id,
        name: record.get('Name') as string,
        description: record.get('Description') as string,
        price: record.get('Price') as number,
        category: categoryId,
        isAvailable: record.get('isAvailable') as boolean,
        image: record.get('Image') as string || undefined,
        tags: record.get('Tags') as string[] || [],
        isSignature: record.get('isSignature') as boolean || false,
        isLatest: record.get('isLatest') as boolean || false,
        createdAt: record.get('createdAt') as string || new Date().toISOString(),
        updatedAt: record.get('updatedAt') as string || new Date().toISOString(),
      };
    });

    return items;
  } catch (error) {
    console.error('Error fetching menu items from Airtable:', error);
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
        fetchMenuItemsFromAirtable()
      ]);

      if (categories.length > 0) {
        // Group items by category
        const categoriesWithItems = categories.map(category => {
          const categoryItems = items.filter(item => item.category === category.id);
          
          return {
            ...category,
            icon: iconMap[category.icon] || Utensils,
            items: categoryItems
          };
        });

        // Update cache
        menuCache = {
          categories: categoriesWithItems,
          items,
          lastFetch: Date.now()
        };

        return categoriesWithItems;
      }
    }
  } catch (error) {
    console.error('Error fetching menu data:', error);
  }

  // Fallback to static data
  return fallbackMenuData.map(category => ({
    ...category,
    icon: iconMap[category.icon] || Utensils
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
    const item = category.items?.find(item => item.id === itemId);
    if (item) return item;
  }
  return null;
}

// Function to get items by category
export async function getMenuItemsByCategory(categoryId: string): Promise<MenuItem[]> {
  const menuData = await getMenuData();
  const category = menuData.find(cat => cat.id === categoryId);
  return category?.items || [];
}

// Function to get signature dishes
export async function getSignatureDishes(): Promise<MenuItem[]> {
  const menuData = await getMenuData();
  return menuData
    .flatMap(category => category.items || [])
    .filter(item => item.isSignature);
}

// Function to get latest dishes
export async function getLatestDishes(): Promise<MenuItem[]> {
  const menuData = await getMenuData();
  return menuData
    .flatMap(category => category.items || [])
    .filter(item => item.isLatest);
}

// Fetch ambiance images from Airtable
async function fetchAmbianceImagesFromAirtable(): Promise<AmbianceImage[]> {
  if (!base) return [];
  
  try {
    const records = await base('Restaurant_Ambiance').select({
      filterByFormula: '{Is_Active} = TRUE()',
      sort: [{ field: 'Display_Order', direction: 'asc' }]
    }).all();

    return records.map(record => ({
      id: record.id,
      title: record.get('Title') as string,
      description: record.get('Description') as string || undefined,
      image: record.get('Image') as string,
      type: record.get('Type') as string,
      displayOrder: record.get('Display_Order') as number,
      isActive: record.get('Is_Active') as boolean,
      createdAt: record.get('createdAt') as string || new Date().toISOString(),
      updatedAt: record.get('updatedAt') as string || new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching ambiance images from Airtable:', error);
    return [];
  }
}

// Fallback ambiance data
const fallbackAmbianceData: AmbianceImage[] = [
  {
    id: 'entrance-1',
    title: 'Welcoming Entrance',
    description: 'Warm hospitality awaits',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    type: 'entrance',
    displayOrder: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'dining-1',
    title: 'Dining Area',
    description: 'Comfortable family seating',
    image: 'https://images.unsplash.com/photo-1530062845289-9109b2c9c868?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    type: 'dining',
    displayOrder: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'kitchen-1',
    title: 'Modern Kitchen',
    description: 'Hygienic food preparation',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    type: 'kitchen',
    displayOrder: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'private-1',
    title: 'Private Dining',
    description: 'Special occasions',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    type: 'private',
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
          lastFetch: Date.now()
        };

        return groupedByType;
      }
    }
  } catch (error) {
    console.error('Error fetching ambiance data:', error);
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
  return groupedData.flatMap(group => group.images);
}

// Function to refresh ambiance cache
export function refreshAmbianceCache(): void {
  ambianceCache = null;
}