import { useCallback, useEffect, useMemo, useState } from "react";
import type { Column, Task, TaskInput } from "../types/Task";
import { mockTasks } from "../data/MockData";
import TaskColumn from "./TaskColumn";
import Modal from "./Modal";
import CreateForm from "./CreateForm";
import EditTaskForm from "./EditTaskForm";
import useLocalStorage from "../hooks/useLocalStorage";
import useToggle from "../hooks/useToggle";
import usePrevious from "../hooks/usePrevious";
import { useTheme } from "../contexts/ThemeContext";

const KanbanBoard = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("kanban-tasks", mockTasks);
  const [isCreateModalOpen, toggleCreateModal] = useToggle(false);
  const [isEditModalOpen, toggleEditModal] = useToggle(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const prevTaskCount = usePrevious(tasks.length);
  const [newestTaskId, setNewestTaskId] = useState<string | null>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (newestTaskId) {
      const timer = setTimeout(() => {
        setNewestTaskId(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [newestTaskId]);

  useEffect(() => {
    if (prevTaskCount !== undefined && prevTaskCount !== tasks.length) {
      console.log(`Task changes from ${prevTaskCount} to ${tasks.length}`);
    }
  }, [tasks.length, prevTaskCount]);

  const handleUpdateTask = useCallback((taskId: string, updates: TaskInput) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: new Date() }
          : task,
      ),
    );
  }, []);
  const handleCreateTask = useCallback(
    (taskInput: TaskInput) => {
      const newTask: Task = {
        ...taskInput,
        id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewestTaskId(newTask.id);
    },
    [setTasks],
  );

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      if (window.confirm("Are you sure you want to delete this tasks")) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      }
    },
    [setTasks],
  );

  const handleEditClick = useCallback((task: Task) => {
    setTaskToEdit(task);
    toggleEditModal();
  }, []);

  const columns = useMemo((): Column[] => {
    return [
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
  }, [tasks]);
  return (
    <>
      <div className={`p-6 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <button
          onClick={toggleCreateModal}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          + New Task
        </button>
        <div className="flex gap-6 h-full overflow-x-auto">
          {columns.map((col) => (
            <TaskColumn
              key={col.id}
              column={col}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditClick}
              newestTaskId={newestTaskId}
            />
          ))}
        </div>
      </div>
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => toggleCreateModal()}
        title="Create New Task"
      >
        <CreateForm
          onSubmit={handleCreateTask}
          onClose={() => toggleCreateModal()}
        />
      </Modal>
      {taskToEdit && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            toggleEditModal();
            setTaskToEdit(null);
          }}
          title="Edit Task"
        >
          <EditTaskForm
            task={taskToEdit}
            onUpdate={handleUpdateTask}
            onClose={() => {
              toggleEditModal();
              setTaskToEdit(null);
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default KanbanBoard;
