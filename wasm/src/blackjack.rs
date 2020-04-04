use wasm_bindgen::prelude::*;

use crate::deck::Deck;
use crate::hand::Hand;

#[wasm_bindgen]
pub struct BlackJack {
  deck: Deck,
  hands: Vec<Hand>,
}

impl BlackJack {
  pub fn start(&mut self) {
    self.deck = Deck::new();
  }

  pub fn deal_all_hands(&mut self, hands: Vec<Hand>) {
    for hand in hands {
      self.deck.deal(&mut hand, 2);
    }
  }

  pub fn deal(&mut self, hand: Hand) {
    self.deck.deal(&mut hand, 1);
  }

  pub fn is_bust(hand: &mut Hand) -> bool {
    let hand_value = hand.value();
    if hand_value > 21 {
      true
    } else {
      false
    }
  }

  pub fn get_deck(&mut self) -> Deck {
    self.deck
  }
}
