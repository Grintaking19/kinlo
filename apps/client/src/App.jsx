import Avatar from "./components/layout/Avatar";
import "./App.css";

function App() {
  return (
    <div className="bg-bg min-h-screen">
      <Avatar size="lg" alt="Large User Avatar" />
      <Avatar size="md" alt="Medium User Avatar" />
      <Avatar size="sm" alt="Small User Avatar" />
    </div>
  );
}

export default App;
