export const compiler = (parser) => (
  node,
  parentNodeIndex = false
) => {
  const type = node.type;
  const parserFn = parser[type];
  if (!parserFn) return;

  parserFn(node, parentNodeIndex, compiler(parser));
};

export const compile = (nodes, parser) => {
  const parseCompiler = compiler(parser);
  nodes.forEach((node) => parseCompiler(node));
};
