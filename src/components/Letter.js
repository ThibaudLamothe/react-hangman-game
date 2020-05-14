import PropTypes from 'prop-types'
import React from 'react'

import './Letter.css'


const Letter = ({letter, statusCode, index, onClick}) => ( 
    <span className='letter' status={statusCode} onClick={() => onClick(index, letter)} disabled = {statusCode==='found'}>
        <span > {letter} </span>
    </span>
  )

export default Letter


Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  statusCode: PropTypes.string.isRequired,
  index:PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}