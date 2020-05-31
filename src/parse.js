/**
 * NodeInstance
 * Create an instance of a node which returns an object of only the
 * information we care about such as the state and boolean idetity values
 */
export const nodeInstance = (x) => {
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
