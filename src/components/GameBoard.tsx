import { GameBoardType } from "../types";

type GameBoardProps = {
  onSelectSquare: (row: number, cell: number) => void;
  gameBoard: GameBoardType;
};

export const GameBoard = ({ onSelectSquare, gameBoard }: GameBoardProps) => {
  const handleSelectSquare = (row: number, cell: number) => {
    if (gameBoard[row][cell] === null) {
      onSelectSquare(row, cell);
    } else {
      alert("You can't play there!");
    }
  };

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((playersSymbol, cellIndex) => {
                return (
                  <li key={cellIndex}>
                    <button
                      onClick={() => handleSelectSquare(rowIndex, cellIndex)}
                      disabled={playersSymbol !== null}
                    >
                      {playersSymbol}
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
};
