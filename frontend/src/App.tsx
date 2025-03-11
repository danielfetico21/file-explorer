import "./App.css";
import FileExplorer from "./components/FileExplorer";
import PlatformBadge from "./components/PlatformBadge";

function App() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center w-full p-6">
      <div className="max-w-5xl w-full flex flex-col h-[calc(100vh-3rem)]">
        <div className="flex flex-row items-center justify-between gap-2 w-full py-4">
          <div className="font-poppins font-bold text-xl text-white">
            File Explorer
          </div>
          <PlatformBadge />
        </div>

        <div className="flex-grow w-full bg-gray-900/60 rounded-lg p-4 shadow-lg overflow-hidden">
          <FileExplorer />
        </div>
      </div>
    </div>
  );
}

export default App;
