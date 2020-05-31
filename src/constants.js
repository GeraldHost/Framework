import path from "path";

export const rustOutputDir = path.resolve(__dirname, "..", "output");

export const rustLibOutputFile = path.resolve(
  rustOutputDir,
  "src",
  "lib.rs"
);

export const codeHeader = [
  "use core::{NodeType, render, node, text, append, append_text, listener};",
  "use core::state::{State};",
  "use wasm_bindgen::JsCast;",
  "use wasm_bindgen::prelude::*;",
  "#[wasm_bindgen(start)]",
  "pub fn run() -> Result<(), JsValue> {",
];

// TODO: remove manual implementation of listener
export const codeFooter = [
  "s1.bind(NodeType::TextNode(t2));",
  "let callback = move |event: web_sys::Event| {",
  "s1.set(s1.value() + 1);",
  "};",
  'listener(&n1, "click", callback);',
  "render(n0);",
  "Ok(())",
  "}",
];
