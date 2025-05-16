import { useEffect } from "react";
import styles from "./App.module.css"
import Alert from "./components/Alert/Alert";
import Form from "./components/Form/Form"
import Result from "./components/Result/Result"
import Spinner from "./components/Spinner/Spinner";
import { useLocationStore } from "./stores/LocationStore";
function App() {
  const {weather, loading, notFound, night} = useLocationStore()
  useEffect(() => {
    night? document.body.classList.add('modo-noche') 
    : document.body.classList.remove('modo-noche')}
  , [night])

  return (
    <>
      <main>
        <h2 className={styles.title}>Global wheather</h2>

        <div className={styles.container}>
          <Form></Form>
          {loading && (<Spinner />)}
          {weather.name && !loading && !notFound && (<Result></Result>)}
          {notFound && (<Alert>La ciudad no fue encontrada</Alert>)}
        </div>
      </main>
    </>
  )
}

export default App
