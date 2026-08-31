import IconButton from "./components/layout/IconButton";
import "./App.css";

function App() {
  return <div className="bg-bg min-h-screen">
    <IconButton
      icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="rounded-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>}
      aria-label="Add"
      size="md"
      active={false}
      disabled={false}
      className="rounded-full"
    />
  </div>;
}

export default App;
