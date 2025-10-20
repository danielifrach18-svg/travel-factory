export interface Event {
  id?: number;
  animal_id?: number;
  type: "Visit" | "Treatment" | "Observation";
  description: string;
  event_date: string;
}

export interface Animal {
  id?: number;
  name: string;
  species: string;
  birth_date: string;
  age?: number;
  events?: Event[];
}
