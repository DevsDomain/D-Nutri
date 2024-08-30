import { Request, Response } from "express";
import Food from "../models/Food";

export const addFood = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, quantity, userId } = req.body;
    const newFood = new Food({ name, quantity, user: userId });
    await newFood.save();
    res.status(201).json(newFood);
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar alimento", error });
  }
};
