import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../Auth/helper/authApiCalls'

const Landing = ({setOpenForm=f=>f}) => {

    const handleAnimation = e => {
        let elm = document.getElementById('circle')
        elm.style.animationName = "goLeftToRight"
        elm.style.animationDuration = "6s"
        setTimeout(()=>{
            elm.style.animationName = "goLeft"
        },6000)
    }
  return (
    <div className='landing'>
        <div className="landingLeft">
            <h1 className="landingTitle">I Watched It</h1>
            <p className="landingPara">Keep track of everything you watched for free. Add latest movies and series. Track your watchtime , episodes and manage all the contents.</p>
            {
                isAuthenticated() ? (
                    <Link to="/home" ><button className="landingCTA">Explore</button></Link>
                ) : (
                    <button className="landingCTA" onClick={e=>setOpenForm(true)}>Start Free</button>
                )
            }
        </div>
        <div id='circle' className="landingCircle" onClick={handleAnimation}></div>
    </div>
  )
}

export default Landing