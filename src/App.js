import './App.css';
import * as d3 from 'd3';
import Svg from './components/Svg';
import {world} from './data/world.js';
import otherData from './data/empire.csv';

function App() {
  return (
    <div className="App">
      <Svg data={world} otherData={otherData}/>
    </div>
  );
}

export default App;
