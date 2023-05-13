import './App.css';
import Svg from './components/Svg';
import {world} from './data/world.js';

function App() {
  return (
    <div className="App">
      <Svg data={world} />
    </div>
  );
}

export default App;
