export const rustNode = (index, type) =>
  `let n${index} = node("${type}")?;`;

export const rustText = (textIndex, value) =>
  `let t${textIndex} = text("${value}");`;

export const rustStateText = (textIndex, stateIndex) =>
  `let t${textIndex} = text(&s${stateIndex}.value().to_string());`;

export const rustAppend = (parent, child) =>
  `append(&n${parent}, &n${child});`;

export const rustAppendText = (parent, child) =>
  `append_text(&n${parent}, &t${child});`;

export const rustState = (index, value) => {
  if (typeof value === "number") {
    value = value;
  } else if (typeof value === "string") {
    value = `"${value}".to_string()`;
  } else {
    throw "state can only be a string or number";
  }
  return `let mut s${index} = State::new(${value});`;
};
