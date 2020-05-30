import { instance } from "./instance";
import { codeHeader } from "./constants";

const rustNode = (nodeIndex, type) =>
  `let n${nodeIndex()} = node("${type}")?;`;
const rustText = (textIndex, value) =>
  `let t${textIndex()} = text("${value}");`;
const rustStateText = (textIndex, stateIndex) =>
  `let t${textIndex()} = text(&s${stateIndex}.value().to_string());`;
const rustAppend = (parent, child) =>
  `append(&n${parent}, &n${child});`;
const rustAppendText = (parent, child) =>
  `append_text(&n${parent}, &t${child});`;
const rustState = (index, value) => {
  if (typeof value === "number") {
    value = value;
  } else if (typeof value === "string") {
    value = `"${value}".to_string()`;
  } else {
    throw "state can only be a string or number";
  }
  return `let mut s${index} = State::new(${value});`;
};

/**
 * NodeInstance
 * Create an instance of a node which returns an object of only the
 * information we care about such as the state and boolean idetity values
 */
const nodeInstance = (x) => {
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
    ...x,
    isVariableDeclaration,
    isState,
    state,
    isJsxView,
  };
};

const parseChildView = (children, parentNodeIndex) => {
  const {
    nodeIndex,
    textIndex,
    getState,
    getTextIndex,
    getNodeIndex,
  } = instance;

  return children.reduce((body, node) => {
    if (node.type === "JSXText") {
      if (node.value.trim() === "") {
        return body;
      }

      const rustTextInstance = rustText(textIndex, node.value);
      const appendInstance = rustAppendText(
        parentNodeIndex,
        getTextIndex()
      );
      return [...body, rustTextInstance, appendInstance];
    } else if (node.type === "JSXExpressionContainer") {
      const stateIndex = getState().indexOf(node.expression.name);
      const stateTextInstance = rustStateText(textIndex, stateIndex);
      const appendInstance = rustAppendText(
        parentNodeIndex,
        getTextIndex()
      );
      return [...body, stateTextInstance, appendInstance];
    } else if (node.type === "JSXElement") {
      const nodeType = node.openingElement.name.name;
      const nodeInstance = rustNode(nodeIndex, nodeType);
      const nestedNodeIndex = getNodeIndex();
      const appendInstance = rustAppend(
        parentNodeIndex,
        nestedNodeIndex
      );
      const childBody = parseChildView(
        node.children,
        nestedNodeIndex,
        instance
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
const parseView = (node) => {
  const { nodeIndex, getNodeIndex } = instance;

  if (node.type !== "JSXElement") {
    throw '"V:" Labelled view must only contain JSX elements';
  }

  // parse the root node
  const rootNodeType = node.openingElement.name.name;
  const body = [rustNode(nodeIndex, rootNodeType)];

  const parentNodeIndex = getNodeIndex();
  const childrenBody = parseChildView(
    node.children,
    parentNodeIndex,
    instance
  );

  return [...body, ...childrenBody];
};

/**
 * Parse
 * Walks the AST and parses each node returning a rust code body
 */
const parse = (ast) => {
  const { state } = instance;

  return ast.reduce((body, n) => {
    const node = nodeInstance(n);

    if (node.isState) {
      const { index, value } = state(
        node.state.name,
        node.state.value
      );
      console.log("TYPE OF", typeof node.state.value);
      return [...body, rustState(index, value)];
    } else if (node.isJsxView) {
      return [...body, ...parseView(node.body.expression, instance)];
    }

    return body;
  }, codeHeader);
};

export default parse;
