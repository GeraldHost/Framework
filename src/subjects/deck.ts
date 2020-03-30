import { Subject } from "rxjs";
import { useState } from "react";
import { useGame } from "../GameContext";
import { Deck } from "../../wasm/pkg";

export interface ICard {
  suit: string;
  rank: string;
}

export interface IDeck extends Partial<Deck> {
  cards: ICard[];
  dealt_cards: ICard[];
}

const deckSubject = new Subject();

export const useDeck = () => {
  const { deck: gameDeck } = useGame();

  const initialState = {
    cards: gameDeck?.get_cards(),
    dealt_cards: gameDeck?.get_dealt_cards(),
  };

  const [state, setState] = useState<IDeck | undefined>(initialState);
  deckSubject.subscribe(setState);

  const trigger = () => {
    const payload = {
      cards: gameDeck?.get_cards(),
      dealt_cards: gameDeck?.get_dealt_cards(),
    };
    deckSubject.next(payload);
  };

  return { state, trigger };
};
