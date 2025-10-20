import { Animal } from "./animal";
import { Event } from "./event";

Animal.hasMany(Event, {
  foreignKey: "animal_id",
  as: "events",
});
Event.belongsTo(Animal, {
  foreignKey: "animal_id",
  as: "animal",
});

export { Animal, Event };
