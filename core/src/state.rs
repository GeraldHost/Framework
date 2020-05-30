use crate::{NodeType};
use std::string::ToString;

pub struct State<T: ToString> {
    value: T,
    bindings: Vec<NodeType>
}

impl<T: ToString> State<T> {
    pub fn new(string: T) -> Self {
        State { value: string, bindings: vec![] }
    }
    pub fn value(&self) -> &T {
        &self.value
    }
    pub fn set(&mut self, value: T) {
      self.value = value;
      self.update_bindings();
    }
    pub fn bind(&mut self, node: NodeType) {
      self.bindings.push(node);
    }
    pub fn update_bindings(&self) {
      for binding in &self.bindings {
        match binding {
          NodeType::Node(node) => panic!("bindings not implemented for nodes"),
          NodeType::TextNode(text_node) => text_node.set_data(&self.value().to_string())
        }
      }
    }
}
