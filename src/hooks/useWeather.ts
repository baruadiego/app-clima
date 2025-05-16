import { z } from "zod";
import axios from "axios";
import { useLocationStore } from "../stores/LocationStore";
import { Location, Weather } from "../types";

export const weatherResponse = z.object({
    weather: z.array (
        z.object({
           icon: z.string()
        })
    ),
    main: z.object ({
        temp: z.number(),
        temp_min: z.number(),
        temp_max: z.number(),
    }),
    name: z.string()
})

export const initialWeather: Weather = {
    weather: [{
        icon: ''
    }],
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0
    },
    name: ''
}

export default function useWeather () {
    const { setNotFound, setWeather, setLoading, setNight } = useLocationStore()
    const fetchWeather = async (data: Location) => {
        setLoading(true)
        const appId = import.meta.env.VITE_API_KEY
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${data.state},${data.country}&appid=${appId}`
        
        try {
            const {data} = await axios(geoUrl)
            if (!data[0]){
                setNotFound(true)
                return
            }

            setNotFound(false)
            const lat = data[0].lat
            const lon = data[0].lon

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            const {data: weather} = await axios(weatherUrl)
            const result = weatherResponse.safeParse(weather)

            if(result.success){
                setWeather(result.data)
                result.data.weather[0].icon.includes('n') ? setNight(true) : setNight(false)
            }
            
        }catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }

    }
    return{
        fetchWeather
    }
}