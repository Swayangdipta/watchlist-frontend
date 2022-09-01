import React, { useState } from 'react'
import {CgMenuCheese,CgSearch} from 'react-icons/cg'
import { isAuthenticated } from '../Auth/helper/authApiCalls'
import Menu from './Menu'
import Search from './Search'
import Auth from '../Auth/Auth'
import { Link } from 'react-router-dom'

const Header = ({location="home"}) => {
  const [openMenu,setOpenMenu] = useState(false)
  const [openSearch,setOpenSearch] = useState(false)
  const [openForm,setOpenForm] = useState(false)
  const [formType,setFormType] = useState("login")
  return (
    <>
    <header className='header'>
        <div className="header__branding">
            <Link to="/"><h1 className="branding">I Watched It</h1></Link>
        </div>
        {
          isAuthenticated() ? (
          <div className="header__nav">
              <i className="header__search pointer__cursor" onClick={e=>setOpenSearch(!openSearch)}><CgSearch /></i>
              <i className="header__menu pointer__cursor" onClick={e=>setOpenMenu(!openMenu)}><CgMenuCheese /></i>
          </div>            
          ) : (
          <div className="header__nav">
            <p className="header__search header__auth pointer__cursor" onClick={e=>{{
              setFormType("login")
              setOpenForm(true)
              }}}>Sign In</p>
            <p className="header__menu header__auth pointer__cursor" onClick={e=>{
              setFormType("register")
              setOpenForm(true)
            }}>Sign Up</p>
          </div>
          )
        }

    </header>
      {
       isAuthenticated() && openMenu && (<Menu location={location} />)
      }
      {
       isAuthenticated() && openSearch && (<Search setOpenSearch={setOpenSearch} />)
      }
      {
        openForm && (<Auth type={formType} setOpenForm={setOpenForm} />)
      }
    </>
  )
}

export default Header