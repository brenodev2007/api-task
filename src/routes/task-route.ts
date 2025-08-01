import { Router } from "express";
import { TaskController } from "../controller/taskController";

export const taskRoute = Router();
const taskController = new TaskController();

taskRoute.post("/", taskController.create);
taskRoute.get("/", taskController.getAll);
taskRoute.get("/:id", taskController.getById);
taskRoute.put("/:id", taskController.update);
taskRoute.delete("/:id", taskController.delete);
