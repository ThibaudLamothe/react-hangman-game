import PropTypes from 'prop-types'
import React from 'react'

import './ProcessPanel.css'
import Letter from './Letter'



const ProcessPanel = ({panel_letter}) => (
    <div className='ProcessPanel'>
        <p> This is the ProcessPanel </p>
        {panel_letter.map((letter, index) => (
            <Letter
                letter={letter}
                index= {index}
                onClick={()=>{}}
                key={index} 
            />))
        }
    </div>
  )

export default ProcessPanel

ProcessPanel.propTypes = {
    panel_letter: PropTypes.array.isRequired
  }