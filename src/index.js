import fs from "fs";
import path from "path";
import yargs from "yargs";
import acorn from "acorn";
import jsx from "acorn-jsx";
import { spawn } from "child_process";
import { sync as commandExistsSync } from "command-exists";

import {
  codeHeader,
  codeFooter,
  rustLibOutputFile,
  rustOutputDir,
} from "./constants";
import { searchForState, compileState } from "./compiler/state";
import { searchForView, compileView } from "./compiler/view";

const command = (y) => {
  y.positional("file", {
    describe: "file",
  }).options({
    out: {
      alias: "o",
      describe: "output directory",
      default: path.resolve(process.cwd(), "wasm-dist"),
    },
    verbose: {
      alias: "v",
      type: "boolean",
      default: false,
    },
  });
};

// TODO: add logging
const builder = ({ file, out, verbose }) => {
  if (!commandExistsSync("wasm-pack")) {
    console.error("🚨 please install wasm-pack");
    exit;
  }

  const input = path.resolve(file);
  const code = fs.readFileSync(input, "utf8");

  const ast = acorn.Parser.extend(jsx()).parse(code);

  const stateAstArray = searchForState(ast);
  const { compiledState, stateMap } = compileState(stateAstArray);
  console.log("compiledState", compiledState);

  const viewNode = searchForView(ast);
  const { compiledView, nodeMap, textMap } = compileView(
    viewNode,
    stateMap
  );
  console.log("compiledView", compiledView);

  // TODO: compile functions

  // const codeBody = [
  //   ...codeHeader,
  //   ...instance.body(),
  //   ...codeFooter,
  // ].join("\n");

  // return;

  // fs.writeFileSync(rustLibOutputFile, codeBody);

  // // TODO: abstract this to another file/function
  // const outDir = path.resolve(process.cwd(), out);
  // const exec = spawn("wasm-pack", ["build", "--out-dir", outDir], {
  //   cwd: rustOutputDir,
  // });

  // exec.stdout.on("data", (data) => {
  //   if (verbose) console.log(`stdout: ${data}`);
  // });
  // exec.stderr.on("data", (data) => {
  //   if (verbose) console.error(`ps stderr: ${data}`);
  // });
  // exec.on("error", (err) => {
  //   if (verbose) console.error(err);
  // });
};

yargs.command("$0 <file>", "framework [file]", command, builder).argv;
