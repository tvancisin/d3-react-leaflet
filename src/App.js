import './App.css';
import Svg from './components/Svg';
import {statesData} from './data/UScountries.js';

function App() {
  return (
    <div className="App">
      <Svg data={statesData} />
    </div>
  );
}

export default App;
