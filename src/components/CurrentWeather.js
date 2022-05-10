import React from 'react'
import { useSelector} from "react-redux"
import {MdLocationOn} from "react-icons/md"
import {MdWaterDrop} from "react-icons/md"
import {BiWind} from "react-icons/bi"
import {GrDebian} from "react-icons/gr"
import {ImFire} from "react-icons/im"

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

    if (isLoading) {
        return <div className='CurrentWeather' id="loading" >Loading...</div>;
    }
    
    if (error) {
        return <div className='CurrentWeather' id="loading">{error}</div>;
    }

  return (
    <div className='CurrentWeather'>
        <div><MdLocationOn/> {city}</div> 
        <div>{detail}</div>
        <div> {new Date(date*1000).toDateString()}</div>
        <div> {new Date(date*1000).toLocaleTimeString()}</div>
        <div>{<img src ={icon ?`http://openweathermap.org/img/w/${icon}.png` : ""} alt="wthr img" />}</div>
        <div><ImFire/> {(temp - 273.15).toFixed(0)}&deg;</div>
        <div>{weather.toUpperCase()}</div>
        <div><MdWaterDrop/> {humidity} %</div>
        <div><BiWind/> {wind} km/h</div>
        <div><GrDebian/> {pressure} hPa</div>  
    </div>
  )
}

export default CurrentWeather