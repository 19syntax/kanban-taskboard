import type { Task } from "../types/Task";

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Fix navigation bug",
    status: "todo",
    description: "The sidebar menu does not close on mobile devices",
    priority: "high",
    tags: ["frontend", "bug", "urgent"],
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    title: "Write unit tests",
    status: "in-progress",
    priority: "medium",
    tags: ["backend"],
    createdAt: new Date(),
    updatedAt: new Date(),
    // No description, no due date
  },
];
