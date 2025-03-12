import "./App.css";
import FileExplorer from "./components/FileExplorer";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center w-full p-6">
      <FileExplorer />
    </div>
  );
};

export default App;
