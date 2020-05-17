use crate::node::{Node, NodeType, NodeChildren};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct View {
    nodes: Vec<Node>,
}

impl View {
    pub fn new() -> Self {
        Self { nodes: vec![] }
    }

    pub fn pushNode(&mut self, node: Node) {
        self.nodes.push(node);
    }

    pub fn nodes(&self) -> &Vec<Node> {
        &self.nodes
    }
    
    pub fn render() {}
}

