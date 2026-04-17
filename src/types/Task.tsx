export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}
