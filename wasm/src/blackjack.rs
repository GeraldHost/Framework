use wasm_bindgen::prelude::*;

use crate::hand::Hand;

#[wasm_bindgen]
pub struct BlackJack {}

impl BlackJack {
  pub fn is_bust(hand: &mut Hand) -> bool {
    let hand_value = hand.get_value();
    if (hand_value > 21) {
      true
    } else {
      false
    }
  }
}
