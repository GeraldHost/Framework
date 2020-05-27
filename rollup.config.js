import path from "path";

const output = path.resolve(__dirname, "dist", "index.js");
const entry = path.resolve(__dirname, "src", "index.js");

export default {
  input: entry,
  output: {
    banner: "#!/usr/bin/env node",
    file: output,
    format: "cjs",
  },
};
