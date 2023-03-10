import React, { useState } from 'react';

import Board from './Board';

const Game = () => {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [xIsNext, setXIsNext] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);
    const handleClick = (i) => {
        const currentHistory = history.slice(0, stepNumber + 1);
        const current = currentHistory[currentHistory.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) return;
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(history.concat([
        {
          squares: squares
        }
      ]));
        setXIsNext(!xIsNext);
        setStepNumber(history.length);
    }
    const jumpTo = (step) => {
        if (step === 0) setHistory([{ squares: Array(9).fill(null) }]);
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    }
    let status = 'Next Player: ' + (xIsNext ? 'X' : 'O');
    const calculateWinner = (validateSquares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let i = 0; i < lines.length; i++){
            const [a, b, c] = lines[i];
            if (validateSquares[a] && validateSquares[a] === validateSquares[b] && validateSquares[a] === validateSquares[c]) {
                return validateSquares[a];
            }
        }
        return null;
    }
    const winner = calculateWinner(history[stepNumber].squares);
    if (winner) {
        status = "Winner is " + winner;
    } else {
        status = 'Next Player: ' + (xIsNext ? 'X' : 'O');
    }
    const moves = history.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });
    return (
        <div className='game'>
            <div className="game-board">
                <Board squares={history[history.length - 1].squares} handleClick={handleClick} />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{ moves}</ol>
            </div>
        </div>
    );
}

export default Game;

