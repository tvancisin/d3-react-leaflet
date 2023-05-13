import React, { useState,useRef, useEffect } from 'react'
import * as d3 from 'd3';
import { MapContainer, SVGOverlay, GeoJSON, TileLayer, Polygon, Marker, Popup } from 'react-leaflet'

function Svg({data}) {
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

    <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={true}>
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <SVGOverlay attributes={{ stroke: 'red' }} bounds={bounds}>
      <rect x="0" y="0" width="100%" height="100%" fill="blue" />
      <circle r="5" cx="10" cy="10" fill="red" />
      <text x="50%" y="50%" stroke="white">
        text
      </text>
    </SVGOverlay>
    
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
            <Polygon pathOptions={{fillColor:"black", fillOpacity: 0.5}} positions={coordinates} />
        )
    })
    }

    <Marker position={[51.505, -0.09]}>
        <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
    </Marker>
    </MapContainer>
    // </div>

  )
}

export default Svg