import React from 'react'
import InternalSearch from './InternalSearch'
import TotalCount from './TotalCount'

const SubHeader = ({whichToShow=f=>f}) => {
  return (
    <div className='sub_header'>
        <TotalCount whichToShow={whichToShow} />
        <InternalSearch />
    </div>
  )
}

export default SubHeader