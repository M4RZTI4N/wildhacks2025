import { useState } from 'react';
import './App.css'; // Global app styles
import './index.css'; // Global styles for app container
import Home from './UIcomponents/home.jsx'; // Importing home component
import Input from './UIcomponents/input.jsx'; // Importing input component
import level from './UIcomponents/level.jsx';
import output from './UIcomponents/output.jsx';

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="app-container">
      {/* <Home /> */}
      <Input />
    </div>
  );
}

export default App;
