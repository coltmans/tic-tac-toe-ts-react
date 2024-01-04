import { GameTurn } from "../types";

type LogProps = {
  turns: GameTurn[];
};
export const Log = ({ turns }: LogProps) => {
  return (
    <>
      <h1>Log</h1>
      <ol id="log">
        {turns.map((turn) => {
          return (
            <li key={`${turn.square.row}-${turn.square.cell}`}>
              {turn.player} selected {turn.square.row}, {turn.square.cell}
            </li>
          );
        })}
      </ol>
    </>
  );
};
