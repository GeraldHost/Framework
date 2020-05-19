use wasm_bindgen::prelude::*;

use crate::view::{View};
use crate::operations::{Operation, ElementType};

#[wasm_bindgen]
pub fn create_view() -> View {
    View::new()
}

pub fn text_node(view: &mut View, string: String) {
   view.push(Operation::TextNode(string)); 
}

pub fn element(view: &mut View, element_type: ElementType) {
    view.push(Operation::Element(element_type));
}

pub fn child(view: &mut View) {
    view.push(Operation::Child);
}
