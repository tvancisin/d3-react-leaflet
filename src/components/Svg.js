import React, { useState,useRef, useEffect } from 'react'
import * as d3 from 'd3';
import { LayerGroup, MapContainer, SVGOverlay, GeoJSON, TileLayer, Polygon, useMap, Marker, Popup } from 'react-leaflet'
import L from "leaflet";
import * as d3Geo from "d3-geo";

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

function Svg({data}) {
  function D3Layer() {
    const map = useMap();

    useEffect(() => {
      const svg = d3.select(map.getPanes().overlayPane).append("svg");
      const g = svg.append("g").attr("class", "leaflet-zoom-hide");

      //  create a d3.geo.path to convert GeoJSON to SVG
      var transform = d3Geo.geoTransform({
          point: projectPoint
        }),
        path = d3Geo.geoPath().projection(transform);

      // create path elements for each of the features
      const d3_features = g
        .selectAll("path")
        .data(geoShape.features)
        .enter()
        .append("path");

      map.on("zoom", reset);

      reset();

      // fit the SVG element to leaflet's map layer
      function reset() {
        const bounds = path.bounds(geoShape);

        const topLeft = bounds[0],
          bottomRight = bounds[1];

        svg
          .attr("width", bottomRight[0] - topLeft[0])
          .attr("height", bottomRight[1] - topLeft[1])
          .style("left", topLeft[0] + "px")
          .style("top", topLeft[1] + "px");

        g.attr(
          "transform",
          "translate(" + -topLeft[0] + "," + -topLeft[1] + ")"
        );

        // initialize the path data
        d3_features
          .attr("d", path)
          .style("fill-opacity", 0.7)
          .attr("fill", "blue");
      }

      // Use Leaflet to implement a D3 geometric transformation.
      function projectPoint(x, y) {
        const point = map.latLngToLayerPoint(new L.LatLng(y, x));
        this.stream.point(point.x, point.y);
      }
    }, []);
    return null;
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
    // }, [wresize]);

    const bounds = [
    [51.49, -0.08],
    [51.5, -0.06],
    ]

  return (
    // <svg classVjName='svg-environment'>
    // // </svg>
    // <div>{wresize}

    <MapContainer center={[-41.2858, 174.7868]} zoom={13} scrollWheelZoom={true}>
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    />
    {/* <SVGOverlay attributes={{ stroke: 'red' }} bounds={bounds}>
      <rect x="0" y="0" width="100%" height="100%" fill="blue" />
      <circle r="5" cx="5" cy="5" fill="red" />
      <text x="50%" y="50%" stroke="white">
        text
      </text>
    </SVGOverlay> */}
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

    {/* <Marker position={[51.505, -0.09]}>
        <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
    </Marker> */}
    </MapContainer>
    // </div>

  )
}

export default Svg