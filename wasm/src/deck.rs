use rand::Rng;
use wasm_bindgen::prelude::*;

use crate::card::*;
use crate::hand::*;

fn knuth_shuffle<T>(v: &mut Vec<T>) {
  let mut rng = rand::thread_rng();
  let l = v.len();

  for n in 0..l {
    let i = rng.gen_range(0, l - n);
    v.swap(i, l - n - 1);
  }
}

#[wasm_bindgen]
pub struct Deck {
  cards: Vec<Card>,
  dealt_cards: Vec<Card>,
}

#[wasm_bindgen]
impl Deck {
  pub fn new() -> Deck {
    Deck {
      cards: Card::all_cards(),
      dealt_cards: vec![],
    }
  }

  pub fn get_cards(&self) -> JsValue {
    JsValue::from_serde(&self.cards).unwrap()
  }

  pub fn get_dealt_cards(&self) -> JsValue {
    JsValue::from_serde(&self.dealt_cards).unwrap()
  }

  pub fn deal(&mut self, hand: &mut Hand, count: usize) -> JsValue {
    for _ in 0..count {
      if let Some(card) = self.cards.pop() {
        self.dealt_cards.push(card);
        hand.push_card(card);
      }
    }
    self.get_dealt_cards()
  }

  pub fn shuffle(&mut self) {
    knuth_shuffle(&mut self.cards);
  }
}
