import React from "react"
import "./App.css"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Counter from "./components/Counter"

export default function App() {

    const [tenzies, setTenzies] = React.useState(false)
    const [diceNumbers, setDiceNumbers] = React.useState(newDiceNumbers())
    const [count, setCount] = React.useState(0)
                
    React.useEffect(() => {
        const allDiceSame = diceNumbers.every(die => die.value === diceNumbers[0].value)
        const allHeld = diceNumbers.every(die => die.isHeld)
        if (allDiceSame && allHeld) {
            setTenzies(true)
            console.log('Tenzies!')
        } else {
            setTenzies(false)
        }
    }, [diceNumbers])

    function newDiceNumbers() {
        return Array.from({ length: 10 }, () => {
            return {
            value: (Math.floor(Math.random() * 6) + 1),
            isHeld: false,
            id: nanoid(),
            }
    })
    }

    const dice = diceNumbers.map(die => {
        return <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
    })

    function rollDice() {
        setDiceNumbers(prevDiceNumbers => {
            return prevDiceNumbers.map(die => {
                if (die.isHeld) {
                    return die
                }
                return {
                    ...die,
                    value: (Math.floor(Math.random() * 6) + 1),
                }
            })
        })
        setCount(prevCount => prevCount + 1)
      
    }

    function holdDice(id) {
        setDiceNumbers(prevDiceNumbers => {
            return prevDiceNumbers.map(die => {
                if (die.id === id) {
                    return {
                        ...die,
                        isHeld: !die.isHeld,
                    }
                }
                return die
            })
        })
    }

    const btnText = tenzies
    ? 'New Game'
    : 'Roll Dice'

    function newGame() {
        setDiceNumbers(newDiceNumbers())
        setTenzies(false)
        setCount(0)
    }

    return(
        <main>
            {tenzies && <Confetti />}
            <div className="game--outer-container">
                <div className="game--inner-container">
                    <Counter count={count} />
                    <h2 id='game--title'>Tenzies</h2>
                    <p id='game--description'>Roll until all dice are the same.
                    Click each die to freeze it at its current value between rolls.</p>
                    <div className='dice--container'>
                        {dice}
                    </div>
                    <button id='game-btn' onClick={tenzies ? newGame : rollDice}>{btnText}</button>
                </div>
            </div>
        </main>
    )
    
}