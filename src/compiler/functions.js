import recast from "recast";
const builders = recast.types.builders;

const createFunctionInstance = (initialNode) => {
  let _node = initialNode;
  let _arguments = new Set();
  let _declerations = new Set();

  const node = () => _node;
  const updateNode = (node) => (_node = node);
  const args = () => _arguments;
  const declerations = () => _declerations;

  const addArgument = (argument) => {
    _arguments.add(argument);
  };

  const addVariableDecleration = (decleration) => {
    _declerations.add(decleration);
  };

  const evaluate = () => {
    const { id, params, body } = node();
    const resp = builders.functionDeclaration(
      id,
      [...params, ...Array.from(args())],
      builders.blockStatement([...declerations(), ...body.body])
    );
    updateNode(resp);
    return node();
  };

  return {
    updateNode,
    addVariableDecleration,
    addArgument,
    evaluate,
  };
};

const parser = (instance) => ({
  FunctionDeclaration(node, walker) {
    node.body = walker(node.body);
    return node;
  },
  BlockStatement(node, walker) {
    node.body = node.body.map((n) => walker(n));
    return node;
  },
  ExpressionStatement(node, walker) {
    node.expression = walker(node.expression);
    return node;
  },
  AssignmentExpression(node) {
    const lhs = node.left;
    const rhs = node.right;

    // TODO: this is very ugly
    if (lhs.name[0] === "$") {
      const rhsIdentifier = builders.identifier("rhs");
      const rhsDeclartion = builders.variableDeclaration("const", [
        builders.variableDeclarator(
          rhsIdentifier,
          builders.literal(rhs.value)
        ),
      ]);

      const stateIdentifier = builders.identifier("state");
      const callee = builders.callExpression(
        builders.memberExpression(
          stateIdentifier,
          builders.identifier("set")
        ),
        [rhsIdentifier]
      );

      instance.addVariableDecleration(rhsDeclartion);
      instance.addArgument(stateIdentifier);

      return callee;
    }
    return node;
  },
});

export const searchForFunctions = (ast) =>
  ast.body.reduce((functions, node) => {
    if (node.type === "FunctionDeclaration") {
      return [...functions, node];
    }
    return functions;
  }, []);

const compiler = (parser) => (node) => {
  const type = node.type;
  const parserFn = parser[type];
  if (!parserFn) return;

  return parserFn(node, compiler(parser));
};

const compile = (nodes, parser) => {
  const functions = new Set();
  nodes.forEach((node) => {
    const functionInstance = createFunctionInstance(node);
    const parserWithInstance = parser(functionInstance);
    const parseCompiler = compiler(parserWithInstance);
    const rewrittenNode = parseCompiler(node);

    functionInstance.updateNode(rewrittenNode);
    const code = functionInstance.evaluate();
    functions.add(recast.print(code).code);
  });
  return functions;
};

export const compileFunctions = (nodes) => compile(nodes, parser);
