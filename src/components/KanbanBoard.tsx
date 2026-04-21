import { useState } from "react";
import type { Column, Task, TaskInput } from "../types/Task";
import { mockTasks } from "../data/MockData";
import TaskColumn from "./TaskColumn";
import Modal from "./Modal";
import CreateForm from "./CreateForm";
import EditTaskForm from "./EditTaskForm";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const handleUpdateTask = (taskId: string, updates: TaskInput) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: new Date() }
          : task,
      ),
    );
  };
  const handleCreateTask = (taskInput: TaskInput) => {
    const newTask: Task = {
      ...taskInput,
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm("Are you sure you want to delete this tasks")) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };
  const handleEditClick = (task: Task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

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
    <>
      <div className="p-6">
        <button
          onClick={() => setIsCreateModalOpen(true)}
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
            />
          ))}
        </div>
      </div>
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Task"
      >
        <CreateForm
          onSubmit={handleCreateTask}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </Modal>
      {taskToEdit && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setTaskToEdit(null);
          }}
          title="Edit Task"
        >
          <EditTaskForm
            task={taskToEdit}
            onUpdate={handleUpdateTask}
            onClose={() => {
              setIsEditModalOpen(false);
              setTaskToEdit(null);
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default KanbanBoard;
