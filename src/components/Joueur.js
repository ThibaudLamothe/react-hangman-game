import PropTypes from 'prop-types'
import React from 'react'

import './Joueur.css'


const Joueur = ({visible, onClickJoueur}) => (
    <div className='Score' visible={String(visible)}>
        <p>Gestion des joueurs</p>
        <input id='inputNewPlayer'></input>
        <button id='btnNewPlayer' onClick={() => onClickJoueur(document.getElementById("inputNewPlayer").value)} >Ajouter joueur</button>
        
    </div>
  )

export default Joueur

Joueur.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClickJoueur: PropTypes.func.isRequired,
  }
  

