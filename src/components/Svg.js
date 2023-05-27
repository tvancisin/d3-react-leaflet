import * as d3 from 'd3';
import {useEffect, useRef, useState} from "react";
import { LayerGroup, MapContainer, SVGOverlay, GeoJSON, TileLayer, Polygon, useMap, Marker, Popup } from 'react-leaflet'
import L from "leaflet";
import * as d3Geo from "d3-geo";

function Svg({data, otherData, indiaData}) {

  const ref = useRef()
  // function D3Layer() {
    const [gata, setGata] = useState ([]);
    const [idata, setIdata] = useState ([]);
    
    useEffect(() => {
    d3.csv(otherData, 
      function(gata){
        return { country: gata.Country, lat: +gata.Latitude, long: +gata.Longitude, birth: +gata.Birth, floruit: +gata.Floruit }
      }).then(setGata)
    }, []);

    useEffect(()=>{
      d3.csv(indiaData,
        function (idata) {
          return { person: idata.forename, start: d3.timeParse("%Y")(idata.arrival), lat: +idata.blatitude, long: +idata.blongitude}
        }).then(setIdata)
    },[])

    let myScale = d3.scaleLinear()
      .domain([0, 275])
      .range([1.5, 100])

    // const map = useMap();

    // useEffect(()=>{
    //   L.svg().addTo(map);
    //   d3.select("svg")
    //     .selectAll("myCircles")
    //     .data(idata)
    //     .join("circle")
    //       .attr("cx", d => map.latLngToLayerPoint([d.lat, d.long]).x)
    //       .attr("cy", d => map.latLngToLayerPoint([d.lat, d.long]).y)
    //       .attr("r", 5)
    //       .style("fill", "yellow")
    //       // .attr("stroke", "yellow")
    //       .attr("stroke-width", 3)
    //       .attr("fill-opacity", .5)
      
    //   function update() {
    //     d3.selectAll("circle")
    //       .attr("cx", d => map.latLngToLayerPoint([d.lat, d.long]).x)
    //       .attr("cy", d => map.latLngToLayerPoint([d.lat, d.long]).y)
    //   }
    
    //   map.on("moveend", update)
    // },[idata])

    useEffect(()=>{
      console.log("AYAYA");
      if (idata.length == 0) {
        return;
      }
      if (ref.current == null) {
        return;
      }
      idata.sort(function(x, y){
          return d3.ascending(x.start, y.start);
      })

      const bullcrap = d3.groups(idata, d => d.start)

      console.log(bullcrap)

      const svgElement = d3.select(ref.current);
      const x = d3.scaleTime()
          .domain(d3.extent(bullcrap, function(d) { return d[0]; }))
          .range([ 0, 460 ]);

      svgElement.append("g")
          .attr("transform", `translate(0, 400)`)
          .call(d3.axisBottom(x));

      const y = d3.scaleLinear()
          .domain([0, d3.max(bullcrap, function(d) { return +d[1].length; })])
          .range([ 400, 0 ]);

      svgElement.append("g")
          .call(d3.axisLeft(y));

      svgElement.append("path")
          .datum(bullcrap)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
              .curve(d3.curveMonotoneX)
              .x(function(d) { return x(d[0]) })
              .y(function(d) { return y(d[1].length) })
              )
    },[idata, ref])


  // }
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
    <div>
      <svg
          ref={ref}
      />
    {/* <MapContainer center={[47, 2]} zoom={3} scrollWheelZoom={true}>
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
    />
    <LayerGroup>
          <D3Layer />
    </LayerGroup> */}
    
    {/* <GeoJSON data={data.features}/> */}

    {/* {data.features.map((state) => {
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
            <Polygon pathOptions={{fillColor:"none", weight: 0.5, fillOpacity: 0.05}} positions={coordinates} />
        )
    })
    } */}
    {/* </MapContainer> */}
    </div>

  )
}

export default Svg