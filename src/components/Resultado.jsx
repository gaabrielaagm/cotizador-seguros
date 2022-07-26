import { useCallback, useMemo, useRef } from 'react'
import useCotizador from "../hooks/useCotizador"
import { MARCAS, PLANES } from "../constants"

const Resultado = () => {
    const { resultado, datos } = useCotizador()
    const { marca, plan, year } = datos

    const yearRef = useRef(year)

    const [nombreMarca] = useCallback(
        MARCAS.filter(m => m.id === Number(marca)),
        [resultado]
    )
    
    const [nombrePlan] = useMemo(
        () => PLANES.filter(p => p.id === Number(plan)),
        [resultado]
    )

    return (
        <div className="bg-gray-100 text-center p-5 shadow">
            <p className="my-2">
                <span className="font-bold">Marca: </span>
                {nombreMarca && nombreMarca.nombre}
            </p>
            <p className="my-2">
                <span className="font-bold">Plan: </span>
                {nombrePlan && nombrePlan.nombre}
            </p>
            <p className="my-2">
                <span className="font-bold">Año del Auto: </span>
                {yearRef.current}
            </p>
            <p className="my-5 text-gray-600 font-black text-2xl">
                <span className="font-bold">Precio Cotización: </span>
                {resultado}
            </p>
        </div>
    )
}

export default Resultado