import React, { useEffect, useState } from "react";

import { Deck as IDeck } from "../wasm/pkg";

import { Deck } from "./Deck";
import { GameContext } from "./GameContext";
import { WasmContext } from "./WasmContext";
import { Hand as PlayersHand } from "./player";

export interface IApp {
  wasm: any;
}

export const App = ({ wasm }: IApp) => {
  const deck: IDeck = wasm.Deck.new();

  console.log("cards", deck.get_cards());
  console.log("shuffle", deck.shuffle());
  console.log("cards", deck.get_cards());

  return (
    <WasmContext.Provider value={wasm}>
      <GameContext.Provider value={{ deck }}>
        <h1>Blackjack</h1>
        <PlayersHand />
        <Deck />
      </GameContext.Provider>
    </WasmContext.Provider>
  );
};
