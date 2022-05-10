import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getCitiesAsync = createAsyncThunk(
    "cities/getCitiesAsync", 
    async (coordinates) => {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=e6eb82e6bfaf6710a34e8007f6d84e20`)
        return res.data
    }
)



