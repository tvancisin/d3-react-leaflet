import './App.css';
import * as d3 from 'd3';
import Svg from './components/Svg';
import {world} from './data/world.js';
import otherData from './data/legacies.csv';
import india from './data/india.csv'

function App() {
  return (
    <div className="App">
      <Svg data={world} otherData={otherData} indiaData={india}/>
    </div>
  );
}

export default App;
