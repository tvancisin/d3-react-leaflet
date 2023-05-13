import './App.css';
import Svg from './components/Svg';
import {otherWorld} from './data/countries.js';

function App() {
  return (
    <div className="App">
      <Svg data={otherWorld} />
    </div>
  );
}

export default App;
