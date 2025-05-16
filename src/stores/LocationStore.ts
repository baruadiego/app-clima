import { create,  } from "zustand";
import { Location, Weather } from "../types";
import { devtools } from "zustand/middleware";
import { initialWeather } from "../hooks/useWeather";

type LocationStore = {
    location: Location;
    notFound: boolean;
    weather: Weather;
    night: boolean;
    loading: boolean;
    setLoading: (value: boolean) => void;
    setLocation: (newLocation: Location) => void;
    setWeather: (newWeather: Weather) => void;
    setNotFound: (value: boolean) => void;
    setNight: (value: boolean) => void;
};

export const useLocationStore = create<LocationStore>()(
    devtools(
        (set) => ({
            location: {
                country: '',
                state: '',
            },
            notFound: false,
            weather: initialWeather,
            night: false,
            setLocation: (newLocation: Location) => (
                set((state) => ({
                    ...state,
                    location: newLocation
                }) )
            ),
            setWeather: (newWeather) => (
                set((state) => ({
                    ...state,
                    weather: newWeather
                }))
            ),
            
            setNotFound: (value: boolean) => (
                set((state) => ({
                    ...state,
                    notFound: value
                }))
            ),

            setNight: (value: boolean) => (
                set((state) => ({
                    ...state,
                    night: value
                }))
            ),

            setLoading: (value: boolean) => (
                set((state) => ({    
                    ...state,
                    loading: value
                })) 
            ),
        })
    )
);