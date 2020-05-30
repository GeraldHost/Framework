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

export const codeBodyInstance = codeBody();
