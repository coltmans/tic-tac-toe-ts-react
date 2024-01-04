
export type GameTurn = {
    square: { row: number; cell: number };
    player: GameBoardValue;
  };
  
  export type PlayerSymbol = "X" | "O";
  export type GameBoardValue = PlayerSymbol | null;
  export type GameBoardType = [
    [GameBoardValue, GameBoardValue, GameBoardValue],
    [GameBoardValue, GameBoardValue, GameBoardValue],
    [GameBoardValue, GameBoardValue, GameBoardValue]
  ];
  export type LogProps = {
    turns: GameTurn[];
  };



  export type GameBoardProps = {
    onSelectSquare: (row: number, cell: number) => void;
    gameBoard: GameBoardType;
  };