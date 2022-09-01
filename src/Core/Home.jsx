import React, { useState } from 'react'
import Auth from '../Auth/Auth'
import Header from './Header'
import Landing from './Landing'

const Home = () => {
    const [openForm,setOpenForm] = useState(false)
  return (
    <div>
        <Header location='landing' />
        <Landing setOpenForm={setOpenForm} />
        {
            openForm && (<Auth setOpenForm={setOpenForm} type="register" />)
        }
    </div>
  )
}

export default Home