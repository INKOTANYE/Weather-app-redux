import React from 'react'
import { useSelector} from "react-redux"
import {MdLocationOn} from "react-icons/md"
import {MdWaterDrop} from "react-icons/md"
import {BiWind} from "react-icons/bi"
import {GrDebian} from "react-icons/gr"
import {ImFire} from "react-icons/im"
import {BsCalendar2Date} from "react-icons/bs"
import {AiOutlineClockCircle} from "react-icons/ai"
import {MdLocationCity} from "react-icons/md"
import {BsInfoCircle} from "react-icons/bs"

function CurrentWeather() {
    const city = useSelector((state) => state.cities.item.name)
    const detail = useSelector((state) => state.cities.item.detail)
    const temp = useSelector((state) => state.cities.item.temp)
    const weather = useSelector((state) => state.cities.item.weather)
    const humidity = useSelector((state) => state.cities.item.humidity)
    const pressure = useSelector((state) => state.cities.item.pressure)
    const wind = useSelector((state) => state.cities.item.wind)
    const icon = useSelector((state) => state.cities.item.icon)
    const date = useSelector((state) => state.cities.item.date)
    const isLoading = useSelector((state) => state.cities.isLoading)
    const error = useSelector((state) => state.cities.error)
    const lat = useSelector((state) => state.cities.item.lat)
    const lon = useSelector((state) => state.cities.item.lon)

    if (isLoading) {
        return <div className='CurrentWeather' id="loading" >Loading...</div>;
    }
    
    if (error) {
        return <div className='CurrentWeather' id="loading">{error}</div>;
    }
        
    if (lat===null && lon===null) {
      return <div className='CurrentWeather' id="loading"> Please allow to access your location or select a location on the map...</div>
    }

  return (
    <div className='CurrentWeather'>
        <div><MdLocationOn className='icon'/> {city}</div> 
        <div><MdLocationCity className='icon'/> {detail}</div>
        <div> <BsCalendar2Date className='icon'/> {new Date(date*1000).toDateString()}</div>
        <div> <AiOutlineClockCircle className='icon'/> {new Date(date*1000).toLocaleTimeString()}</div>
        <div><img src ={icon ?`http://openweathermap.org/img/w/${icon}.png` : ""} alt="wthr img" /></div>
        <div><ImFire className='icon'/> {(temp - 273.15).toFixed(0)}&deg;</div>
        <div><BsInfoCircle className='icon'/> {weather.toUpperCase()}</div>
        <div><MdWaterDrop className='icon'/> {humidity} %</div>
        <div><BiWind className='icon'/> {wind} km/h</div>
        <div><GrDebian className='icon'/> {pressure} hPa</div>  
    </div>
  )
}

export default CurrentWeather