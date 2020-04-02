use wasm_bindgen::prelude::*;

use crate::rank::Rank;
use crate::suit::Suit;

#[wasm_bindgen]
#[derive(Serialize, Deserialize, Copy, Clone)]
pub struct Card {
  #[wasm_bindgen(skip)]
  pub rank: Rank,
  #[wasm_bindgen(skip)]
  pub suit: Suit,
}

impl Card {
  fn new(rank: Rank, suit: Suit) -> Card {
    Card { rank, suit }
  }

  pub fn all_cards() -> Vec<Card> {
    let mut result = vec![];
    let rank_chars = [
      "A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K",
    ];
    let suit_chars = ["S", "H", "D", "C"];
    for suit_char in suit_chars.into_iter() {
      for rank_char in rank_chars.into_iter() {
        result.push(Card {
          rank: Rank::from_char(rank_char).unwrap(),
          suit: Suit::from_char(suit_char).unwrap(),
        });
      }
    }
    result
  }
}
