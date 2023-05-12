import React, { useState,useRef, useEffect } from 'react'
import * as d3 from 'd3';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

function Svg() {
    const [theData, settheData] = useState ([]);
    const ref = useRef()

    useEffect(() => {
        d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv", 
        function (theData) {
            return { date : d3.timeParse("%Y-%m-%d")(theData.date), value : theData.value }
        }).then(data => settheData(data))
    }, []);
    console.log(theData);

  return (
    // <svg className='svg-environment'>
    // </svg>

    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[51.505, -0.09]}>
        <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
    </Marker>
    </MapContainer>



  )
}

export default Svg