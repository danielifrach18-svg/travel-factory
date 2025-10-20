export interface EventAttributes {
  id: number;
  type: "Visit" | "Treatment" | "Observation";
  description: string;
  event_date: string;
}
