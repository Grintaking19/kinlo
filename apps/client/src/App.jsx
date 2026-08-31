import StatBlock from "./components/layout/StatBlock.jsx";
import "./App.css";

function App() {
  
  return (
     
    <div className="bg-bg min-h-screen p-10">
      <StatBlock size="md" orientation="horizontal" gradient={false} number="42" label="Followers" />
    </div>
  );
}

export default App;
