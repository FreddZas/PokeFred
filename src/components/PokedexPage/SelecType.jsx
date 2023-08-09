import { useEffect } from "react"
import useFetch from "../../hooks/useFetch"
import './styles/SelectType.css'


const SelecType = ({ setSelectValue }) => {
  const url ='https://pokeapi.co/api/v2/type'
  const [ types, getAllTypes ] = useFetch(url)

  useEffect(() => {
    getAllTypes()

  }, [])

  const handleChange = e => {
    setSelectValue(e.target.value)
  }

  return (
    <div className="content">
      <select onChange={handleChange}>
        <option value="allPokemons">All Pokemons</option>
        {
          types?.results.map(type => (
            <option key={type.url} value={type.url}>{type.name}</option>
          ))
        }
      </select>
    </div>
  )
}

 

export default SelecType