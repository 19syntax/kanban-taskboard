import type { Task } from "../types/Task";
import { format } from "date-fns";

interface TaskCardProps {
  task: Task;
  onDeleteTask?: (taskId: string) => void;
  onEditTask?: (task: Task) => void;
}

const priorityColors = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

const TaskCard = ({ task, onDeleteTask, onEditTask }: TaskCardProps) => {
  return (
    <div
      onClick={() => onEditTask?.(task)}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">{task.title}</h3>
        {onDeleteTask && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteTask(task.id);
            }}
            className="text-gray-400 hover:text-red-500 transition-colors ml-2"
            aria-label="Delete task"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
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
          className={`px-2 py-1 rounded font-medium ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
        {task.dueDate && <span>Due: {format(task.dueDate, "MMM d")}</span>}
      </div>
    </div>
  );
};

export default TaskCard;
