import { Request, Response } from "express";

interface Task {
  id: number;
  title: string;
  description: string;
}

let tasks: Task[] = [];
let currentId = 1;

export class TaskController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    const newTask: Task = {
      id: currentId++,
      title,
      description,
    };
    tasks.push(newTask);

    // Logic to create a task
    return res.status(201).json({ message: "Task created successfully" });
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    // Logic to get all tasks
    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }
    // For simplicity, returning a static response

    return res
      .status(200)
      .json({ message: "Tasks retrieved successfully", tasks });
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    // Logic to get a task by ID
    const task = tasks.find((task) => task.id === parseInt(id));
    if (!task) {
      return res.status(404).json({ message: `Task with ID ${id} not found` });
    }

    return res
      .status(200)
      .json({ message: `Task with ID ${id} retrieved successfully`, task });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    // Logic to update a task by ID

    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
    if (taskIndex === -1) {
      return res.status(404).json({ message: `Task with ID ${id} not found` });
    }
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }
    tasks[taskIndex] = { id: parseInt(id), title, description };
    return res.status(200).json({
      message: `Task with ID ${id} updated successfully`,
      task: tasks[taskIndex],
    });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    // Logic to delete a task by ID
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

    if (taskIndex === -1) {
      return res.status(404).json({ message: `Task with ID ${id} not found` });
    }
    tasks.splice(taskIndex, 1);
    return res
      .status(200)
      .json({ message: `Task with ID ${id} deleted successfully`, tasks });
  }
}
