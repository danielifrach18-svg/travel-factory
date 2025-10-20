import { create } from "zustand";
import * as api from "../api/animals";
import { Animal } from "../interfaces/Animal.Interface";

interface AnimalsState {
  animals: Animal[];
  fetchAnimals: () => Promise<void>;
  addAnimal: (data: Animal) => Promise<void>;
}

export const useAnimalsStore = create<AnimalsState>((set) => ({
  animals: [],
  fetchAnimals: async () => {
    const res = await api.getAnimals();
    set({ animals: res.data });
  },
  addAnimal: async (data) => {
    await api.addAnimal(data);
    const res = await api.getAnimals();
    set({ animals: res.data });
  },
}));
