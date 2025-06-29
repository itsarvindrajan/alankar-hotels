import { reservations, type Reservation, type InsertReservation } from "@shared/schema";

export interface IStorage {
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  getReservations(): Promise<Reservation[]>;
}

export class MemStorage implements IStorage {
  private reservations: Map<number, Reservation>;
  private currentId: number;

  constructor() {
    this.reservations = new Map();
    this.currentId = 1;
  }

  async createReservation(insertReservation: InsertReservation): Promise<Reservation> {
    const id = this.currentId++;
    const reservation: Reservation = {
      ...insertReservation,
      id,
      createdAt: new Date(),
      message: insertReservation.message || null,
    };
    this.reservations.set(id, reservation);
    return reservation;
  }

  async getReservations(): Promise<Reservation[]> {
    return Array.from(this.reservations.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }
}

export const storage = new MemStorage();
