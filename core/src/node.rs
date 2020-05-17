use crate::view::View;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub enum NodeType {
    Div,
    P,
    TextNode,
}

pub type NodeKey = u32;

pub type NodeChildren = Option<Vec<NodeKey>>;

#[wasm_bindgen]
pub struct Node {
    key: u32,
    node_type: NodeType,
    children: NodeChildren, 
}

impl Node {
    pub fn new(view: &mut View, node_type: NodeType, children: NodeChildren) {
        let node = Self {
            key: 0, // figure out how to do keys?
            node_type: node_type,
            children: children
        };
        view.pushNode(node);
    }
}

