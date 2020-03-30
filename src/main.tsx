import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./App";

const wasm = import("../wasm/pkg");

wasm.then(wasm => {
  ReactDOM.render(
    <App wasm={wasm} />,
    document.getElementById("root")
  );
});
