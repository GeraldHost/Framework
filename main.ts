const start = (wasm: any) => {
  console.log(wasm);

  const view = wasm.create_view();

  wasm.element(view, 0);
  wasm.element(view, 1);
  wasm.text_node(view, "string");
  wasm.child(view);
  wasm.child(view);

  console.log(wasm.debug_view(view));
}

import("./core/pkg").then(start)
