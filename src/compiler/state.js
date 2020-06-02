import { compile } from "../compile";

const stateMap = new Map();

export const rustState = (index, value) => {
  if (typeof value === "number") {
    value = value;
  } else if (typeof value === "string") {
    value = `"${value}".to_string()`;
  } else {
    throw "state can only be a string or number";
  }
  return `let mut s${index} = State::new(${value});`;
};

const parser = {
  VariableDeclarator(node) {
    if (node.init.value === null) {
      throw "nodeInstance: state must be instantiated";
    }
    stateMap.set(node.id.name, node.init.value);
  },
};

export const searchForState = (ast) =>
  ast.body.reduce((declarations, node) => {
    if (node.type === "VariableDeclaration" && node.declarations) {
      return [
        ...declarations,
        ...node.declarations.filter((declaration) => {
          return declaration.id.name[0] === "$";
        }),
      ];
    }
    return declarations;
  }, []);

export const compileState = (nodes) => {
  compile(nodes, parser);
  const compiledState = Array.from(stateMap, ([_, value], index) =>
    rustState(index, value)
  );
  return { compiledState, stateMap };
};
