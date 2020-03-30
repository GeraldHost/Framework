import React from "react";
import { useDeck } from "./subjects/deck";

export const Deck = () => {
  const { state } = useDeck();
  return (
    <div>
      <h2>Deck:</h2>
      <p>
        <b>Count:</b> {state?.cards.length}
      </p>
    </div>
  );
};
