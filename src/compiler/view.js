import { compile } from "../compile";

const nodeMap = new Set();
const textMap = new Set();

export const rustNode = (index, type) =>
  `let n${index} = node("${type}")?;`;

export const rustText = (textIndex, value) =>
  `let t${textIndex} = text("${value}");`;

export const rustStateText = (textIndex, stateIndex) =>
  `let t${textIndex} = text(&s${stateIndex}.value().to_string());`;

export const rustAppend = (parent, child) =>
  `append(&n${parent}, &n${child});`;

export const rustAppendText = (parent, child) =>
  `append_text(&n${parent}, &t${child});`;

const parser = (state) => ({
  JSXElement(node, parentNodeIndex, walker) {
    const elementType = node.openingElement.name.name;
    const nodeIndex = nodeMap.size;
    const nodeCode = rustNode(nodeIndex, elementType);
    nodeMap.add(nodeCode);

    if (parentNodeIndex !== false) {
      const appendCode = rustAppend(parentNodeIndex, nodeIndex);
      nodeMap.add(appendCode);
    }

    if (node.children) {
      node.children.forEach((child) => walker(child, nodeIndex));
    }
  },
  JSXText(node, parentNodeIndex) {
    if (node.value.trim() === "") {
      return;
    }
    const textIndex = textMap.size;
    const textCode = rustText(textIndex, node.value);
    textMap.add(textCode);

    if (parentNodeIndex !== false) {
      const appendCode = rustAppendText(parentNodeIndex, textIndex);
      textMap.add(appendCode);
    }
  },
  JSXExpressionContainer(node, parentNodeIndex) {
    const stateIndex = Array.from(state.keys()).indexOf(
      node.expression.name
    );
    const textIndex = textMap.size;
    const stateTextCode = rustStateText(textIndex, stateIndex);
    textMap.add(stateTextCode);

    if (parentNodeIndex !== false) {
      const appendCode = rustAppendText(parentNodeIndex, textIndex);
      textMap.add(appendCode);
    }
  },
});

export const searchForView = (ast) =>
  ast.body.reduce((view, node) => {
    if (
      node.type === "LabeledStatement" &&
      node.label.name === "V" &&
      node.body.type === "ExpressionStatement" &&
      node.body.expression &&
      node.body.expression.type === "JSXElement"
    ) {
      return node.body.expression;
    }
    return view;
  }, {});

export const compileView = (node, state) => {
  const parseWithState = parser(state);
  const compiledView = compile([node], parseWithState);
  return { compiledView, nodeMap, textMap };
};
