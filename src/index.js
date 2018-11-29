import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/*class Square extends React.Component {
   // constructor(props) {
     //   super(props);
     //   this.state = {
     //       value: null,
        }; 
   render() {
       return (
           <button
               className="square"
               onClick={() => this.props.onClick()}
           >
               {this.props.value}
           </button>
       );
   }
}

*/

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        //ignor a click if someone has won or square is already filled
        const history = this.state.history;
        const current = history[history.length - 1];
        //const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'x' : '0';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),

            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.onClick(i)}
            />
        );
    }

    render() {
        //change status text to show which player has the next turn to play
        //const status = 'Next player: ' + (this.state.xIsNext ? 'x' : '0');

        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'x' : '0');
        }

        return (<div>
            <div className="status"> {
                status
            } </div> <div className="board-row" > {
                this.renderSquare(0)
            } {
                    this.renderSquare(1)
                } {
                    this.renderSquare(2)
                }
            </div>
            <div className="board-row" > {
                this.renderSquare(3)
            } {
                    this.renderSquare(4)
                } {
                    this.renderSquare(5)
                }
            </div>
            <div className="board-row" > {
                this.renderSquare(6)
            } {
                    this.renderSquare(7)
                } {
                    this.renderSquare(8)
                }
            </div>
        </div>
        );
    }
}

class Game extends React.Component {
    //setting initial state for game component
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
        }
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.lenght - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) ||
            squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'x' : '0';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        //use most recent history to determine & display game status
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
        // mapping over history
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move' + move :
                'Go to game start';
            return (
                <li>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'x' : '0');
        }
        return (
            <div className="game" >
                <div className="game-board" >
                    < Board
                        squares={current.Squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info" >
                    <div > {status} </div>
                    <ol > {moves} </ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(<
    Game />,
    document.getElementById('root')
);

// declaring a winner

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [0, 1, 2],
        [0, 1, 2],
        [0, 1, 2],
        [0, 1, 2],
        [0, 1, 2],
        [0, 1, 2],
        [0, 1, 2],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}