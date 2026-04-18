import { useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import Modal from "./components/Modal";

export default function App() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
      </header>

      <main className="h-[calc(100vh-80px)]">
        {/* <KanbanBoard /> */}
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(!isOpen)}
          title="Fix Bug"
        />
      </main>
    </div>
  );
}
