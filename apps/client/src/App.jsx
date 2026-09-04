import React from "react";
import MobileNavDrawer from "./components/ui/MobileNavDrawer.jsx";

import Button from "./components/layout/Button.jsx";
import { Menu } from "lucide-react";
import "./App.css";
import MobileTopNavBar from "./components/ui/MobileTopNavBar.jsx";
import MobileBottomNavBar from "./components/ui/MobileBottomNavBar.jsx";

function App() {

  return (
    <div className="App">
      <MobileTopNavBar />

      <MobileBottomNavBar currentPath={window.location.pathname} />
    </div>
  );
}

export default App;
