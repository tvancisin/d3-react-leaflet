import './App.css';
import * as d3 from 'd3';
import Svg from './components/Svg';
import {world} from './data/world.js';
import otherData from './data/colonies.csv';
import birth from './data/new_bio_colonies_birth.json'

function App() {
  return (
    <div className="App">
      <Svg data={world} otherData={otherData} birthData={birth}/>
    </div>
  );
}

export default App;
