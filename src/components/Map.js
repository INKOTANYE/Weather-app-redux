import { MapContainer, GeoJSON, Marker, Popup} from 'react-leaflet'
import React, { useEffect, useState } from 'react'
import cities from "../redux/data/cities.json"
import "leaflet/dist/leaflet.css"
import { useSelector, useDispatch } from "react-redux"
import {selectCity} from "../redux/cities/citiesSlice"
import {
  getCitiesAsync
} from "../redux/cities/cityService.js"
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import {usePosition} from "use-position"
import axios from "axios"



function Map() {
    const dispatch = useDispatch()
    const lat = useSelector((state) => state.cities.item.lat)
    const lon = useSelector((state) => state.cities.item.lon)
    const temp = useSelector((state) => state.cities.item.temp)
    const icon = useSelector((state) => state.cities.item.icon)
    const {latitude, longitude}=usePosition()
    const [position, setPosition] = useState([0,0])

    const getCurrentCity = async (latitude, longitude) => {
      try {
        const {data}=await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        dispatch(selectCity({name:data.city, lat:data.latitude, lon:data.longitude}))  
        var newPosition = []
        newPosition.push(data.latitude, data.longitude)
        setPosition(newPosition)  
        
      } catch {
      alert("LOCATION CANNOT BE FOUND! PLEASE LOCATION ON THE MAP")}   
  }

    useEffect(() => {
      lat && lon ?
      dispatch(getCitiesAsync({lat, lon}))  
      :
      getCurrentCity(latitude, longitude)  
    }, [lat, lon])


    const handleClick = (e) => {
      var coord = e.latlng;
      var lat = coord.lat;
      var lon = coord.lng;
      var name = e.target.feature.properties.name
      dispatch(selectCity({name, lat, lon}))  
      var newPosition = []
      newPosition.push(lat, lon)
      setPosition(newPosition)
    }

    const cityStyle = {
        fillColor: "red",
        color:"black",
        weight: 2,
    }

   const onEachCity = (city, layer) => {
        const cityName = city.properties.name;

        layer.bindTooltip(cityName, {
            permanent:true,
            direction:"center",
            className:"no-background"
        })
        
        layer.options.fillOpacity = Math.random(); 

        layer.on({
            mouseover: (e) => {            
                e.target.setStyle({
                    fillColor:"blue",
                    fillOpacity:0.2,                      
                    weight: 4,
                })   
            },

            mouseout: (e) => {
              e.target.setStyle({
                  fillColor:"red",
                  fillOpacity:Math.random(),
                  weight: 2,                   
              })   
            },
            
            click: (e) => {
             handleClick(e)         
            }              
        });
    };

  return (
    <div>
        <MapContainer 
                className="map"
               style={{ width:"70vw", height:"70vh", backgroundColor:"rgb(217, 224, 226)" }} 
                zoom={1} 
                scrollWheelZoom={true}
                //maxZoom={6}
                minZoom={6}
                center={[39.626995,35.719975]}
                >
            <GeoJSON 
                data={cities.features}
                style={cityStyle}
                onEachFeature={onEachCity} 
            />       
            <Marker position={position} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [0, -40]})}>
              <Popup>
                <div className='popup'>
                   <img src ={icon ?`http://openweathermap.org/img/w/${icon}.png` : ""} alt="wthr img" />
                   <span>{(temp - 273.15).toFixed(0)}&deg;</span>
                </div>
              </Popup>
            </Marker>  
        </MapContainer>
    </div>
  )
}

export default Map