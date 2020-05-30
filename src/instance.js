const codeBody = () => {
  let _nodeIndex = 0;
  let _textIndex = 0;
  let _state = [];
  let _imports = [];

  const getState = () => _state;
  const getNodeIndex = () => _nodeIndex - 1;
  const getTextIndex = () => _textIndex - 1;
  const getImports = () => imports;

  const nodeIndex = () => {
    const index = _nodeIndex;
    _nodeIndex++;
    return index;
  };

  const textIndex = () => {
    const index = _textIndex;
    _textIndex++;
    return index;
  };

  const state = (name, value) => {
    _state.push(name);
    const index = _state.length - 1;
    return { index, name, value };
  };

  const imports = (value) => {
    _imports.push(value);
  };

  return {
    /* getters */
    getImports,
    getState,
    getNodeIndex,
    getTextIndex,
    /* setters */
    nodeIndex,
    textIndex,
    state,
    imports,
  };
};

export const instance = codeBody();
