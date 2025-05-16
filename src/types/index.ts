import { z } from "zod"
import { weatherResponse } from "../hooks/useWeather"

export type Location = {
    country: string,
    state: string
}
export type Weather = z.infer<typeof weatherResponse> 