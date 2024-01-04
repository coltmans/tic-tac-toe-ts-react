import { useState } from "react";
import { GameBoard } from "./components/GameBoard";
import { Player } from "./components/Player";
import { Log } from "./components/Log";
import { GameBoardType, GameBoardValue, GameTurn, PlayerSymbol } from "./types";
import { WINNING_COMBINATIONS } from "./winninig_combinations";
import { GameOver } from "./components/GameOver";

const O: PlayerSymbol = "O";
const X: PlayerSymbol = "X";
const FirstPlayer = X;

export const initalGameBoard: GameBoardType = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const getCurrentPlayer = (gameTurns: GameTurn[]) => {
  if (gameTurns[0]) {
    return gameTurns[0].player === X ? O : X;
  }
  return FirstPlayer;
};

const getWinner = (gameBoard: GameBoardType): GameBoardValue => {
  let winnerSymbol = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].cell];
    const secondSquare = gameBoard[combination[1].row][combination[1].cell];
    const thirdSquare = gameBoard[combination[2].row][combination[2].cell];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winnerSymbol = firstSquare;
    }
  }
  return winnerSymbol;
};

const getGameBoard = (gameTurns: GameTurn[]) => {
  const gameBoard = structuredClone(initalGameBoard) as GameBoardType;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, cell } = square;
    gameBoard[row][cell] = player;
  }

  return gameBoard;
};

type SymbolsPlayersName = {
  [X]: string;
  [O]: string;
};

export const App = () => {
  const [gameTurns, setGameTurns] = useState<GameTurn[]>([]);
  const [playerNames, setPlayerNames] = useState<SymbolsPlayersName>({
    X: "Player 1",
    O: "Player 2",
  });

  const handleSelectSquare = (row: number, cell: number) => {
    setGameTurns((prevTurns) => {
      const updatedTurns = [
        { square: { row, cell }, player: getCurrentPlayer(prevTurns) },
        ...prevTurns,
      ];

      return updatedTurns as GameTurn[];
    });
  };

  const handleNameChange = (symbol: PlayerSymbol, name: string) => {
    setPlayerNames((prevNames) => {
      return {
        ...prevNames,
        [symbol]: name,
      };
    });
  };

  const activePlayer = getCurrentPlayer(gameTurns);

  const gameBoard = getGameBoard(gameTurns);

  const winnerSymbol: GameBoardValue = getWinner(gameBoard);
  const hasDraw = gameTurns.length === 9 && !winnerSymbol;

  return (
    <main>
      <div id="game-container">
        <ol
          id="players"
          className={activePlayer ? "highlight-player" : undefined}
        >
          <Player
            name="Player 1"
            playerSymbol={X}
            isActive={activePlayer === X}
            onNameChange={handleNameChange}
          />
          <Player
            name="Player 2"
            playerSymbol={O}
            isActive={activePlayer === O}
            onNameChange={handleNameChange}
          />
        </ol>

        {(winnerSymbol || hasDraw) && (
          <GameOver
            winner={playerNames[winnerSymbol!]}
            onRestart={() => setGameTurns([])}
          />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
};
