import path from "path";

export const rustLibOutputFile = path.resolve(
  __dirname,
  "..",
  "output",
  "src",
  "lib.rs"
);

export const codeHeader = [
  "use core::{State, render, node, text, append, append_text};",
  "use wasm_bindgen::prelude::*;",
  "#[wasm_bindgen(start)]",
  "pub fn run() -> Result<(), JsValue> {",
];

export const codeFooter = ["render(n0);", "Ok(())", "}"];
