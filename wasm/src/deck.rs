extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

use self::Rank::*;
use self::Suit::*;

#[derive(Serialize)]
enum Rank {
  Ace,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
}

impl Rank {
  fn from_char(char: &str) -> Result<Rank, &'static str> {
    match char {
      "1" | "A" => Ok(Ace),
      "2" => Ok(Two),
      "3" => Ok(Three),
      "4" => Ok(Four),
      "5" => Ok(Five),
      "6" => Ok(Six),
      "7" => Ok(Seven),
      "8" => Ok(Eight),
      "9" => Ok(Nine),
      "T" => Ok(Ten),
      "J" => Ok(Jack),
      "Q" => Ok(Queen),
      "K" => Ok(King),
      _   => Err("Rank not found")
    }
  }
}

#[derive(Serialize)]
enum Suit {
  Spades,
  Hearts,
  Diamonds,
  Clubs
}

impl Suit {
  fn from_char(char: &str) -> Result<Suit, &'static str> {
    match char {
      "S" => Ok(Spades),
      "H" => Ok(Hearts),
      "D" => Ok(Diamonds),
      "C" => Ok(Clubs),
      _   => Err("Suit not found")
    }
  }
}

#[derive(Serialize)]
struct Card {
  rank: Rank,
  suit: Suit
}

impl Card {
  fn new(rank: Rank, suit: Suit) -> Card {
    Card {
      rank,
      suit 
    }
  }

  fn all_cards() -> Vec<Card> {
    let mut result = vec![];
    let rank_chars = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
    let suit_chars = ["S", "H", "D", "C"];
    for suit_char in suit_chars.into_iter() {
      for rank_char in rank_chars.into_iter() {
        result.push(Card {
          rank: Rank::from_char(rank_char).unwrap(),
          suit: Suit::from_char(suit_char).unwrap()
        });
      }
    }
    result
  }
}

#[wasm_bindgen]
pub struct Deck {
  cards: Vec<Card>,
  dealt_cards: Vec<Card>
}

#[wasm_bindgen]
impl Deck {
  pub fn new() -> Deck {
    Deck {
      cards: Card::all_cards(),
      dealt_cards: vec![]
    }
  }

  pub fn get_cards(&self) -> JsValue {
    JsValue::from_serde(&self.cards).unwrap()
  }

  pub fn get_dealt_cards(&self) -> JsValue {
    JsValue::from_serde(&self.dealt_cards).unwrap()
  }
  
  pub fn deal(&mut self, count: usize) -> JsValue {
    for _ in 0..count {
      if let Some(card) = self.cards.pop() {
        self.dealt_cards.push(card);
      }
    }
    self.get_dealt_cards()
  }
}

fn main() {

}