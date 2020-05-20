use wasm_bindgen::prelude::*;

use crate::view::{View};
use crate::operations::{Operation, ElementType};

#[wasm_bindgen]
pub fn create_view() -> View {
    View::new()
}

#[wasm_bindgen]
pub fn text_node(view: &mut View, string: String) {
   view.push(Operation::TextNode(string)); 
}

#[wasm_bindgen]
pub fn element(view: &mut View, element_type_index: u32) {
    let element_type = match element_type_index {
        0 => ElementType::Div,
        1 => ElementType::P,
        _ => panic!("interop:element: element type not found")
    };
    view.push(Operation::Element(element_type));
}

#[wasm_bindgen]
pub fn child(view: &mut View) {
    view.push(Operation::Child);
}

#[wasm_bindgen]
pub fn debug_view(view: &View) -> String {
    format!("{:?}", view).to_string()
}
