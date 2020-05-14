import React, { Component } from 'react'
import './App.css'
import Keyboard from './Keyboard'
import Score from './Score'
import Joueur from './Joueur'
import Screen from './Screen'
import Word from './Word'


const HIDDEN_LETTER = '_'
const MAX_TENTATIVE = 3
const DICT = ['pain', 'mie', 'croute']
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('')


// Separate the lettters into 3  categories : found, errors, others
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
    return [keyboard_letter, found_letter, error_letter]
}


// Update the score of players at the end of a word
function updateScore(newScore, currentPlayer, lost, won){
    let players = Object.keys(newScore)
    let score = {}
  
    for (let player of players){
        let player_last_score= newScore[player]['score']
        if (lost && player === currentPlayer){player_last_score += 0}
        if (lost && player !== currentPlayer){player_last_score += 1}
        if (won  && player === currentPlayer){player_last_score += 2}
        if (won  && player !== currentPlayer){player_last_score += 0}

        score[player]={
            'letter':[],
            'score': player_last_score
        }
    }
    return score

}

// Select the word to guess from a global dictionnary
// TODO : select it from a random API or from a file on the disk
function selectWord(){
    let nb = Math.floor(Math.random()*DICT.length);
    return DICT[nb].split('')
}


// Replace the not found letters by a '_' in the word to display
function createHiddenWord(word_letter, clicked_letter){
    let final_string = ''
    for (let letter of word_letter) {
        if (clicked_letter.includes(letter)){
            final_string += letter
        } else {
            final_string += HIDDEN_LETTER
        }
        final_string += ' '
    }
    return final_string 
}


// Detects if a player lost the word
function has_lost(player, score){
    let playerScore = score[player]['letter'].length
    return playerScore >= MAX_TENTATIVE
}


// Detects if words has been found
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
        looser:'',
        winner:'',
        score: {
            "Thibaud":{"score":0, "letter":[]},
            "Pauline":{"score":0, "letter":[]},
        },
        scoreToWin:5
    }
    addPlayer = (player) => {
        console.log(player)

        let currentScore=this.state.score
        currentScore[player] = {"score":0, "letter":[]}       
        this.setState((prevState, props) => ({score: currentScore}))
    }

    getNextPlayer = () => {
        let players = Object.keys(this.state.score)

        let prev_player = this.state.currentPlayer
        let prev_player_idx = players.indexOf(prev_player)

        let next_player_idx = ((prev_player_idx + 1) % players.length)
        let next_player =  players[next_player_idx]
        return next_player
    }


    // Arrow fx for binding
    handleClickOnWordButton = (word)=>{
        console.log(word)
 
        let word_letter = word.split('')
        
        
        let currentPlayer = this.state.currentPlayer
        let newScore = this.state.score
        let newLetter = this.state.clicked_letter

        let won = false
         console.log(word)
         console.log(this.state.word)
         console.log(word.split(''))
        //  console.log(this.state.word==word.split(''))

        let identic = JSON.stringify(this.state.word) === JSON.stringify(word_letter)
        if (identic){
            won=true
            for (let letter of word_letter){newLetter.push(letter)}
        } else {
            newScore[currentPlayer]['letter'].push(word)
        }
        
        // Update state
        let lost = has_lost(currentPlayer, newScore)
        

        // If finished update scores
        if (lost||won){
            newScore = updateScore(newScore, currentPlayer, lost, won)
        }

        this.setState((prevState, props) => ({
            score: newScore,
            clicked_letter:newLetter,
            looser: lost ? currentPlayer : '',
            winner: won ? currentPlayer : '',
            currentPlayer: !(lost||won) ? this.getNextPlayer() : currentPlayer

        }))

    } 


    // Arrow fx for binding
    handleClickOnKeyboardLetter = (index, letter)=>{   

        let currentPlayer = this.state.currentPlayer
        let newScore = this.state.score
        let newLetter = this.state.clicked_letter

        console.log(currentPlayer, 'clicked on letter', letter)
        
        // Update players letters
        let alreday_clicked = this.state.clicked_letter.includes(letter)
        let in_word = this.state.word.includes(letter)
        if (alreday_clicked || !in_word){
            newScore[currentPlayer]['letter'].push(letter)
            
        }
        
        // Update clicked letters
        if (newLetter.includes(letter)===false){
            newLetter.push(letter)
        }

        // Update state
        let lost = has_lost(currentPlayer, newScore)
        let won = has_won(newLetter, this.state.word)

        // If finished update scores
        if (lost||won){
            newScore = updateScore(newScore, currentPlayer, lost, won)
        }

        this.setState((prevState, props) => ({
            clicked_letter: newLetter,
            score: newScore,
            looser: lost ? currentPlayer : '',
            winner: won ? currentPlayer : '',
            currentPlayer: !(lost||won) ? this.getNextPlayer() : currentPlayer

        }))
    }

    // Arrow fx for binding
    resetGame = () => {
        console.log('Reset Game')
        this.setState({
            clicked_letter: [],
            word:selectWord(),
            looser:'',
            winner:'',
        })
    }

    
    render() {

        // Player info
        let player = this.state.currentPlayer
        
        // Defining state
        let lost = this.state.looser.length > 0
        let won = this.state.winner.length > 0
        let finished = (won || lost)

        // Getting score
        let score = this.state.score
            
        // Computing letter repartition
        let word_letter = this.state.word
        let clicked_letter = this.state.clicked_letter
        let [keyboard_letter, found_letter, error_letter] = createLetterForKeyboard(word_letter, clicked_letter)
        
        // Preparing masked word
        let hidden_word = createHiddenWord(word_letter, clicked_letter)



        return (
            <div className="hangman">
                <p>Bienvenue au pendu Etomal !</p>                                
               
                <Screen  word={hidden_word}/> 
                
                {!finished  &&
                < Keyboard
                    keyboardLetter={keyboard_letter}
                    foundLetter={found_letter}
                    errorLetter={error_letter}
                    onClickLetter ={this.handleClickOnKeyboardLetter}
                />}

                {!finished  &&
                <Word
                    onClickWord={this.handleClickOnWordButton}
                    visible={false}
                />}
                
                {!finished  &&
                <p>C'est à <b>{player}</b> de jouer</p>}
                
                {won        && <span>Congratulations <b>{this.state.winner}</b> : you won !</span>}        
                {lost       && <span>Too bad, <b>{this.state.looser}</b> lost...</span> }
                {finished   && <p><button color='green' onClick={() => this.resetGame()}>New game </button></p>}

                <Score
                    score={score}
                    currentPlayer={player}/>
                <Joueur
                    onClickJoueur={this.addPlayer}
                    visible={true}
                />
                <br></br>

                


            </div>
        ) 
    }
};


export default App;
