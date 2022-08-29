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

class CharNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class CharStack {
  constructor() {
    this.top = null;
  }

  push(ele) {
    let node = new CharNode();
    node.data = ele;
    node.next = this.top;
    this.top = node;
  }

  pop() {
    let temp = this.top;
    let tempData = temp.data;
    this.top = this.top.next;
    return tempData;
  }

  empty() {
    return this.top === null;
  }

  peak() {
    return this.top.data;
  }

  length() {
    let l = 0;
    let temp = this.top;
    while (temp !== null) {
      l++;
      temp = temp.next;
    }
    return l;
  }
}

class TreeNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class TreeStack {
  constructor() {
    this.top = null;
  }

  push(ele) {
    let node = new TreeNode();
    node.data = ele;
    node.next = this.top;
    this.top = node;
  }

  pop() {
    let temp = this.top;
    let tempData = temp.data;
    this.top = this.top.next;

    return tempData;
  }

  empty() {
    return this.top === null;
  }

  peak() {
    return this.top.data;
  }

  length() {
    let l = 0;
    let temp = this.top;

    while (temp !== null) {
      l++;
      temp = temp.next;
    }

    return l;
  }
}

function buildLinked(s) {
  preorderAns = "";
  postorderAns = "";

  let treeStack = new TreeStack();
  let charStack = new CharStack();

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
        charStack.length() != 0 &&
        charStack.peak() != "(" &&
        ((s[i] != "^" &&
          p[charStack.peak().charCodeAt()] >= p[s[i].charCodeAt()]) ||
          (s[i] == "^" &&
            p[charStack.peak().charCodeAt()] > p[s[i].charCodeAt()]))
      ) {
        t = newNode(charStack.pop());
        t1 = treeStack.pop();
        t2 = treeStack.pop();
        t.left = t2;
        t.right = t1;
        treeStack.push(t);
      }

      charStack.push(s[i]);
    } else if (s[i] == ")") {
      while (charStack.length() != 0 && charStack.peak() != "(") {
        t = newNode(charStack.pop());
        t1 = treeStack.pop();
        t2 = treeStack.pop();
        t.left = t2;
        t.right = t1;
        treeStack.push(t);
      }
      charStack.pop();
    }
  }
  t = treeStack.peak();
  return t;
}

function postorderLinked(root) {
  if (root != null) {
    postorderLinked(root.left);
    postorderLinked(root.right);
    postorderAns += root.data;
  }
  return postorderAns;
}

function preorderLinked(root) {
  if (root != null) {
    preorderAns += root.data;

    preorderLinked(root.left);
    preorderLinked(root.right);
  }
  return preorderAns;
}

export { postorderLinked, preorderLinked, buildLinked };
