import InputField from "./components/layout/InputField.jsx";

import "./App.css";

function App() {
  return (
    <div className="bg-bg min-h-screen">
      <InputField
        placeholder="Enter your username"
        size="md"
        label="Username"
        error={true}
        errorMessage="Invalid username"
        disabled={false}
        aria-label="Username"
      />

      <InputField
        placeholder="Enter your username"
        size="md"
        label="Username"
        error={true}
        errorMessage="Invalid username"
        disabled={false}
      />
    </div>
  );
}

export default App;
