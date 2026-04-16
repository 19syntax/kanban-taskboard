import type { Task } from "../types/Task";
import { format } from "date-fns";

interface TaskCardProps {
  task: Task;
}

const PriorityColors = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
      <h3 className="font-semibold text-gray-900 mb-2">{task.title}</h3>
      {task.description && (
        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      )}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span
          className={`px-2 py-1 rounded font-medium ${PriorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      {task.dueDate && <span>Due: {format(task.dueDate, "MMM d")}</span>}
    </div>
  );
};

export default TaskCard;
