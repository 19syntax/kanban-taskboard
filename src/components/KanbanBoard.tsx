import { useState } from "react";
import type { Column, Task } from "../types/Task";
import { mockTasks } from "../data/MockData";
import TaskColumn from "./TaskColumn";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const columns: Column[] = [
    {
      id: "todo",
      title: "To Do",
      tasks: tasks.filter((task) => task.status === "todo"),
    },
    {
      id: "in-progress",
      title: "In Progress",
      tasks: tasks.filter((task) => task.status === "in-progress"),
    },
    {
      id: "done",
      title: "Done",
      tasks: tasks.filter((task) => task.status === "done"),
    },
  ];
  return (
    <div className="flex gap-6 h-full overflow-x-auto p-6">
      {columns.map((col) => (
        <TaskColumn key={col.id} column={col} />
      ))}
    </div>
  );
};

export default KanbanBoard;
