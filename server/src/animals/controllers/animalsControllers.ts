import { Request, Response } from "express";
import * as animalService from "../services/animalsServices";

export const findAllAnimals = async (req: Request, res: Response) => {
  try {
    const animals = await animalService.getAllAnimals();
    res.status(200).send(animals);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const createAnimal = async (req: Request, res: Response) => {
  try {
    const animal = await animalService.createAnimalService(req.body);
    res.status(201).send(animal);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const findOneAnimal = async (req: Request, res: Response) => {
  try {
    const animal = await animalService.getAnimalById(req.params.id);
    if (!animal) return res.status(404).send({ message: "Animal not found" });
    res.status(200).send(animal);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = await animalService.createEventService(
      req.params.id,
      req.body
    );
    res.status(201).send(event);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const exportEvents = async (req: Request, res: Response) => {
  try {
    const workbook = await animalService.exportAnimalEvents(req.params.id);
    if (!workbook) return res.status(404).send({ message: "Animal not found" });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=animal_${req.params.id}_events.xlsx`
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
