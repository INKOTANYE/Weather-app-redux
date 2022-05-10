import {createSlice} from '@reduxjs/toolkit'
import {getCitiesAsync} from "./cityService"

export const citiesSlice = createSlice({
    name: "cities",
    initialState: {
        item: {
            name:null,
            detail:null,
            lat:null,
            lon:null,
            temp:null,
            humidity:null,
            pressure:null,
            weather:"weather",
            icon:null,
            wind:null,
            date:null
        },
        isLoading:false,
        error:null,
        key:sessionStorage.getItem("key")
    },

    reducers: {
        selectCity: (state, action) => {
            const data = action.payload
            state.item.name = data.name
            state.item.detail = data.detail   
            state.item.lat = data.lat
            state.item.lon =  data.lon   
        },
        setKey: (state, action) => {
            state.key = action.payload  
        },
    },

    extraReducers:{
        [getCitiesAsync.pending]: (state, action) => {
            state.isLoading = true
          },
        [getCitiesAsync.fulfilled]: (state, action) => {
            const data = action.payload
            state.item.detail = data.name
            state.item.temp = data.main.temp
            state.item.humidity = data.main.humidity
            state.item.pressure = data.main.pressure
            state.item.weather = data.weather[0].description
            state.item.icon = data.weather[0].icon
            state.item.wind = data.wind.speed
            state.item.date = data.dt
            state.isLoading = false
          },
        [getCitiesAsync.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.error.message
          },
    } 
   })
 
export const {selectCity, setKey} = citiesSlice.actions
export default citiesSlice.reducer