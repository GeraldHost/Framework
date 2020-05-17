mod utils;
mod view;
mod node;

use crate::view::{View};
use crate::node::{Node, NodeType, NodeChildren};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn createView() -> View {
    View::new()
}

#[wasm_bindgen]
pub fn tree(view: &mut View) -> usize {
    view.nodes().len()
}

#[wasm_bindgen]
pub fn createNode(view: &mut View, node_type: NodeType, children: Vec<usize>) -> usize {
    let mut nodes: Vec<Node> = vec![];
    unsafe {
        for node_ptr in children {
            let node = std::ptr::read(node_ptr as *const Node);
            nodes.push(node);
        }
    }
    let node = Node::new(node_type, Some(nodes));
    let nodeIndex = view.pushNode(node);
    nodeIndex
}

 
fn main() {}
