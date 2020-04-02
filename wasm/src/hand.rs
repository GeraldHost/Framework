use wasm_bindgen::prelude::*;

use crate::card::*;

#[wasm_bindgen]
pub struct Hand {
  cards: Vec<Card>,
}

#[wasm_bindgen]
impl Hand {
  pub fn new() -> Hand {
    Hand { cards: vec![] }
  }

  pub fn get_cards(&self) -> JsValue {
    JsValue::from_serde(&self.cards).unwrap()
  }

  pub fn push_card(&mut self, card: Card) {
    self.cards.push(card);
  }

  pub fn get_value(&mut self) -> u32 {
    let mut total: u32 = 0;
    for card in &self.cards {
      if let Ok(value) = card.rank.get_value() {
        total = total + value;
      }
    }
    total
  }
}
