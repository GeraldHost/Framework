use self::Suit::*;

#[derive(Serialize, Deserialize, Copy, Clone)]
pub enum Suit {
  Spades,
  Hearts,
  Diamonds,
  Clubs,
}

impl Suit {
  pub fn from_char(char: &str) -> Result<Suit, &'static str> {
    match char {
      "S" => Ok(Spades),
      "H" => Ok(Hearts),
      "D" => Ok(Diamonds),
      "C" => Ok(Clubs),
      _ => Err("Suit not found"),
    }
  }
}
