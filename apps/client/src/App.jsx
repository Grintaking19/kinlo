import React from "react";
import ToggleButton from "./components/layout/ToggleButton";
import "./App.css";

function App() {
  const [isToggled, setIsToggled] = React.useState(false);

  return (
    <div className="bg-bg min-h-screen p-10">
      <ToggleButton
        on={isToggled}
        onChange={setIsToggled}
        aria-label="Toggle"
        disabled={false}
      />
    </div>
  );
}

export default App;
