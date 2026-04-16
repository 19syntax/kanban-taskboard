import TaskCard from "./components/TaskCard";
import type { Task } from "./types/Task";

const App = () => {
  const testTask1: Task = {
    id: "1",
    title: "Fix navigation bug",
    description: "The sidebar menu does not close on mobile devices",
    priority: "high",
    tags: ["frontend", "bug", "urgent"],
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
  };

  const testTask2: Task = {
    id: "2",
    title: "Write unit tests",
    priority: "medium",
    tags: ["backend"],
    createdAt: new Date(),
    updatedAt: new Date(),
    // No description, no due date
  };

  return (
    <>
      <TaskCard task={testTask1} />
      <TaskCard task={testTask2} />
    </>
  );
};

export default App;
