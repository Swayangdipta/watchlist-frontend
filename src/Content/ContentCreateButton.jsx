import React, { useState } from 'react'
import {GrAdd} from 'react-icons/gr'
import Search from '../Core/Search';

const ContentCreateButton = () => {

    const [isFormOpen,setIsFormOpen] = useState(false);

    const toggleForm = e => {
        setIsFormOpen(!isFormOpen);
    }

  return (
    isFormOpen ? (<Search setOpenSearch={setIsFormOpen} />) : (
        <i className='content__create__btn' onClick={toggleForm}>
            <GrAdd />
        </i>
    )

  )
}

export default ContentCreateButton