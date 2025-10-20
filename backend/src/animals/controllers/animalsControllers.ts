import { Request, Response } from "express";
import ExcelJS from "exceljs";
import { Animal, Event } from "../../models";
import { AnimalInstance } from "../interfaces/AnimalInterface";
import { EventsAttributes } from "../interfaces/EventsInterface";

export const findAllAnimals = async (req: Request, res: Response) => {
  try {
    const animals = (await Animal.findAll({
      order: [["id", "ASC"]],
    })) as AnimalInstance[];

    const animalsWithAge = animals.map((animal) => ({
      id: animal.id,
      name: animal.name,
      species: animal.species,
      age: animal.getAge(),
    }));
    res.status(200).send(animalsWithAge);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const createAnimal = async (req: Request, res: Response) => {
  try {
    const { name, species, birth_date } = req.body;
    const animal = await Animal.create({ name, species, birth_date });
    res.status(201).send(animal);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const findOneAnimal = async (req: Request, res: Response) => {
  try {
    const animal_id = req.params.id;
    const animal = await Animal.findByPk(animal_id, {
      include: [
        { model: Event, as: "events", order: [["event_date", "DESC"]] },
      ],
    });

    if (!animal) {
      return res.status(404).send({ message: "Animal not found" });
    }

    const responseData = {
      id: animal.id,
      name: animal.name,
      species: animal.species,
      birth_date: animal.birth_date,
      age: animal.getAge(),
      events: animal.events,
    };

    res.status(200).send(responseData);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const animal_id = req.params.id;
    const { type, description, event_date } = req.body;

    const event = await Event.create({
      animal_id,
      type,
      description,
      event_date,
    });
    res.status(201).send(event);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const exportEvents = async (req: Request, res: Response) => {
  try {
    const animal = await Animal.findByPk(req.params.id, {
      include: [{ model: Event, as: "events", order: [["event_date", "ASC"]] }],
    });

    if (!animal) return res.status(404).json({ error: "Not found" });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Events");

    sheet.addRow(["Animal ID", animal.id]);
    sheet.addRow(["Name", animal.name]);
    sheet.addRow(["Species", animal.species]);
    sheet.addRow(["Birth Date", animal.birth_date?.toISOString().slice(0, 10)]);
    sheet.addRow([]);
    sheet.addRow(["Event ID", "Type", "Description", "Event Date"]);

    animal.events.forEach((ev: EventsAttributes) =>
      sheet.addRow([ev.id, ev.type, ev.description, ev.event_date])
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=animal_${animal.id}_events.xlsx`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
