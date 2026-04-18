export type TaskStatus = "todo" | "in-progress" | "done";

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}

export type TaskInput = Omit<Task, "id" | "createdAt" | "updatedAt">;

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}
