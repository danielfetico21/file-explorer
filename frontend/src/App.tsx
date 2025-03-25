import "./App.css";
import FileExplorer from "./components/FileExplorer";

const App = () => {
  return (
    <div className="bg-gray-950 flex flex-col items-center justify-center w-full py-12">
      <FileExplorer />
    </div>
  );
};

export default App;
