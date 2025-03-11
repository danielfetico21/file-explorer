import "./App.css";
import PlatformBadge from "./components/PlatformBadge";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-ce<nter w-full p-6">
      <div className="flex flex-row items-center justify-center gap-2">
        <h1 className="font-poppins font-bold !text-2xl">File Explorer</h1>
        <PlatformBadge />
      </div>
    </div>
  );
}

export default App;
