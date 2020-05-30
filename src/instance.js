const codeBody = () => {
  let _body = [];
  let _nodeIndex = 0;
  let _textIndex = 0;
  let _state = [];
  let _imports = [];

  const getState = () => _state;
  const getNodeIndex = () => _nodeIndex - 1;
  const getTextIndex = () => _textIndex - 1;
  const getImports = () => _imports;
  const getBody = () => _body;

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

  const body = (code) => {
    _body.push(code);
  };

  // TODO: maybe rename these functions things like nodeIndex return a
  // nodeIndex but they also set the next node index. the getters should
  // technically just be imports() rather than getImports(). So maybe the
  // nodeIndex should instead be nextNodeIndex() and the getter nodeIndex()
  return {
    /* getters */
    getImports,
    getState,
    getNodeIndex,
    getTextIndex,
    getBody,
    /* setters */
    nodeIndex,
    textIndex,
    state,
    imports,
    body,
  };
};

export const instance = codeBody();
