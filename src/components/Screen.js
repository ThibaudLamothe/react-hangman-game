import PropTypes from 'prop-types'
import React from 'react'

import './Screen.css'


const Screen = ({word}) => (
    <div className='screen'>
      <p>{word.toUpperCase()}</p>
    </div>
  )

export default Screen


Screen.propTypes = {
  word: PropTypes.string.isRequired,
}