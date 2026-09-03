import React from "react";
import MobileNavDrawer from "./components/ui/MobileNavDrawer.jsx";
import Button from "./components/layout/Button.jsx";
import { Menu } from "lucide-react";
import "./App.css";

function App() {

  return (
    <div className="App">
      <MobileNavDrawer currentPath="/" />
    </div>
  );
}

export default App;
