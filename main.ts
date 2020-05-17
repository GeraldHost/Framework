const start = (wasm: any) => {
  console.log(wasm);

  const view = wasm.createView();
  const createNode = (nodeType: any, children: any) => wasm.createNode(view, nodeType, children);
  
  const nodeIndex = createNode(wasm.NodeType.Div, [
    createNode(wasm.NodeType.P, [])
  ]);
  
  // should be nodeIndex 2
  console.log('nodeIndex', nodeIndex);
}

import("./core/pkg").then(start)
