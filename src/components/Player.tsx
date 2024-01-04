import { useState } from "react";
import { PlayerSymbol } from "../types";

type PlayerProps = {
  name: string;
  playerSymbol: PlayerSymbol;
  isActive: boolean;
  onNameChange: (playerSymbol: PlayerSymbol, name: string) => void;
};
export const Player = ({
  name: initName,
  playerSymbol,
  isActive,
  onNameChange,
}: PlayerProps) => {
  const [name, setName] = useState<string>(initName);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditClick = () => {
    setIsEditing((editing) => !editing);
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);

    onNameChange(playerSymbol, event.currentTarget.value);
  };

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing && (
          <input
            type="text"
            value={name}
            placeholder="Players name"
            onChange={handleChange}
          />
        )}

        {!isEditing && <span className="player-name">{name}</span>}
        <span className="player-symbol">{playerSymbol.toUpperCase()}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};
