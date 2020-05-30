pub mod state;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

use crate::state::State;

pub type Node = web_sys::Element;
pub type TextNode = web_sys::Text;

pub enum NodeType {
    Node(Node),
    TextNode(TextNode)
}

fn document() -> web_sys::Document {
    let window = web_sys::window().expect("window not found");
    window.document().expect("document not found")
}

pub fn node(node_type: &str) -> Result<Node, JsValue> {
    let document = document();
    document.create_element(node_type)
}

pub fn listener<T>(node: &Node, event_name: &str, handler: T)
where
    T: 'static + FnMut(web_sys::Event),
{
    let callback = Closure::wrap(Box::new(handler) as Box<dyn FnMut(_)>);
    node.add_event_listener_with_callback(event_name, callback.as_ref().unchecked_ref())
        .unwrap();
    callback.forget();
}

pub fn text(value: &str) -> TextNode {
    let document = document();
    document.create_text_node(value)
}

pub fn render(node: Node) {
    let document = document();
    let body = document.body().expect("document should have a body");
    body.append_child(&node);
}

pub fn append(parent: &Node, child: &Node) {
    parent.append_child(child);
}

pub fn append_text(parent: &Node, text: &TextNode) {
    parent.append_child(text);
}
