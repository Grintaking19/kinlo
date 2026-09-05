import TopBar from "./components/ui/TopBar.jsx";
import SideNavBar from "./components/ui/SideNavBar.jsx";
import MobileBottomNavBar from "./components/ui/MobileBottomNavBar.jsx";
import "./App.css";

function App() {

  return (
    <div className="flex min-h-screen">
      <SideNavBar />

      <div className="flex flex-col flex-1">
        <TopBar  className="sticky top-0 z-30" />
        <main className="flex-1 overflow-y-auto">
        </main>
        <MobileBottomNavBar />
      </div>
    </div>

  );
}

export default App;
