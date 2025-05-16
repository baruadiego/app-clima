import styles from "./Form.module.css"
import { countries } from "../../data/Countries"
import { states } from "../../data/States"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { Location } from "../../types"
import Alert from "../Alert/Alert"
import { useLocationStore } from "../../stores/LocationStore"
import useWeather from "../../hooks/useWeather"

export default function Form() {
    const[statesOption, setStatesOption] = useState<string[]>([])
    const { register, handleSubmit, reset, formState: {errors},  watch} = useForm<Location>()
    const country = watch('country', '')
    const {setLocation} = useLocationStore()

    useMemo(() => (country? 
        setStatesOption(states[country as keyof typeof states].states)
        :
        setStatesOption([])
        ), [country]
    )
        
    const {fetchWeather} = useWeather()

    const handleSubmitForm = (data: Location) => {
        setLocation(data)
        fetchWeather(data)
        reset()
    }

    const errorsExist = Object.keys(errors).length > 0
  return (
    <form 
        className={styles.form}
        noValidate
        onSubmit={handleSubmit(handleSubmitForm)}
    >
        { errorsExist && ( <Alert>Todos los campos son obligatorios</Alert> )}

        <label htmlFor="country">pais:</label>
        <select 
            id="country" 
            defaultValue={''}
            className={styles.select}
            {...register('country', {
                required: true
            }
            )}
        >
            <option value="">--selecciona un pais--</option>
            {countries.map(country => (
                <option key={country.code} value={country.code}>{country.name}</option>
            ))}
        </select>
        
        <label htmlFor="state">Ciudad:</label>
        <select
            id="state"
            defaultValue={''}
            {...register('state', {
                required: true
            })}
        >
            <option value="">--selecciona una ciudad--</option>
            {statesOption.map (state => 
                <option key={state} value={state}>{state}</option>
            )}
        </select>
        
        <input type="submit" name="submit" value={'Buscar'}/>

    </form>
  )
}
