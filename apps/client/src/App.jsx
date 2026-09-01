import NavItem from "./components/layout/NavItem.jsx";
import React from "react";
import "./App.css";

function App() {
  const [activeItem, setActiveItem] = React.useState(false);
  const handleClick = () => {
    setActiveItem(!activeItem);
  }

  return (
     
    <div className="bg-bg min-h-screen p-10">
      <div className="flex flex-col gap-4">
        <NavItem
          href="#"
          size="sm"
          icon={<svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/></svg>}
          aria-label="Home"
          active={activeItem}
          onClick={handleClick}
        />
        </div>
    </div>
  );
}

export default App;
