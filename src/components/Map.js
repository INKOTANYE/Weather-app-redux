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

function Map() {
    const dispatch = useDispatch()
    const lat = useSelector((state) => state.cities.item.lat)
    const lon = useSelector((state) => state.cities.item.lon)
    const temp = useSelector((state) => state.cities.item.temp)
    const icon = useSelector((state) => state.cities.item.icon)
    const [position, setPosition] = useState(null)

    function getLocation() {
      if (navigator.geolocation) {   
        navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
          alert( "Geolocation is not supported by this browser.")
      }
    }

    function showPosition(position) {
      var latitude = position.coords.latitude 
      var longitude = position.coords.longitude;
      var name="You are here"
      dispatch(selectCity({name, lat:latitude, lon:longitude}))  
      setPosition([latitude,longitude])
    }

      useEffect(() => {
        lat && lon ?
        dispatch(getCitiesAsync({lat, lon})) 
         :
       getLocation()
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
                    fillColor:"white",
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
                style={{ width:"70vw", height:"80vh", backgroundColor:"rgb(217, 224, 226)" }} 
                zoom={1} 
                scrollWheelZoom={true}
                minZoom={6}
                center={[39.626995,35.719975]}
                >
            <GeoJSON 
                data={cities.features}
                style={cityStyle}
                onEachFeature={onEachCity} 
            />   
            {position === null ? null :
              <Marker position={position}  icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [0, -40]})}>
                <Popup>
                  <div className='popup'>
                    <img src ={icon ?`http://openweathermap.org/img/w/${icon}.png` : ""} alt="wthr img" />
                    <span>{(temp - 273.15).toFixed(0)}&deg;</span>
                  </div>
                </Popup>
              </Marker>  
            }  

        </MapContainer>
    </div>
  )
}

export default Map