import { useEffect, useRef, useState } from "react";
import type { Task, TaskInput, TaskPriority, TaskStatus } from "../types/Task";
import { useTheme } from "../contexts/ThemeContext";

interface EditTaskFormProps {
  task: Task;
  onUpdate: (taskId: string, updates: TaskInput) => void;
  onClose: () => void;
}
export default function EditTaskForm({
  task,
  onUpdate,
  onClose,
}: EditTaskFormProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState<TaskPriority>(task.priority);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [tags, setTags] = useState(task.tags.join(", "));
  const [dueDate, setDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "",
  );
  const { isDarkMode } = useTheme();
  const inputTitleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputTitleRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const updates: TaskInput = {
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      status,
      tags: tagArray,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    };

    onUpdate(task.id, updates);

    onClose();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className={`block text-sm font-medium mb-1 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Title: <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            ref={inputTitleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "border-gray-300 text-gray-900"
            }`}
            placeholder="Enter task Title"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className={`block text-sm font-medium mb-1 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Description: <span className="text-red-500"></span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "border-gray-300 text-gray-900"
            }`}
            placeholder="Enter task description"
          />
        </div>
        <div>
          <label
            htmlFor="priority"
            className={`block text-sm font-medium mb-1 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "border-gray-300 text-gray-900"
            }`}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="status"
            className={`block text-sm font-medium mb-1 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "border-gray-300 text-gray-900"
            }`}
          >
            <option value="todo">To do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="priority"
            className={`block text-sm font-medium mb-1 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Tags
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "border-gray-300 text-gray-900"
            }`}
            placeholder="frontend, bug, urgent(comma-separated)"
          />
          <p className="text-xs text-gray-500 mt-1">
            Separate tags with commas
          </p>
        </div>
        <div>
          <label
            htmlFor="dueDate"
            className={`block text-sm font-medium mb-1 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {" "}
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "border-gray-300 text-gray-900"
            }`}
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              isDarkMode
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
}
