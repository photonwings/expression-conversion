let postorderAns;
let preorderAns;
class Tree {
  constructor(data) {
    this.left = null;
    this.right = null;
    this.data = data;
  }
}

function newNode(data) {
  let tempNode = new Tree(data);
  return tempNode;
}

function buildArray(s) {
  preorderAns = "";
  postorderAns = "";

  let treeStack = [];
  let charStack = [];

  let t, t1, t2;

  let p = new Array(123);
  p["+".charCodeAt()] = p["-".charCodeAt()] = 1;
  p["/".charCodeAt()] = p["*".charCodeAt()] = 2;
  p["^".charCodeAt()] = 3;
  p[")".charCodeAt()] = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] == "(") {
      charStack.push(s[i]);
    } else if (/[a-zA-Z]/.test(s[i])) {
      t = newNode(s[i]);
      treeStack.push(t);
    } else if (p[s[i].charCodeAt()] > 0) {
      while (
        charStack.length != 0 &&
        charStack[charStack.length - 1] != "(" &&
        ((s[i] != "^" &&
          p[charStack[charStack.length - 1].charCodeAt()] >=
            p[s[i].charCodeAt()]) ||
          (s[i] == "^" &&
            p[charStack[charStack.length - 1].charCodeAt()] >
              p[s[i].charCodeAt()]))
      ) {
        t = newNode(charStack[charStack.length - 1]);
        charStack.pop();

        t1 = treeStack[treeStack.length - 1];
        treeStack.pop();

        t2 = treeStack[treeStack.length - 1];
        treeStack.pop();

        t.left = t2;
        t.right = t1;

        treeStack.push(t);
      }

      charStack.push(s[i]);
    } else if (s[i] == ")") {
      while (charStack.length != 0 && charStack[charStack.length - 1] != "(") {
        t = newNode(charStack[charStack.length - 1]);
        charStack.pop();
        t1 = treeStack[treeStack.length - 1];
        treeStack.pop();
        t2 = treeStack[treeStack.length - 1];
        treeStack.pop();
        t.left = t2;
        t.right = t1;
        treeStack.push(t);
      }
      charStack.pop();
    }
  }
  t = treeStack[treeStack.length - 1];
  return t;
}

function postorderArray(root) {
  if (root != null) {
    postorderArray(root.left);
    postorderArray(root.right);
    postorderAns += root.data;
  }
  return postorderAns;
}

function preorderArray(root) {
  if (root != null) {
    preorderAns += root.data;

    preorderArray(root.left);
    preorderArray(root.right);
  }
  return preorderAns;
}

export { postorderArray, preorderArray, buildArray };
