import { useSelector } from "react-redux"
import { useRef } from "react"
import useFetch from "../hooks/useFetch"
import { useEffect } from "react"
import PokeCard from "../components/PokedexPage/PokeCard"
import { useState } from 'react'
import './styles/PokedexPage.css'
import SelecType from "../components/PokedexPage/SelecType"
import Pagination from "../components/PokedexPage/Pagination"
import { Link } from "react-router-dom"

const PokedexPage = () => {

  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('allPokemons')

  const [currentPage, setCurrentPage] = useState(1)
  const [pokePerPage] = useState(20)

  const trainer = useSelector(reducer => reducer.trainer)

  const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1281'
  const [ pokemons, getAllPokemons, getPokemonsByType ] = useFetch(url)


  useEffect(() => { 
    if (selectValue === 'allPokemons'){
    getAllPokemons()
    } else {
      getPokemonsByType(selectValue)
    }
  }, [selectValue])



  const indexOfLastPoke = currentPage * pokePerPage
  const indexOfFirstPoke = indexOfLastPoke - pokePerPage

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }


  const inputSearch = useRef()
  
  const handleSubmit = e => {
    e.preventDefault()
    setInputValue(inputSearch.current.value.trim().toLowerCase())
    setSelectValue(1)
  }

  
  const callBackFilter = poke => poke.name.includes(inputValue) 
  
    const filteredPokemons = pokemons?.results.filter(callBackFilter) || []
    const totalResidents = filteredPokemons.length
  
    const residentsPerPage = 6
    const totalPages = Math.ceil(totalResidents / residentsPerPage)

    const startIndex = (currentPage - 1) * residentsPerPage
    const endIndex = Math.min(startIndex + residentsPerPage, totalResidents)
  
    const pokemonsToShow = filteredPokemons.slice(startIndex, endIndex)
  
    const handlePageChange = page => {
      setCurrentPage(page)
    }

  return (
    <div className="poke__container">
       <header className="header__pokedex">
          <Link to="/">
            <div className="header__logo">
                <img
                  src="./img/pokedex.png"
                  alt="Pokedex"
                />
            </div>
          </Link>
          <div className="darkheader"></div>
            <div className="header__circle__out">
              <div className="header__circle__in"></div>
            </div>
      </header>

      <p className="welcome"><span>Welcome <span className="trainer__name">{trainer}</span></span>, here you can find your favorite pokemon.</p>

      <div className='poke__general__form'>
        <form className="poke__form" onSubmit={handleSubmit}>
          <input className="search__input" ref={inputSearch} type="text" placeholder ="Write here your pokemon"/>
          <button className="search__btm">Search</button>
        </form>
        <SelecType 
          setSelectValue={setSelectValue}
          setInputValue={setInputValue}
          selectValue={selectValue}
        />
      </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          pagesToShow={5}
        />
      <div className="pokecard__container">
        {
          pokemons?.results
          .slice(indexOfFirstPoke, indexOfLastPoke)
          .filter(callBackFilter)
          .map(poke => (
            <PokeCard 
              key={poke.url}
              url={poke.url}
            />
          ))
        }
      </div>

      <footer className="number__page">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          pagesToShow={5}
        />
      </footer>
    </div>
  )
}

export default PokedexPage