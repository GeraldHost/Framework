import React, { useState } from "react";
import { useDeck } from "../subjects/deck";

import { useWasm } from "../WasmContext";
import { useGame } from "../GameContext";

export const Hand = () => {
  const wasm = useWasm();
  const { trigger } = useDeck();
  const { deck: gameDeck } = useGame();

  const [hand, _] = useState(wasm.Hand?.new());

  const isBust = wasm.Game?.is_bust(hand);

  return (
    <div>
      <h2>Players Hand</h2>
      <p>
        <b>Cards</b>: {hand.get_cards().length}
      </p>
      <p>
        <b>Value</b>: {hand.get_value()} {isBust && <b>bust!</b>}
      </p>
      <button
        onClick={() => {
          gameDeck?.deal(hand, 2);
          trigger();
        }}
      >
        Start
      </button>
      <button
        onClick={() => {
          gameDeck?.deal(hand, 1);
          trigger();
        }}
      >
        Hit
      </button>
      <button>Stand</button>
    </div>
  );
};
