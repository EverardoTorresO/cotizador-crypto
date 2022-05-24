import styled from '@emotion/styled'
import React, { useEffect,useState } from 'react'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas';
import Error from './Error';
const InputSubmit = styled.input`
    background-color: #9497FF;
     border:none;
     width: 100%;
     padding: 10px;
     color: #FFF;
     font-weight: 700;
     text-transform: uppercase;
     font-size: 20px;
     border-radius: 5px;
     transition: background-color 0.3s ease;
     margin-top: 30px;
    &:hover{
        background-color: #747DFE;
        cursor: pointer;
    }
`
function Formulario({setMonedas}) {
    const [cryptos,setCryptos]=useState([]);
    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu Moneda', monedas);
    const [error,setError]=useState(false);
     const [crypto,SelectCriptomoneda] = useSelectMonedas('Elige Tu CriptoMoneda',cryptos)

    useEffect(() => {
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?tsym=USD&limit=20";
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            const arrayCriptos = resultado.Data.map(cripto => {
                const objeto = { id: cripto.CoinInfo.Name, nombre: cripto.CoinInfo.FullName }
                return objeto;
            });
            setCryptos(arrayCriptos);
        }
        consultarAPI();
    }, []);
    const handleSubmit=(e)=>{
        e.preventDefault()
        if([moneda,crypto].includes('')){
            setError(true);
            return;
        }
        setError(false);
        console.log(moneda,crypto);
        setMonedas({moneda,crypto});
    }
    return (

        <>
        {error&& <Error>Todos los campos son Obligatorios</Error>}
        <form onSubmit={handleSubmit}>
            <SelectMonedas />
            <SelectCriptomoneda />
            <InputSubmit type="submit" value="Cotizar" />
        </form>
        </>
    )
}

export default Formulario