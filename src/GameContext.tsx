import { useContext, createContext } from "react";
import { Deck } from "../wasm/pkg";

export interface IGame {
  deck?: Deck;
}

export const GameContext = createContext<IGame>({});
export const useGame = () => useContext(GameContext);
