#!/usr/bin/env node
var acorn = require("acorn");
var jsx = require("acorn-jsx");
var fs = require("fs");

const programme = fs.readFileSync("./main.js");

const codeHeader = [
  "use wasm_bindgen::prelude::*;",
  "#[wasm_bindgen(start)]",
  "pub fn run() -> Result<(), JsValue> {",
];

const codeFooter = ["Ok(())", "}"];

const rustNode = (nodeIndex, t) =>
  `let n${nodeIndex()} = node("${t}")?;`;
const rustText = (textIndex, v) =>
  `let t${textIndex()} = text("${v}")?;`;
const rustStateText = (textIndex, stateIndex) =>
  `let t${textIndex()} = text(s${stateIndex}.value)?;`;
const rustAppend = (parent, child) =>
  `append(&n${parent}, &n${child})`;
const rustAppendText = (parent, child) =>
  `append(&n${parent}, &t${child})`;

const codeBody = () => {
  let currentNodeIndex = 0;
  let currentTextIndex = 0;
  let currentState = [];

  const getCurrentState = () => currentState;
  const getCurrentNodeIndex = () => currentNodeIndex - 1;
  const getCurrentTextIndex = () => currentTextIndex - 1;

  const nodeIndex = () => {
    const index = currentNodeIndex;
    currentNodeIndex++;
    return index;
  };

  const textIndex = () => {
    const index = currentTextIndex;
    currentTextIndex++;
    return index;
  };

  const state = (name, value) => {
    currentState.push(name);
    const index = currentState.length - 1;
    return { index, name, value };
  };

  return {
    currentState: getCurrentState,
    currentNodeIndex: getCurrentNodeIndex,
    currentTextIndex: getCurrentTextIndex,
    nodeIndex,
    textIndex,
    state,
  };
};
/**
 * NodeInstance
 * Create an instance of a node which returns an object of only the
 * information we care about such as the state and boolean idetity values
 */
const nodeInstance = x => {
  const state = {};

  const isVariableDeclaration = x.type === "VariableDeclaration";
  const isState =
    isVariableDeclaration &&
    x.declarations.reduce(
      (_, declaration) => declaration.id.name[0] === "$",
      false
    );

  if (isState) {
    if (x.declarations.length > 1) {
      throw "nodeInstance: variable decleration must be singular";
    }
    if (x.declarations[0].init.value === null) {
      throw "nodeInstance: state must be instantiated";
    }

    state.name = x.declarations[0].id.name;
    state.value = x.declarations[0].init.value;
  }

  const isJsxView =
    x.type === "LabeledStatement" && x.label.name === "V";

  return {
    isVariableDeclaration,
    isState,
    state,
    isJsxView,
  };
};

const parseChildView = (
  children,
  parentNodeIndex,
  codeBodyInstance
) => {
  const {
    nodeIndex,
    textIndex,
    currentState,
    currentTextIndex,
    currentNodeIndex,
  } = codeBodyInstance;
  return children.reduce((body, node) => {
    if (node.type === "JSXText") {
      const rustTextInstance = rustText(textIndex, node.value);
      const appendInstance = rustAppendText(
        parentNodeIndex,
        currentTextIndex()
      );
      return [...body, rustTextInstance, appendInstance];
    } else if (node.type === "JSXExpressionContainer") {
      const stateIndex = currentState().indexOf(node.expression.name);
      const stateTextInstance = rustStateText(textIndex, stateIndex);
      const appendInstance = rustAppendText(
        parentNodeIndex,
        currentTextIndex()
      );
      return [...body, stateTextInstance, appendInstance];
    } else if (node.type === "JSXElement") {
      const nodeType = node.openingElement.name.name;
      const nodeInstance = rustNode(nodeIndex, nodeType);
      const nestedNodeIndex = currentNodeIndex();
      const appendInstance = rustAppend(
        parentNodeIndex,
        nestedNodeIndex
      );
      const childBody = parseChildView(
        node.children,
        nestedNodeIndex, // what is this parent Node?
        codeBodyInstance
      );
      return [...body, nodeInstance, appendInstance, ...childBody];
    }
    return body;
  }, []);
};

/**
 * Parse View (JSX)
 * Parses view with is identified by the label "V:".
 * Walks each expressions and converts JSX elements into
 * rust code and returns the body
 */
const parseView = (node, codeBodyInstance) => {
  const { nodeIndex, currentNodeIndex } = codeBodyInstance;

  if (node.type !== "JSXElement") {
    throw '"V:" Labelled view must only contain JSX elements';
  }

  // parse the root node
  const rootNodeType = node.openingElement.name.name;
  const body = [rustNode(nodeIndex, rootNodeType)];

  const parentNodeIndex = currentNodeIndex();
  const childrenBody = node.children.length
    ? parseChildView(node.children, parentNodeIndex, codeBodyInstance)
    : [];

  return [...body, ...childrenBody];
};

/**
 * Parse
 * Walks the AST and parses each node returning a rust code body
 */
const parse = ast => {
  const { state, ...codeBodyInstance } = codeBody();

  return ast.reduce((body, n) => {
    const node = nodeInstance(n);

    if (node.isState) {
      const { index, value } = state(
        node.state.name,
        node.state.value
      );
      return [
        ...body,
        `let s${index} = State::new("${value}".to_string());`,
      ];
    } else if (node.isJsxView) {
      return [
        ...body,
        ...parseView(n.body.expression, {
          state,
          ...codeBodyInstance,
        }),
      ];
    }

    return a;
  }, codeHeader);
};

const ast = acorn.Parser.extend(jsx()).parse(programme);
const resp = parse(ast.body);
console.log([...resp, ...codeFooter].join("\n"));