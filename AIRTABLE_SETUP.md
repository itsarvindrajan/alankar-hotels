# Airtable Setup Guide for Dynamic Menu System

## Overview
This guide will help you set up Airtable to manage your restaurant menu dynamically. The system will fetch menu data from your Airtable base and display it on your website.

## Prerequisites
- An Airtable account (free tier is sufficient)
- Basic understanding of Airtable bases and tables

## Step 1: Create Airtable Base
1. Go to [Airtable](https://airtable.com) and create a new base
2. Name it "Alankar Hotels Menu" or similar
3. Note down your Base ID (found in the API documentation for your base)

## Step 2: Create Tables

### Table 1: Menu_Categories
Create a table with the following fields:

| Field Name | Field Type | Description | Example Values |
|------------|------------|-------------|----------------|
| Name | Single line text | Category name | "Appetizers", "Main Courses" |
| Description | Long text | Category description | "Delicious starters to begin your meal" |
| Icon | Single select | Icon identifier | "Utensils", "Heart", "Sparkles", "Coffee", "ChefHat", "Soup" |
| Display_Order | Number | Order of display | 1, 2, 3, 4 |
| Is_Active | Checkbox | Whether category is active | ✓ (checked) |

**Sample Records:**
1. Name: "Appetizers", Icon: "Utensils", Display_Order: 1, Is_Active: ✓
2. Name: "Main Courses", Icon: "Heart", Display_Order: 2, Is_Active: ✓
3. Name: "Desserts", Icon: "Sparkles", Display_Order: 3, Is_Active: ✓
4. Name: "Beverages", Icon: "Coffee", Display_Order: 4, Is_Active: ✓

### Table 2: Menu_Items
Create a table with the following fields:

| Field Name | Field Type | Description | Example Values |
|------------|------------|-------------|----------------|
| Name | Single line text | Item name | "Paneer Tikka", "Dal Tadka" |
| Description | Long text | Item description | "Marinated cottage cheese cubes grilled to perfection" |
| Price | Number | Item price in rupees | 180, 220 |
| Category | Link to another record | Link to Menu_Categories | Select from categories |
| Is_Available | Checkbox | Whether item is available | ✓ (checked) |
| Image | URL | Optional image URL | "https://example.com/image.jpg" |
| Tags | Multiple select | Optional tags | "Spicy", "Popular", "Vegan" |
| Created_At | Created time | Auto-generated | Auto |
| Updated_At | Last modified time | Auto-generated | Auto |

**Sample Records:**
1. Name: "Paneer Tikka", Description: "Marinated cottage cheese cubes grilled to perfection with aromatic spices", Price: 180, Category: "Appetizers", Is_Available: ✓
2. Name: "Paneer Butter Masala", Description: "Rich and creamy tomato-based curry with soft cottage cheese", Price: 220, Category: "Main Courses", Is_Available: ✓

## Step 3: Get API Credentials
1. Go to your Airtable account settings
2. Generate a Personal Access Token with the following scopes:
   - `data.records:read` for your base
3. Copy your API key and Base ID

## Step 4: Configure Environment Variables
Create a `.env` file in your project root (or add to existing one):

```env
VITE_AIRTABLE_API_KEY=your_personal_access_token_here
VITE_AIRTABLE_BASE_ID=your_base_id_here
```

**Important:** Never commit your `.env` file to version control. Add it to `.gitignore`.

## Step 5: Icon Options
The system supports these icon identifiers for categories:
- `Utensils` - General dining/cutlery icon
- `Coffee` - Coffee cup icon
- `Heart` - Heart icon (good for favorites/popular)
- `Sparkles` - Sparkles icon (good for desserts/special items)
- `ChefHat` - Chef hat icon
- `Soup` - Bowl/soup icon

## Step 6: Testing
1. Add some sample data to both tables
2. Make sure `Is_Active` is checked for categories
3. Make sure `Is_Available` is checked for menu items
4. Link menu items to their appropriate categories
5. Start your development server and check if the menu loads

## Step 7: Managing Your Menu
### Adding New Items:
1. Go to the Menu_Items table
2. Add a new record with all required fields
3. Make sure to link it to the correct category
4. Check `Is_Available` to make it visible on the website

### Adding New Categories:
1. Go to the Menu_Categories table
2. Add a new record with all required fields
3. Choose an appropriate icon from the available options
4. Set the display order (higher numbers appear later)
5. Check `Is_Active` to make it visible

### Updating Prices:
1. Simply edit the Price field in the Menu_Items table
2. Changes will appear on the website within 5 minutes (due to caching)

### Temporarily Hiding Items:
1. Uncheck `Is_Available` for menu items you want to hide
2. Uncheck `Is_Active` for entire categories you want to hide

## Features
- **Caching**: Menu data is cached for 5 minutes to improve performance
- **Fallback**: If Airtable is unavailable, the system uses fallback static data
- **Real-time Updates**: Changes in Airtable appear on the website within 5 minutes
- **Error Handling**: Graceful fallback to static menu if API fails

## Troubleshooting
### Menu Not Loading from Airtable:
1. Check your API key and Base ID are correct
2. Verify table names are exactly "Menu_Categories" and "Menu_Items"
3. Check field names match exactly (case-sensitive)
4. Ensure you have the correct permissions on your API key

### Items Not Appearing:
1. Check `Is_Available` is checked for menu items
2. Check `Is_Active` is checked for categories
3. Verify items are properly linked to categories
4. Check browser console for any error messages

### Performance Issues:
- The system caches data for 5 minutes
- If you need immediate updates, restart the development server
- For production, consider implementing a webhook system for instant updates

## API Rate Limits
Airtable has rate limits:
- 5 requests per second per base
- 1,000 requests per month for free accounts

The caching system helps stay within these limits by reducing API calls.

## Support
If you encounter issues:
1. Check the browser console for error messages
2. Verify your Airtable setup matches this guide exactly
3. Test with sample data first before adding your full menu 