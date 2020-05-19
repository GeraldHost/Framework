use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub enum NodeType {
    Div,
    P,
    TextNode,
}

pub type NodeChildren = Option<Vec<Node>>;

#[wasm_bindgen]
pub struct Node {
    key: u32,
    node_type: NodeType,
    children: NodeChildren, 
}

impl Node {
    pub fn new(node_type: NodeType, children: NodeChildren) -> Self {
        Self {
            key: 0, // figure out how to do keys?
            node_type: node_type,
            children: children
        }
    }

    pub fn push_child(&mut self, node: Node) {
        match &mut self.children {
            Some(children) => children.push(node),
            None => self.children = Some(vec![node]),
        }
    }
}

