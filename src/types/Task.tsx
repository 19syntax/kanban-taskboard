export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}
