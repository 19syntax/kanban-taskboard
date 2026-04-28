import KanbanBoard from "./components/KanbanBoard";
import { useTheme } from "./contexts/ThemeContext";

export default function App() {
  const { isDarkMode, toogleDarkMode } = useTheme();
  return (
    <div className="min-h-screen bg-gray-50">
      <header
        className={`${isDarkMode ? "bg-gray-800 text-white border-gray-50" : "bg-white text-gray-800 border-gray-200"} border-b  p-6`}
      >
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <button
            onClick={toogleDarkMode}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isDarkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
          >
            {isDarkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </header>

      <main className="h-[calc(100vh-80px)]">
        <KanbanBoard />
      </main>
    </div>
  );
}
