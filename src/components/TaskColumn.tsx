import React, { useEffect, useRef } from "react";
import type { Column, Task } from "../types/Task";
import TaskCard from "./TaskCard";
import { useTheme } from "../contexts/ThemeContext";
// import TaskCard from "./TaskCard";

interface TaskColumnProps {
  column: Column;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
  newestTaskId?: string | null;
}
const TaskColumn = ({
  column,
  onDeleteTask,
  onEditTask,
  newestTaskId,
}: TaskColumnProps) => {
  const taskRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const { isDarkMode } = useTheme();
  useEffect(() => {
    if (newestTaskId && taskRefs.current.has(newestTaskId)) {
      const element = taskRefs.current.get(newestTaskId);
      element?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [newestTaskId]);
  return (
    <div className="shrink-0 w-80">
      <div
        className={`rounded-lg p-4 mb-4 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <div className="flex items-center justify-between">
          <h2
            className={`font-bold text-lg ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            {column.title}
          </h2>
          <span
            className={`text-sm px-2 py-1 rounded-full ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"}`}
          >
            {column.tasks.length}
          </span>
        </div>
        <div className="space-y-3">
          {column.tasks.map((task) => (
            <TaskCard
              task={task}
              key={task.id}
              ref={(el) => {
                if (el) {
                  taskRefs.current.set(task.id, el);
                } else {
                  taskRefs.current.delete(task.id);
                }
              }}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
            />
          ))}
        </div>
        <button
          className={`w-full mt-4 p-3 border-2 border-dashed rounded-lg transition-colors ${
            isDarkMode
              ? "border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300"
              : "border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600"
          }`}
        >
          + Add Task
        </button>
      </div>
    </div>
  );
};

export default React.memo(TaskColumn);
