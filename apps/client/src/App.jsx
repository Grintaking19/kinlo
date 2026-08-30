import Button from './components/layout/Button.jsx'

import './App.css'

function App() {

  return (
    <>
      <Button variant="danger" size="sm" icon={
        <span>⚠️</span>
      }>
        Click me
      </Button>
    </>
  )
}

export default App
