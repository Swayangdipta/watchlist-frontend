import React, { useState } from 'react'
import {CgMenuCheese,CgSearch} from 'react-icons/cg'
import Menu from './Menu'
import Search from './Search'

const Header = ({location="home"}) => {
  const [openMenu,setOpenMenu] = useState(false)
  const [openSearch,setOpenSearch] = useState(false)
  return (
    <>
    <header className='header'>
        <div className="header__branding">
            <h1 className="branding">I Watched It</h1>
        </div>
        <div className="header__nav">
            <i className="header__search pointer__cursor" onClick={e=>setOpenSearch(!openSearch)}><CgSearch /></i>
            <i className="header__menu pointer__cursor" onClick={e=>setOpenMenu(!openMenu)}><CgMenuCheese /></i>
        </div>
    </header>
      {
        openMenu && (<Menu location={location} />)
      }
      {
        openSearch && (<Search setOpenSearch={setOpenSearch} />)
      }
    </>
  )
}

export default Header