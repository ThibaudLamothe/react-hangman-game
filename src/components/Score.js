import PropTypes from 'prop-types'
import React from 'react'

import './Score.css'


const Score = ({currentPlayer, score}) => (
    <div className='Score'>
        <p>Score pannel</p>

        {Object.keys(score).map((player, index) => (
            <p  is_current={String(player===currentPlayer)}
                key={index} >
                {player} : 
                    {score[player]['score']},
                    {score[player]['letter'].length} - 
                    ({score[player]['letter'].map((letter, idx) => (<span key={idx}>{letter} </span>))})
                    
            </p>
            ))
        }


        
    </div>
  )

export default Score

Score.propTypes = {
    score: PropTypes.object.isRequired,
    currentPlayer: PropTypes.string.isRequired,
  }