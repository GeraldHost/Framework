extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

extern crate rand;
use rand::Rng;

use self::Rank::*;
use self::Suit::*;

#[derive(Serialize, Deserialize, Copy, Clone)]
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
      _ => Err("Rank not found"),
    }
  }

  fn get_value(&self) -> Result<u32, &'static str> {
    match self {
      Ace => Ok(1),
      Two => Ok(2),
      Three => Ok(3),
      Four => Ok(4),
      Five => Ok(5),
      Six => Ok(6),
      Seven => Ok(7),
      Eight => Ok(8),
      Nine => Ok(9),
      Ten => Ok(10),
      Jack => Ok(10),
      Queen => Ok(10),
      King => Ok(10),
      _ => Err("Rank not found"),
    }
  }
}

#[derive(Serialize, Deserialize, Copy, Clone)]
enum Suit {
  Spades,
  Hearts,
  Diamonds,
  Clubs,
}

impl Suit {
  fn from_char(char: &str) -> Result<Suit, &'static str> {
    match char {
      "S" => Ok(Spades),
      "H" => Ok(Hearts),
      "D" => Ok(Diamonds),
      "C" => Ok(Clubs),
      _ => Err("Suit not found"),
    }
  }
}

#[derive(Serialize, Deserialize, Copy, Clone)]
struct Card {
  rank: Rank,
  suit: Suit,
}

impl Card {
  fn new(rank: Rank, suit: Suit) -> Card {
    Card { rank, suit }
  }

  fn all_cards() -> Vec<Card> {
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

  fn push_card(&mut self, card: Card) {
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

#[wasm_bindgen]
pub struct Game {}

#[wasm_bindgen]
impl Game {
  pub fn is_bust(hand: &mut Hand) -> bool {
    let hand_value = hand.get_value();
    if (hand_value > 21) {
      true
    } else {
      false
    }
  }
}
