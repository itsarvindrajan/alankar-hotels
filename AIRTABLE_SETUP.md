# Airtable Setup for Alankar Hotels

This document explains how to set up your Airtable base to work with the Alankar Hotels website. The website fetches dynamic content from Airtable for menu items, restaurant ambiance images, locations, testimonials, and contact information.

## Environment Variables

Add these to your `.env` file:

```
VITE_AIRTABLE_API_KEY=your_airtable_api_key_here
VITE_AIRTABLE_BASE_ID=your_airtable_base_id_here
```

## Airtable Tables Configuration

### 1. MenuCategories Table

**Fields:**

- `name` (Single line text) - Category name (e.g., "Appetizers")
- `description` (Long text) - Optional category description
- `icon` (Single line text) - Icon name (e.g., "Utensils", "Coffee", "Heart")
- `displayOrder` (Number) - Order for displaying categories
- `isActive` (Checkbox) - Whether category is active

### 2. MenuItems Table

**Fields:**

- `name` (Single line text) - Item name
- `description` (Long text) - Item description
- `price` (Number) - Price in rupees
- `category` (Single line text) - Category name (must match MenuCategories.name)
- `isAvailable` (Checkbox) - Whether item is available
- `image` (Attachment) - Optional item image
- `tags` (Single line text) - Comma-separated tags
- `isSignature` (Checkbox) - Whether item is a signature dish
- `isLatest` (Checkbox) - Whether item is new/latest
- `createdAt` (Date) - Creation date
- `updatedAt` (Date) - Last update date

### 3. AmbianceImages Table

**Fields:**

- `title` (Single line text) - Image title
- `description` (Long text) - Optional image description
- `image` (Attachment) - The image file
- `type` (Single select) - Image type (dining, exterior, kitchen, food, events)
- `displayOrder` (Number) - Display order
- `isActive` (Checkbox) - Whether image is active
- `createdAt` (Date) - Creation date
- `updatedAt` (Date) - Last update date

### 4. Locations Table ⭐ NEW

**Fields:**

- `name` (Single line text) - Location name (e.g., "Walajapet Highway")
- `address` (Single line text) - Street address
- `area` (Single line text) - Area/locality description
- `phone` (Phone number) - Contact phone number
- `email` (Email) - Optional location email
- `services` (Multiple select) - Available services (Dine-in, Takeout, Delivery, Parking, etc.)
- `description` (Long text) - Optional location description
- `coordinates` (Long text) - JSON string with latitude/longitude (e.g., '{"latitude": 12.1234, "longitude": 79.5678}')
- `image` (Attachment) - Optional location image
- `displayOrder` (Number) - Display order
- `isActive` (Checkbox) - Whether location is active
- `operatingHours` (Long text) - JSON string with hours (see format below)
- `createdAt` (Date) - Creation date
- `updatedAt` (Date) - Last update date

**Operating Hours Format:**

```json
{
  "open": "07:00",
  "close": "22:00",
  "breaks": [
    {
      "start": "07:00",
      "end": "11:00",
      "label": "Breakfast"
    },
    {
      "start": "11:00",
      "end": "16:00",
      "label": "Lunch"
    },
    {
      "start": "18:00",
      "end": "22:00",
      "label": "Dinner"
    }
  ]
}
```

### 5. Testimonials Table ⭐ NEW

**Fields:**

- `customerName` (Single line text) - Customer's name
- `customerTitle` (Single line text) - Optional title (e.g., "Regular Customer", "Family Diner")
- `rating` (Number) - Rating out of 5 stars (1-5)
- `comment` (Long text) - Customer testimonial text
- `location` (Single line text) - Which location they visited (optional)
- `date` (Date) - Date of review/visit
- `isActive` (Checkbox) - Whether testimonial is active
- `isFeatured` (Checkbox) - Whether to show on homepage (only featured ones appear)
- `avatar` (Attachment) - Optional customer photo
- `displayOrder` (Number) - Display order
- `createdAt` (Date) - Creation date
- `updatedAt` (Date) - Last update date

### 6. ContactInfo Table ⭐ NEW

**Fields:**

- `type` (Single select) - Type of contact info (phone, email, address, hours, social)
- `label` (Single line text) - Display label (e.g., "Walajapet", "General Inquiries")
- `value` (Single line text) - The actual contact value
- `icon` (Single line text) - Optional icon name
- `displayOrder` (Number) - Display order
- `isActive` (Checkbox) - Whether info is active
- `createdAt` (Date) - Creation date
- `updatedAt` (Date) - Last update date

## Sample Data

### Locations Sample:

1. **Walajapet Highway**

   - Address: "1/220 Chennai Bangalore Hwy"
   - Area: "Walaja, Nandiyalam, Ratnagiri Kilminnal"
   - Phone: "+91 94432 26795"
   - Services: Dine-in, Parking, Takeout

2. **Ratnagiri Temple**
   - Address: "Bangalore-Chennai Hwy"
   - Area: "Near Ratnagiri Murugan Temple, Kilminnal"
   - Phone: "+91 74012 34500"
   - Services: Dine-in, Self-service

### Testimonials Sample:

1. **Priya Sharma** - Rating: 5
   - Comment: "Outstanding vegetarian food with authentic flavors. The paneer butter masala is absolutely divine. Highly recommend the Walajapet location for highway travelers."
   - Location: "Walajapet Highway"
   - isFeatured: ✓

### ContactInfo Sample:

1. **Phone** - Label: "Walajapet", Value: "+91 94432 26795"
2. **Email** - Label: "General Inquiries", Value: "info@alankarhotels.com"
3. **Hours** - Label: "Daily Operating Hours", Value: "7:00 AM - 10:00 PM"

## View Configuration

Create a "Grid view" in each table with the following settings:

### All Tables:

- **Filter:** `{isActive} = TRUE()` (only show active records)
- **Sort:** `{displayOrder}` ascending

## API Access

The website automatically fetches data from these tables using the Airtable API. If Airtable is not configured or fails, the website will fall back to static data defined in the code.

## Testing

1. Add sample data to your tables
2. Ensure `isActive` is checked for records you want to appear
3. Set appropriate `displayOrder` values
4. Test the website - you should see your Airtable data appear

## Troubleshooting

- Check browser console for error messages
- Verify your API key and base ID are correct
- Ensure table names match exactly (case-sensitive)
- Check that required fields are not empty
- Verify checkbox fields are properly set

## Features

✅ **Menu Items & Categories** - Dynamic menu with categories and items
✅ **Restaurant Ambiance** - Photo gallery organized by type  
✅ **Locations** - Dynamic location cards with services and hours
✅ **Testimonials** - Customer reviews with ratings and photos
✅ **Contact Information** - Phone numbers, emails, and operating hours
✅ **Caching** - 5-minute cache to improve performance
✅ **Fallback Data** - Website works even without Airtable
✅ **Loading States** - Smooth loading experience for users
