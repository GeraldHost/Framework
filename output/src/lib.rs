use core::{State, render, node, text, append, append_text};
use wasm_bindgen::prelude::*;
#[wasm_bindgen(start)]
pub fn run() -> Result<(), JsValue> {
let s0 = State::new("Count".to_string());
let s1 = State::new("0".to_string());
let n0 = node("div")?;
let n1 = node("p")?;
append(&n0, &n1);
let t0 = text("text");
append_text(&n1, &t0);
let n2 = node("button")?;
append(&n0, &n2);
let t1 = text(s0.value());
append_text(&n2, &t1);
let t2 = text(": ");
append_text(&n2, &t2);
let t3 = text(s1.value());
append_text(&n2, &t3);
render(n0);
Ok(())
}