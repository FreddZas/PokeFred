import React from 'react'
import { Link } from 'react-router-dom'
import Homepage from './Homepage'

const Poke404 = () => {
  return (
    <h1>
        ❌ This Page is not found 🤬!.  Return to <Link to='/'> Home Page</Link>😒
    </h1>
  )
}

export default Poke404