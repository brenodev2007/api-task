import { Router } from "express";
import { taskRoute } from "./task-route";

export const routes = Router();

routes.use("/task", taskRoute);
