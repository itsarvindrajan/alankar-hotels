import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import { insertReservationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Reservation routes
  app.post("/api/reservations", async (req, res) => {
    try {
      const validatedData = insertReservationSchema.parse(req.body);
      const reservation = await storage.createReservation(validatedData);
      
      // In a real application, you might want to send an email here
      console.log("New reservation created:", reservation);
      
      res.json({ 
        success: true, 
        message: "Reservation created successfully",
        reservation 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid reservation data", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating reservation:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to create reservation" 
        });
      }
    }
  });

  app.get("/api/reservations", async (req, res) => {
    try {
      const reservations = await storage.getReservations();
      res.json({ success: true, reservations });
    } catch (error) {
      console.error("Error fetching reservations:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch reservations" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
