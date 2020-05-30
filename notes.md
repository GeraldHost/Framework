JS

```
$count = 0;
const increment = () => $count = $count + 1;
V: <button onClick={increment}>{$count}</button>
```

Import.js

```
export const increment = (state) => state.set(state.value() + 1);
```

Rust

```
#[wasm_bindgen(module = "./src/import.js")]
extern {
  fn increment(state: State);
}
#[wasm_bindgen(start)]
fn run() {
  let s1 = State::new(0);
  let n0 = node("button");
  listener(&n0, "click", increment);
}
```
