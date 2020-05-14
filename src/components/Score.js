import PropTypes from 'prop-types'
import React from 'react'

import './Score.css'


const Score = ({currentPlayer, score}) => (
    <div className='score'>
        <p>Score pannel</p>
        <div className='group'>

            {Object.keys(score).map((player, index) => (
                <div className='persons' is_current={String(player===currentPlayer)} key={index} >
                    
                    <span>{player}</span>

                    <span>Score : {score[player]['score']}</span>
                    <span>Nb errors : {score[player]['letter'].length}</span>
                    <br></br>
                    <span>{score[player]['letter'].map((letter, idx) => (<span key={idx}>{letter.toUpperCase()} </span>))} </span>
                    <br></br>
                </div>
                ))
            }
        </div>


        
    </div>
  )

export default Score

Score.propTypes = {
    score: PropTypes.object.isRequired,
    currentPlayer: PropTypes.string.isRequired,
  }