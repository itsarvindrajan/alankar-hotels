import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  guests: text("guests").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertReservationSchema = createInsertSchema(reservations).omit({
  id: true,
  createdAt: true,
});

export type InsertReservation = z.infer<typeof insertReservationSchema>;
export type Reservation = typeof reservations.$inferSelect;

// Keep existing user schema for compatibility
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Menu Types for Airtable Integration
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isAvailable: boolean;
  image?: string;
  tags?: string[];
  isSignature?: boolean;
  isLatest?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
  items?: MenuItem[];
}

// Restaurant Ambiance Types for Airtable Integration
export interface AmbianceImage {
  id: string;
  title: string;
  description?: string;
  image: string;
  type: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AmbianceType {
  type: string;
  images: AmbianceImage[];
}

// Zod schemas for validation
export const AmbianceImageSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  image: z.string().url("Valid image URL is required"),
  type: z.string().min(1, "Type is required"),
  displayOrder: z.number().int().min(0),
  isActive: z.boolean().default(true),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const MenuItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be positive"),
  category: z.string().min(1, "Category is required"),
  isAvailable: z.boolean().default(true),
  image: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  isSignature: z.boolean().optional(),
  isLatest: z.boolean().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const MenuCategorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  icon: z.string().min(1, "Icon is required"),
  displayOrder: z.number().int().min(0),
  isActive: z.boolean().default(true),
});

export type MenuItemInput = z.infer<typeof MenuItemSchema>;
export type MenuCategoryInput = z.infer<typeof MenuCategorySchema>;
