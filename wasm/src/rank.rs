use self::Rank::*;

#[derive(Serialize, Deserialize, Copy, Clone)]
pub enum Rank {
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
  pub fn from_char(char: &str) -> Result<Rank, &'static str> {
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

  pub fn get_value(&self) -> Result<u32, &'static str> {
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
