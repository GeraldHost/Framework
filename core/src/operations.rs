use crate::node::{Node};

pub enum ElementType {
    Div,
    P,
}

pub enum Operation {
    Child,
    Element(ElementType),
    TextNode(String),
    // this operation would bind the state payload to the RHS
    // so if had a piece of state that was being consumed in a textNode
    // the virtual stack might look something like:
    // [
    //  TextNode(String),
    //  Bind(state),
    // ]
    // where the string will be replaced by the state. I need to figure
    // out exactly how this would be resolved but it shouldn't be too
    // difficult. (famous last words)
    // Bind(state)
}

pub fn child(lhs: Node, mut rhs: Node) -> Node {
    rhs.push_child(lhs);
    rhs
}
