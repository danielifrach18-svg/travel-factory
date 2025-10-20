import ExcelJS from "exceljs";
import { Animal, Event } from "../../models";
import { AnimalInstance } from "../interfaces/Animal.Interface";
import { EventAttributes } from "../interfaces/Event.Interface";

export const getAllAnimals = async (): Promise<any[]> => {
  const animals = (await Animal.findAll({
    order: [["id", "ASC"]],
  })) as AnimalInstance[];

  return animals.map((animal) => ({
    id: animal.id,
    name: animal.name,
    species: animal.species,
    age: animal.getAge(),
  }));
};

export const createAnimalService = async (data: {
  name: string;
  species: string;
  birth_date: string;
}) => {
  return Animal.create(data);
};

export const getAnimalById = async (animal_id: string) => {
  const animal = await Animal.findByPk(animal_id, {
    include: [{ model: Event, as: "events", order: [["event_date", "DESC"]] }],
  });

  if (!animal) return null;

  return {
    id: animal.id,
    name: animal.name,
    species: animal.species,
    birth_date: animal.birth_date,
    age: animal.getAge(),
    events: animal.events,
  };
};

export const createEventService = async (
  animal_id: string,
  data: { type: string; description: string; event_date: string }
) => {
  return Event.create({ animal_id, ...data });
};

export const exportAnimalEvents = async (animal_id: string) => {
  const animal = await Animal.findByPk(animal_id, {
    include: [{ model: Event, as: "events", order: [["event_date", "ASC"]] }],
  });

  if (!animal) return null;

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Events");

  sheet.addRow(["Animal ID", animal.id]);
  sheet.addRow(["Name", animal.name]);
  sheet.addRow(["Species", animal.species]);
  sheet.addRow(["Birth Date", animal.birth_date?.toISOString().slice(0, 10)]);
  sheet.addRow([]);
  sheet.addRow(["Event ID", "Type", "Description", "Event Date"]);

  animal.events.forEach((ev: EventAttributes) =>
    sheet.addRow([ev.id, ev.type, ev.description, ev.event_date])
  );

  return workbook;
};
