import Button from "./components/layout/Button.jsx";
import InputField from "./components/layout/InputField.jsx";

import "./App.css";

function App() {
  return (
    <div className="bg-bg min-h-screen">
      <InputField
        placeholder="Enter your username"
        size="md"
        icon={<span>🔍</span>} //Search Icon
      />
    </div>
  );
}

export default App;
