import express from "express";
import {
  findAllAnimals,
  createAnimal,
  findOneAnimal,
  createEvent,
  exportEvents,
} from "../controllers/animalsControllers";

const router = express.Router();

router.get("/", findAllAnimals);
router.get("/:id", findOneAnimal);
router.post("/", createAnimal);
router.post("/:id/events", createEvent);
router.get("/:id/export", exportEvents);

export default router;
