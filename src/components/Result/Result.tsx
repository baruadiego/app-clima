import { useLocationStore } from "../../stores/LocationStore"
import styles from "./Result.module.css"
import { kelvinToCelcius } from "../../helpers"
import { useEffect } from "react"

export default function Result() {
    const {location, weather, night} = useLocationStore()
    return (
        <div className={`${styles.card} ${night && styles.nightCard}`}>
        <div className={styles.title}>
            <p className={styles.state}>{location.state}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
            </svg>
        </div>
    
        <div className={styles.weather}>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
            <p className={styles.temperture}>{kelvinToCelcius(weather.main.temp)}&deg;C</p>
        </div>
    
        <div className={styles.minmax}>
            <p className={styles.min}>
            <span>Min:</span> {kelvinToCelcius(weather.main.temp_min)}&deg;C
            </p>
            <p className={styles.max}>
            <span>Max:</span> {kelvinToCelcius(weather.main.temp_max)}&deg;C
            </p>
        </div>
        </div>
    )
}
