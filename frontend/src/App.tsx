import "./App.css";
import FileExplorer from "./components/FileExplorer";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center w-full p-6">
      <div className="flex-grow w-full bg-gray-900/60 rounded-lg p-8 shadow-lg overflow-hidden">
        <FileExplorer />
      </div>
    </div>
  );
};

export default App;
