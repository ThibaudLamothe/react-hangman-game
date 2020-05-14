import React, { Component } from 'react'
import './App.css'

import Score from './Score'
import Screen from './Screen'
import Keyboard from './Keyboard'

const HIDDEN_LETTER = '_'
const MAX_TENTATIVE = 3
const DICT = ['pain', 'mie', 'croute']
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('')



function createLetterForKeyboard(word_letter, clicked_letter){
    let keyboard_letter = []
    let found_letter = []
    let error_letter = []

    for (let letter of ALPHABET){
        if (clicked_letter.includes(letter)){
            if (word_letter.includes(letter)){found_letter.push(letter)}
            else {error_letter.push(letter)}
        }
        else {
            keyboard_letter.push(letter)
        }
    }
    // console.log(keyboard_letter, found_letter, error_letter)
    return [keyboard_letter, found_letter, error_letter]
}


function prepareScore(players, last_score) {
    let score = {}
    let player_last_score=0
    for (let player of players){
        player_last_score=last_score[player]['score']
        score[player]={
            'letter':[],
            'score': player_last_score
        }
    }
    return score
}

function selectWord(){
    let nb = Math.floor(Math.random()*DICT.length);
    return DICT[nb]
}


function createHiddenWord(word, clicked_letter){
    let final_string = ''
    for (let letter of word) {
        if (clicked_letter.includes(letter)){
            final_string += letter
        } else {
            final_string += HIDDEN_LETTER
        }
        final_string += ' '
    }
    return final_string 
}


function has_lost(player, score){
    let playerScore = score[player]['letter'].length
    return playerScore >= MAX_TENTATIVE
}

function has_won(clicked_letter, word_letter){
    let finished = true
    for (let letter of word_letter){
        finished = finished && clicked_letter.includes(letter)
    }
    return finished
}

class App extends Component {
    state = {
        word: selectWord(),
        clicked_letter: [],
        currentPlayer:'Thibaud',
        lost:'',
        won:'',
        score: {
            "Thibaud":{"score":0, "letter":[]},
            "Pauline":{"score":0, "letter":[]},
            "Guillaume":{"score":0, "letter":[]}
        }
    }


    setNextPlayer = () => {
        let players = Object.keys(this.state.score)

        let prev_player = this.state.currentPlayer
        let prev_player_idx = players.indexOf(prev_player)

        let next_player_idx = ((prev_player_idx + 1) % players.length)
        let next_player =  players[next_player_idx]
        
        this.setState({currentPlayer: next_player })
    }


    // Arrow fx for binding
    handleClickOnKeyboardLetter = (index, letter)=>{   
        
        let currentPlayer = this.state.currentPlayer
        let newScore = this.state.score
        let newLetter = this.state.clicked_letter
        
        // Update players letters
        let alreday_clicked = this.state.clicked_letter.includes(letter)
        let in_word = this.state.word.split('').includes(letter)
        if (alreday_clicked || !in_word){
            newScore[currentPlayer]['letter'].push(letter)
        }
        
        // Update clicked letters
        if (newLetter.includes(letter)===false){
            newLetter.push(letter)
        }

        // Update state
        this.setState((prevState, props) => ({
            clicked_letter: newLetter,
            score: newScore,
            lost: has_lost(currentPlayer, newScore) ? currentPlayer : '',
            won: has_won(newLetter, this.state.word.split('')) ? currentPlayer : ''
        }))

        
    }

    // Arrow fx for binding
    resetGame = () => {
        console.log('Reset Game')

        let score = this.state.score
        score = prepareScore(Object.keys(score), score)
        
        // NE PAS AJOUTTER UN AU SUIVANT MAIS A TOUS LES AUTRES
        score[this.state.currentPlayer]['score'] += 1

        this.setState({
            clicked_letter: [],
            word:selectWord(),
            score:score,
            lost:''
        })
    }

    render() {

        // Player info
        let player = this.state.currentPlayer
        
        // Defining state
        let lost = this.state.lost.length > 0
        let won = this.state.won.length > 0
        let finished = (won || lost)

        // Getting score
        let score = this.state.score
        console.log(score)
            
        // Computing letter repartition
        let word_letter = this.state.word.split('')
        let clicked_letter = this.state.clicked_letter
        let [keyboard_letter, found_letter, error_letter] = createLetterForKeyboard(word_letter, clicked_letter)
        
        // Preparing masked word
        let hidden_word = createHiddenWord(word_letter, clicked_letter)
        
        return (
            <div className="hangman">
                <p>Bienvenue au pendu Etomal !</p>
                <p>C'est à {player}</p>                
                <Screen  word={hidden_word}/> 
                {!finished  &&
                < Keyboard
                    keyboardLetter={keyboard_letter}
                    foundLetter={found_letter}
                    errorLetter={error_letter}
                    onClickLetter ={this.handleClickOnKeyboardLetter}
                />}
                {won        && <span> Congratulations you've finished"</span>}        
                {lost       && <span>Too bad, {this.state.lost} lost...</span> }
                {finished   && <span color='green' onClick={() => this.resetGame()}>New game </span>}
                
                <Score score={score} currentPlayer={player}/>
            </div>
        ) 
    }
};


export default App;
