use core::{NodeType, render, node, text, append, append_text, listener};
use core::state::{State};
use wasm_bindgen::JsCast;
use wasm_bindgen::prelude::*;
#[wasm_bindgen(start)]
pub fn run() -> Result<(), JsValue> {
let mut s0 = State::new("Count".to_string());
let mut s1 = State::new(0);
let n0 = node("div")?;
let n1 = node("p")?;
append(&n0, &n1);
let t0 = text("text");
append_text(&n1, &t0);
let n2 = node("button")?;
append(&n0, &n2);
let t1 = text(&s0.value().to_string());
append_text(&n2, &t1);
let t2 = text(": ");
append_text(&n2, &t2);
let t3 = text(&s1.value().to_string());
append_text(&n2, &t3);
s1.bind(NodeType::TextNode(t3));
let callback = move |event: web_sys::Event| {
s1.set(s1.value() + 1);
};
listener(&n2, "click", callback);
render(n0);
Ok(())
}