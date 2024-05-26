import { useEffect, useState } from "react";
import gooseImage from '../images/goose.gif'; 

export const Content = () => {
    const getRandomInt = () => Math.floor(Math.random() * 15)
    const [guess, setGuess] = useState('')
    const [randomInt, setRandomInt] = useState(getRandomInt())
    const [errorMessage, setErrorMessage] = useState('')
    const [resultMessage, setResultMessage] = useState('')
    const [restart, setRestart] = useState(false)


    const validateInput = () =>{
        const parsedInput = parseInt(guess)

        if(isNaN(parsedInput)){
            setErrorMessage('Invalid input, only numbers are allowed')
            setTimeout(() => {
                setErrorMessage('')
            }, 3000);
        } else {
            setErrorMessage('')
            checkGuess(parsedInput)
        }
    }

    const checkGuess = (parsedInput) => {
        if(parsedInput === randomInt){
            setResultMessage(`Congratulations, you guessed the correct number! The number was ${randomInt}`)
            setRestart(true)
        } else {
            if(parsedInput > randomInt){
                setResultMessage('Wrong guess, the random number is smaller')
            } else {
                setResultMessage('Wrong guess, the random number is bigger')
            }
            setTimeout(() => {
                setResultMessage('')
            }, 1000);
        }
    }

    const restartGame = () => {
        setGuess('')
        setErrorMessage(false)
        setResultMessage('')
        setRandomInt(getRandomInt)
        setRestart(false)
    }


    const keyDown = (e) => {
        if(e.key === 'Enter'){
            console.log('Enter :D');
            console.log(e.target);
            validateInput()
        } 
    }




    return (
        <div>
            {/* <p>{randomInt}</p>         */}
            <input
                type="text"
                onKeyDown={keyDown}
                value={guess}
                onChange={(e) => setGuess(e.target.value)} // Handle input change
            />
            <div>
                {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                {resultMessage && <p>{resultMessage}</p>}
                {restart && (
                    <>
                    <button onClick={restartGame}> Restart game</button>
                    <img src={gooseImage} alt="Goose" />
                    </>
                )
                }
            </div>
        </div>
    );
}