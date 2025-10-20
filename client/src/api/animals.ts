import axios from "axios";
import { Animal, Event } from "../interfaces/Animal.Interface";

const API_URL = import.meta.env.VITE_API_URL;

export const getAnimals = () => axios.get(`${API_URL}/animals`);
export const addAnimal = (data: Animal) =>
  axios.post(`${API_URL}/animals`, data);
export const getAnimalDetails = (id: number) =>
  axios.get(`${API_URL}/animals/${id}`);
export const addEvent = (id: number, data: Event) =>
  axios.post(`${API_URL}/animals/${id}/events`, data);
export const exportAnimal = (id: number) =>
  axios.get(`${API_URL}/animals/${id}/export`, { responseType: "blob" });
