const codeBody = () => {
  let _body = [];
  let _state = [];
  let _imports = [];
  let _nodeIndex = 0;
  let _textIndex = 0;

  const body = () => _body;
  const state = () => _state;
  const imports = () => _imports;

  const nextNodeIndex = () => {
    return _nodeIndex++;
  };

  const nextTextIndex = () => {
    return _textIndex++;
  };

  const pushState = (name, value) => {
    _state.push(name);
    const index = _state.length - 1;
    return { index, name, value };
  };

  const pushImports = (...value) => {
    value.forEach((item) => _imports.push(item));
  };

  const pushBody = (...code) => {
    code.forEach((item) => _body.push(item));
  };

  return {
    /* getters */
    imports,
    state,
    body,
    /* setters */
    nextNodeIndex,
    nextTextIndex,
    pushState,
    pushImports,
    pushBody,
  };
};

export const instance = codeBody();
