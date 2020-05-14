import PropTypes from 'prop-types'
import React from 'react'

import './Keyboard.css'
import Letter from './Letter'


const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('')


function getLetterStatusCode(letter, keyboardLetter, foundLetter){
    if (keyboardLetter.includes(letter)){
        return 'active'
    } else if (foundLetter.includes(letter)) {
        return 'found'
    } else {
        return 'error'
    }
}

const Keyboard = ({keyboardLetter, foundLetter, onClickLetter}) => (
    <div className='Keyboard'>
        {ALPHABET.map((letter, index) => (
            <Letter
                letter={letter}
                statusCode={getLetterStatusCode(letter,keyboardLetter, foundLetter)}
                onClick={onClickLetter}
                index= {index}
                key={index} 
            />))
        }
    </div>
  )

export default Keyboard

Keyboard.propTypes = {
    keyboardLetter: PropTypes.array.isRequired,
    onClickLetter: PropTypes.func.isRequired,
  }