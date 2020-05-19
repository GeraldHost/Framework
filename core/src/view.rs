use wasm_bindgen::prelude::*;

use crate::operations::{Operation};


#[wasm_bindgen]
pub struct View {
    stack: Vec<Operation>
}

impl View {
    pub fn new() -> Self {
        Self { stack: vec![] }
    }
    
    pub fn stack(&mut self) -> &Vec<Operation> {
        &self.stack
    }
    
    pub fn push(&mut self, operation: Operation) {
        self.stack.push(operation);
    }
    
    // stringify the stack so we can have a look it in JS
    pub fn debug(&mut self) {}
    
    // we will need to render our stack. The view stack is a virtual stack
    // we can interate through interpreating the intstructions to produce what
    // the next dom stack will look like. This will be the "next stack" we can
    // then compare this with the "current stack" and do diff to determine what
    // effects are required to update the dom
    pub fn render() {}
}

