const start = (wasm: any) => {
  console.log(wasm);
  const ptr = wasm.ptr_test();
  console.log('ptr', ptr);
  const resp = wasm.read_ptr(1001);
  console.log('resp', resp);
}

import("./core/pkg").then(start)
