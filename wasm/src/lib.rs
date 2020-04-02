#[macro_use]
extern crate serde_derive;

pub mod rank;

pub mod suit;

pub mod card;

pub mod deck;

pub mod hand;

pub mod blackjack;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

pub fn main() {}
