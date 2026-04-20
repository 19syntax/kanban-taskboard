import KanbanBoard from "./components/KanbanBoard";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
      </header>

      <main className="h-[calc(100vh-80px)]">
        <KanbanBoard />
      </main>
    </div>
  );
}
