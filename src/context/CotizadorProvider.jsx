import { createContext, useState } from 'react'
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero } from '../helpers'

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {

    // state
    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })
    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(null)
    const [cargando, setCargando] = useState(false)


    // funciones
    const handleChangeDatos = e => {
            setDatos({
                ...datos, 
                [e.target.name]: e.target.value
            })
    }

    const cotizarSeguro = () => {
        // base 
        let resultado = 2000

        // obtener diferencia de años
        const diferencia = obtenerDiferenciaYear(datos.year)

        // restar el 3% por cada año de diferencia
        resultado -= ((diferencia*3) * resultado) / 100
        
        // europeo  +30% || americano +15% || asiatico +5%
        resultado *= calcularMarca(datos.marca)
        
        // basico +20% || completo +50%
        resultado *= calcularPlan(datos.plan)

        // formatear dinero
        resultado = formatearDinero(resultado)

        setCargando(true)

        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 2000)

    }

    return (
        <CotizadorContext.Provider
            value={{
                datos,
                handleChangeDatos,
                error, 
                setError,
                cotizarSeguro,
                resultado,
                cargando
            }}        
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}
export default CotizadorContext 