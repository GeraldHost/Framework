use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

pub struct State {
    value: String
}

impl State {
    pub fn new(string: String) -> Self {
        State { value: string }
    }
    pub fn value(&self) -> &String {
        &self.value
    }
}

pub fn node(node_type: &str) -> Result<web_sys::Element, JsValue> {
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    document.create_element(node_type)
}

pub fn text(value: &str) -> web_sys::Text {
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    document.create_text_node(value)
}

pub fn render(node: web_sys::Element) {
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    let body = document.body().expect("document should have a body");
    body.append_child(&node);
}

pub fn append(parent: &web_sys::Element, child: &web_sys::Element) {
    parent.append_child(child);
}

pub fn append_text(parent: &web_sys::Element, text: &web_sys::Text) {
    parent.append_child(text);
}
