import React from 'react'
import Map from './Map'
import CurrentWeather from './CurrentWeather'

function Container() {
  return (
    <div className="App">        
      <h1 className="header">Weather Forecast</h1>
      <div className="container">
        <Map/>
        <CurrentWeather/>
      </div>
    </div>
  )
}

export default Container