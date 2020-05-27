import fs from "fs";
import path from "path";
import yargs from "yargs";
import acorn from "acorn";
import jsx from "acorn-jsx";

import parse from "./parse";
import { codeFooter, rustLibOutputFile } from "./constants";

const command = (y) => {
  y.positional("file", {
    describe: "file",
  }).options({
    out: {
      alias: "o",
      describe: "output directory",
      default: "./wasm-dist",
    },
  });
};

const builder = ({ file }) => {
  const input = path.resolve(file);
  const programme = fs.readFileSync(input);

  const ast = acorn.Parser.extend(jsx()).parse(programme);
  const resp = parse(ast.body);

  const codeBody = [...resp, ...codeFooter].join("\n");

  fs.writeFileSync(rustLibOutputFile, codeBody);
};

yargs.command("$0 <file>", "framework [file]", command, builder).argv;
