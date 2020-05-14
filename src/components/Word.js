import PropTypes from 'prop-types'
import React from 'react'

import './Word.css'


const Word = ({visible, onClickWord}) => (
    <div className='word' visible={String(visible)}> 
        <input id='inputWord'></input>
        <button id='inputBtn' disabled = {visible} onClick={() => onClickWord(document.getElementById("inputWord").value)}>Soumission mot</button>
    </div>
)

export default Word


Word.propTypes = {
    onClickWord: PropTypes.func.isRequired,
    visible:PropTypes.bool.isRequired
}