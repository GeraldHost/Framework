#!/usr/bin/env node
var acorn = require("acorn");
var jsx = require("acorn-jsx");
var fs = require("fs");

const programme = fs.readFileSync("./main.js");

let resp = [
  "use wasm_bindgen::prelude::*;",
  "#[wasm_bindgen(start)]",
  "pub fn run() -> Result<(), JsValue> {",
];
let nodeCount = 0;
let stateCount = 0;
let textCount = 0;
let stateMap = [];

const parse = (ast, parentIndex) => {
  if (ast.body) {
    ast.body.forEach(parse);
  }

  if (ast.type === "VariableDeclaration") {
    if (ast.declarations[0].id.name[0] === "$") {
      resp.push(
        `let s${stateCount} = State::new("${ast.declarations[0].init.value}".to_string());`
      );
      stateMap.push(ast.declarations[0].id.name);
      stateCount++;
    }
  }

  if (ast.type === "ExpressionStatement" && ast.expression) {
    parse(ast.expression);
  }

  if (ast.type === "JSXElement") {
    const node_type = ast.openingElement.name.name;
    resp.push(`let n${nodeCount} = node("${node_type}")?;`);
    if (!isNaN(parentIndex)) {
      resp.push(`append(&n${parentIndex}, &n${nodeCount});`);
    }
    nodeCount++;
  }

  if (ast.children) {
    const parentNodeIndex = nodeCount - 1;
    ast.children.forEach(node => {
      parse(node, parentNodeIndex);
    });
  }

  if (ast.type === "JSXText") {
    resp.push(`let t${textCount} = text("${ast.value}");`);
    if (!isNaN(parentIndex)) {
      resp.push(`append_text(&n${parentIndex}, &t${textCount});`);
    }
    textCount++;
  }

  if (ast.type === "JSXExpressionContainer") {
    const stateIndex = stateMap.indexOf(ast.expression.name);
    resp.push(`let t${textCount} = text(s${stateIndex}.value());`);
    if (!isNaN(parentIndex)) {
      resp.push(`append_text(&n${parentIndex}, &t${textCount});`);
    }
    textCount++;
  }
};

const ast = acorn.Parser.extend(jsx()).parse(programme);

parse(ast);

resp.push("render(n0);");
resp.push("Ok(())");
resp.push("}");

console.log(resp.join("\n"));
