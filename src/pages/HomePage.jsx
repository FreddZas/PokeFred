import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setTrainerG } from '../store/slices/trainer.slice'
import { useNavigate } from 'react-router-dom'
import './styles/HomePage.css'


const HomePage = () => {

  const inputTrainer = useRef()

  const dispatch = useDispatch()
  
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(setTrainerG(inputTrainer.current.value.trim())) //Metodo trim quita los espacios solo del inicio y final
    navigate(`/pokedex`)
  }

  return (
    <div className="home__container">
      <div className="home__tittle" >
        <img  src="./img/pokedex.png" alt="" />
      </div>
      <h2 className="home__trainer">Hi trainer!</h2>
      <p className="home__message">To start with the app, give me your name trainer</p>
      <form className="home__form" onSubmit={handleSubmit}>
        <input className="first__input"  ref={inputTrainer} type="text" placeholder=" Your Name"/>
        <button className="home__btm">Gotta catch 'em all!</button>
      </form>
    
    <footer className="home__footer">
      <div className="darkfooter"></div>
          <div className="footer__circle__out">
            <div className="footer__circle__in"></div>
          </div>
    </footer>
    </div>

  )
}

export default HomePage