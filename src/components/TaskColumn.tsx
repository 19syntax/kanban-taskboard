import type { Column } from "../types/Task";
import TaskCard from "./TaskCard";
// import TaskCard from "./TaskCard";

interface TaskColumnProps {
  column: Column;
}
const TaskColumn = ({ column }: TaskColumnProps) => {
  return (
    <div className="shrink-0 w-80 bg-gray-100 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg text-gray-900">{column.title}</h2>
        <span className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">
          {column.tasks.length}
        </span>
      </div>
      <div className="space-y-3">
        {column.tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
      <button className="w-full mt-4 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors">
        + Add Task
      </button>
    </div>
  );
};

export default TaskColumn;
