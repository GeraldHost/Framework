# Framework

This is a working idea to take code written in Javascript and convert it into something we can run in the browser with WebAssembly. Currently we take a JS file, parse it, convert it to some rust functions then compile that to WebAssembly. Currently it only sets up state objects based on dollar named variables `let $state` which can then be consumed in JSX expressions `<p>{$state}</p>`.

Next task is to parse assigment operators on those state variables to call set on the state object in rust. This would obviously be a lot easier if WebAssembly supported reference types but for now we will look at passing the javascript function into rust to call it and converting the `$state = 1` varibale to something that resembals `state.set(1)` in rust.

## TODO?

- use acorn-walk `https://github.com/acornjs/acorn/tree/master/acorn-walk`

# peer dependancies

- wasm-pack
- rust
- cargo
- node

todo: at some point convert compiler to TS
