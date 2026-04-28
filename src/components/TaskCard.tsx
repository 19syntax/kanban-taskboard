import React, { forwardRef } from "react";
import type { Task } from "../types/Task";
import { format } from "date-fns";
import { useTheme } from "../contexts/ThemeContext";

interface TaskCardProps {
  task: Task;
  onDeleteTask?: (taskId: string) => void;
  onEditTask?: (task: Task) => void;
}

const TaskCard = forwardRef<HTMLInputElement, TaskCardProps>(
  ({ task, onDeleteTask, onEditTask }, ref) => {
    console.log("Rendering TaskCard:", task.id);
    const { isDarkMode } = useTheme();

    const priorityColors = {
      low: isDarkMode
        ? "bg-green-900 text-green-300"
        : "bg-green-100 text-green-700",
      medium: isDarkMode
        ? "bg-yellow-900 text-yellow-300"
        : "bg-yellow-100 text-yellow-700",
      high: isDarkMode ? "bg-red-900 text-red-300" : "bg-red-100 text-red-700",
    };

    return (
      <div
        onClick={() => onEditTask?.(task)}
        ref={ref}
        className={`p-4 rounded-lg shadow-sm border transition-shadow cursor-pointer ${
          isDarkMode
            ? "bg-gray-800 border-gray-700 hover:shadow-lg"
            : "bg-white border-gray-200 hover:shadow-md"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3
            className={`"font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            {task.title}
          </h3>
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
          <p
            className={`text-sm mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            {task.description}
          </p>
        )}
        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-2 py-1 rounded ${
                  isDarkMode
                    ? "bg-blue-900 text-blue-300"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div
          className={`flex items-center justify-between text-xs ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <span
            className={`px-2 py-1 rounded font-medium ${priorityColors[task.priority]}`}
          >
            {task.priority}
          </span>
          {task.dueDate && <span>Due: {format(task.dueDate, "MMM d")}</span>}
        </div>
      </div>
    );
  },
);

TaskCard.displayName = "TaskCard";

export default React.memo(TaskCard);
