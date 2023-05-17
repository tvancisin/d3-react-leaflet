import React, { useState,useRef, useEffect } from 'react'
import * as d3 from 'd3';
import { LayerGroup, MapContainer, SVGOverlay, GeoJSON, TileLayer, Polygon, useMap, Marker, Popup } from 'react-leaflet'
import L from "leaflet";
import * as d3Geo from "d3-geo";


var markers = [
  {long: 9.083, lat: 42.149}, // corsica
  {long: 7.26, lat: 43.71}, // nice
  {long: 2.349, lat: 48.864}, // Paris
  {long: -1.397, lat: 43.664}, // Hossegor
  {long: 3.075, lat: 50.640}, // Lille
  {long: -3.83, lat: 48}, // Morlaix
];

const geoShape = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [174.78, -41.29],
            [174.79, -41.29],
            [174.79, -41.28],
            [174.78, -41.28],
            [174.78, -41.29]
          ]
        ]
      }
    }
  ]
}

const wndw = window.innerWidth;
const wndh = window.innerHeight;

function Svg({data, otherData}) {

  // useEffect(()=>{

  // },[])

  // d3.csv(otherData, function(data) { console.log(data); });
  // const [theData, settheData] = useState();

  function D3Layer() {
    const [gata, setGata] = useState();
    const map = useMap();

    useEffect(() => {
      d3.csv(otherData, 
      function (data) {
        console.log(typeof data.lat);
        return data
      }).then(data => setGata(data))

      L.svg().addTo(map);

      d3.select("svg")
        .selectAll("myCircles")
        .data(markers)
        .join("circle")
          .attr("cx", d => map.latLngToLayerPoint([d.lat, d.long]).x)
          .attr("cy", d => map.latLngToLayerPoint([d.lat, d.long]).y)
          .attr("r", 14)
          .style("fill", "red")
          .attr("stroke", "red")
          .attr("stroke-width", 3)
          .attr("fill-opacity", .4)
      
      function update() {
        d3.selectAll("circle")
          .attr("cx", d => map.latLngToLayerPoint([d.lat, d.long]).x)
          .attr("cy", d => map.latLngToLayerPoint([d.lat, d.long]).y)
      }
    
    map.on("moveend", update)

    }, []);
  }
    // const [theData, settheData] = useState ([]);
    // const ref = useRef()

    // const [wresize, setwresize] = useState([window.innerWidth])

    // const resiii = function () {
    //     setwresize(window.innerWidth)
    // }
    // useEffect(()=>{
    //     window.addEventListener("resize", resiii)
    // },[])

    // useEffect(() => {
    //     console.log("here");
    //     d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv", 
    //     function (theData) {
    //         return { date : d3.timeParse("%Y-%m-%d")(theData.date), value : theData.value }
    //     }).then(data => settheData(data))
    // }, []);
    // console.log(theData);

  return (

    <MapContainer center={[47, 2]} zoom={5} scrollWheelZoom={true}>
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    />
    <LayerGroup>
          <D3Layer />
    </LayerGroup>
    
    {/* <GeoJSON data={data.features}/> */}

    {data.features.map((state) => {
        const coordinates = state.geometry.coordinates.map((item)=> {
          return item[0].length === 2 ? item.map((item)=>[item[1],item[0]]) : item[0].map((item)=>[item[1],item[0]])
          // if (item[0].length === 2){
          //   return item.map((item)=>[item[1],item[0]])
          // }
          // else{
          //   return item[0].map((item)=>[item[1],item[0]])
          // }
        })

        return (
            <Polygon pathOptions={{fillColor:"blue", weight: 1, fillOpacity: 0.05}} positions={coordinates} />
        )
    })
    }
    </MapContainer>
    // </div>

  )
}

export default Svg