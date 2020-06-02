// export const parser = {
//   VariableDeclaration(node) {
//     if (node.isState) {
//       const { index, value } = instance.pushState(
//         node.state.name,
//         node.state.value
//       );
//       const code = rustState(index, value);
//       instance.pushBody(code);
//     }
//   },
//   FunctionDeclaration(node, _, walker) {
//     walker(node.body);
//   },
//   BlockStatement(node, _, walker) {
//     node.body.forEach((n) => {
//       walker(n);
//     });
//   },
//   ExpressionStatement(node, _, walker) {
//     walker(node.expression);
//   },
//   LabeledStatement(node, _, walker) {
//     if (node.label.name !== "V") {
//       if (body.expression.type !== "JSXElement") {
//         throw "Labeled V: must contain a JSX element";
//       }
//     }
//     if (node.body && node.body.expression) {
//       walker(node.body.expression);
//     }
//   },
//   JSXElement(node, parentNodeIndex, walker) {
//     const elementType = node.openingElement.name.name;
//     const nodeIndex = instance.nextNodeIndex();

//     const nodeCode = rustNode(nodeIndex, elementType);
//     instance.pushBody(nodeCode);

//     if (parentNodeIndex !== false) {
//       const appendCode = rustAppend(parentNodeIndex, nodeIndex);
//       instance.pushBody(appendCode);
//     }

//     if (node.children) {
//       node.children.forEach((child) => walker(child, nodeIndex));
//     }
//   },
//   JSXText(node, parentNodeIndex) {
//     if (node.value.trim() === "") {
//       return;
//     }

//     const textIndex = instance.nextTextIndex();
//     const textCode = rustText(textIndex, node.value);
//     instance.pushBody(textCode);

//     if (parentNodeIndex !== false) {
//       const appendCode = rustAppendText(parentNodeIndex, textIndex);
//       instance.pushBody(appendCode);
//     }
//   },
//   JSXExpressionContainer(node, parentNodeIndex) {
//     const state = instance.state();
//     const stateIndex = state.indexOf(node.expression.name);
//     const textIndex = instance.nextTextIndex();
//     const stateTextCode = rustStateText(textIndex, stateIndex);
//     instance.pushBody(stateTextCode);

//     if (parentNodeIndex !== false) {
//       const appendCode = rustAppendText(parentNodeIndex, textIndex);
//       instance.pushBody(appendCode);
//     }
//   },
// };
