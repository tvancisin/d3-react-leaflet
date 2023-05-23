import React, { useState,useRef, useEffect } from 'react'
import * as d3 from 'd3';
import { LayerGroup, MapContainer, SVGOverlay, GeoJSON, TileLayer, Polygon, useMap, Marker, Popup } from 'react-leaflet'
import L from "leaflet";
import * as d3Geo from "d3-geo";

function Svg({data, otherData, indiaData}) {

  function D3Layer() {
    const [gata, setGata] = useState ([]);
    const [idata, setIdata] = useState ([]);
    
    useEffect(() => {
    d3.csv(otherData, 
      function(gata){
        return { country: gata.Country, lat: +gata.lat, long: +gata.lon, birth: +gata.Birth, floruit: +gata.Floruit }
      }).then(setGata)
    }, []);

    useEffect(()=>{
      d3.csv(indiaData,
        function (idata) {
          console.log(idata);
        }).then(setIdata)
    },[])


    const map = useMap();

    L.svg().addTo(map);
    d3.select("svg")
      .selectAll("myCircles")
      .data(gata)
      .join("circle")
        .attr("cx", d => map.latLngToLayerPoint([d.lat, d.long]).x)
        .attr("cy", d => map.latLngToLayerPoint([d.lat, d.long]).y)
        .attr("r", d => d.birth/3)
        .style("fill", "yellow")
        .attr("stroke", "yellow")
        .attr("stroke-width", 3)
        .attr("fill-opacity", .1)
    
    function update() {
      d3.selectAll("circle")
        .attr("cx", d => map.latLngToLayerPoint([d.lat, d.long]).x)
        .attr("cy", d => map.latLngToLayerPoint([d.lat, d.long]).y)
    }
  
    map.on("moveend", update)
  }
    // const [theData, settheData] = useState ([]);

    // useEffect(() => {
    //     console.log("here");
    //     d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv", 
    //     function (theData) {
    //         return { date : d3.timeParse("%Y-%m-%d")(theData.date), value : theData.value }
    //     }).then(data => settheData(data))
    // }, []);
    // console.log(theData);

  return (

    <MapContainer center={[47, 2]} zoom={3} scrollWheelZoom={true}>
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
            <Polygon pathOptions={{fillColor:"blue", weight: 0.5, fillOpacity: 0.05}} positions={coordinates} />
        )
    })
    }
    </MapContainer>
    // </div>

  )
}

export default Svg